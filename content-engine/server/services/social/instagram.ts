import axios from 'axios'
import fs from 'fs'
import { config } from '../../config/index.js'
import { logger } from '../../lib/logger.js'
import type { ContentItem } from '../../models/contentItem.js'
import type { PostResult } from './index.js'

const BASE = 'https://graph.facebook.com/v21.0'

export async function postToInstagram(item: ContentItem): Promise<PostResult> {
  const token = config.instagramAccessToken
  const accountId = config.instagramAccountId

  if (!token || !accountId) {
    throw new Error('Instagram credentials not configured')
  }

  const caption = buildCaption(item)

  if (item.type === 'video_reel') {
    return uploadReel(item, caption, token, accountId)
  }
  return uploadImagePost(item, caption, token, accountId)
}

async function uploadReel(
  item: ContentItem,
  caption: string,
  token: string,
  accountId: string,
): Promise<PostResult> {
  if (!item.mediaPath || !fs.existsSync(item.mediaPath)) {
    throw new Error(`Video file not found: ${item.mediaPath}`)
  }

  // Step 1: Initialize upload container
  const initRes = await axios.post(`${BASE}/${accountId}/media`, {
    media_type: 'REELS',
    caption,
    share_to_feed: true,
    access_token: token,
  })

  const containerId = initRes.data.id

  // Step 2: Upload video bytes
  const videoBuffer = fs.readFileSync(item.mediaPath)
  await axios.post(`https://rupload.facebook.com/video-upload/v21.0/${containerId}`, videoBuffer, {
    headers: {
      Authorization: `OAuth ${token}`,
      'Content-Type': 'application/octet-stream',
      'offset': '0',
      'file_size': String(videoBuffer.length),
    },
  })

  // Step 3: Poll until processing complete
  await pollContainer(containerId, token)

  // Step 4: Publish
  const publishRes = await axios.post(`${BASE}/${accountId}/media_publish`, {
    creation_id: containerId,
    access_token: token,
  })

  const postId = publishRes.data.id
  const postUrl = `https://www.instagram.com/p/${postId}/`
  logger.info(`Instagram reel published: ${postUrl}`)
  return { postId, postUrl }
}

async function uploadImagePost(
  item: ContentItem,
  caption: string,
  token: string,
  accountId: string,
): Promise<PostResult> {
  const imageUrl = item.thumbnailPath
    ? `${config.brandHandle}.com/thumbnails/${item.id}.jpg`
    : undefined

  const mediaRes = await axios.post(`${BASE}/${accountId}/media`, {
    image_url: imageUrl,
    caption,
    access_token: token,
  })

  const publishRes = await axios.post(`${BASE}/${accountId}/media_publish`, {
    creation_id: mediaRes.data.id,
    access_token: token,
  })

  const postId = publishRes.data.id
  return { postId, postUrl: `https://www.instagram.com/p/${postId}/` }
}

async function pollContainer(containerId: string, token: string, maxWait = 120_000): Promise<void> {
  const deadline = Date.now() + maxWait

  while (Date.now() < deadline) {
    const res = await axios.get(`${BASE}/${containerId}`, {
      params: { fields: 'status_code', access_token: token },
    })

    if (res.data.status_code === 'FINISHED') return
    if (res.data.status_code === 'ERROR') {
      throw new Error(`Instagram container processing failed: ${JSON.stringify(res.data)}`)
    }

    await new Promise((r) => setTimeout(r, 5_000))
  }

  throw new Error('Instagram container processing timed out')
}

function buildCaption(item: ContentItem): string {
  const parts = [item.caption ?? item.title ?? '']
  if (item.hashtags) parts.push(item.hashtags)
  return parts.filter(Boolean).join('\n\n')
}
