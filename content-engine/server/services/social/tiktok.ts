import axios from 'axios'
import fs from 'fs'
import { config } from '../../config/index.js'
import { logger } from '../../lib/logger.js'
import type { ContentItem } from '../../models/contentItem.js'
import type { PostResult } from './index.js'

const BASE = 'https://open.tiktokapis.com/v2'

export async function postToTikTok(item: ContentItem): Promise<PostResult> {
  const token = config.tiktokAccessToken
  const openId = config.tiktokOpenId

  if (!token || !openId) {
    throw new Error('TikTok credentials not configured')
  }

  if (!item.mediaPath || !fs.existsSync(item.mediaPath)) {
    throw new Error(`Video file not found: ${item.mediaPath}`)
  }

  const caption = [item.caption ?? item.title ?? '', item.hashtags].filter(Boolean).join('\n\n')
  const videoBuffer = fs.readFileSync(item.mediaPath)

  // Step 1: Init upload
  const initRes = await axios.post(
    `${BASE}/post/publish/video/init/`,
    {
      post_info: {
        title: caption.substring(0, 2200),
        privacy_level: 'PUBLIC_TO_EVERYONE',
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
        video_cover_timestamp_ms: 1000,
      },
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: videoBuffer.length,
        chunk_size: videoBuffer.length,
        total_chunk_count: 1,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
  )

  const { publish_id, upload_url } = initRes.data.data

  // Step 2: Upload chunk
  await axios.put(upload_url, videoBuffer, {
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Range': `bytes 0-${videoBuffer.length - 1}/${videoBuffer.length}`,
    },
  })

  // Step 3: Poll status
  let publishId = publish_id
  await pollTikTokStatus(publishId, token)

  logger.info(`TikTok video published: publish_id=${publishId}`)
  return {
    postId: publishId,
    postUrl: `https://www.tiktok.com/@${config.brandHandle}/video/${publishId}`,
  }
}

async function pollTikTokStatus(publishId: string, token: string, maxWait = 120_000): Promise<void> {
  const deadline = Date.now() + maxWait

  while (Date.now() < deadline) {
    const res = await axios.post(
      `${BASE}/post/publish/status/fetch/`,
      { publish_id: publishId },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    const { status } = res.data.data
    if (status === 'PUBLISH_COMPLETE') return
    if (status === 'FAILED') {
      throw new Error(`TikTok upload failed: ${JSON.stringify(res.data)}`)
    }

    await new Promise((r) => setTimeout(r, 5_000))
  }

  throw new Error('TikTok upload polling timed out')
}
