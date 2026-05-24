import { google } from 'googleapis'
import fs from 'fs'
import { config } from '../../config/index.js'
import { logger } from '../../lib/logger.js'
import type { ContentItem } from '../../models/contentItem.js'
import type { PostResult } from './index.js'

function getYouTubeClient() {
  if (!config.youtubeClientId || !config.youtubeClientSecret || !config.youtubeRefreshToken) {
    throw new Error('YouTube credentials not configured')
  }

  const oauth2 = new google.auth.OAuth2(
    config.youtubeClientId,
    config.youtubeClientSecret,
    'urn:ietf:wg:oauth:2.0:oob'
  )

  oauth2.setCredentials({ refresh_token: config.youtubeRefreshToken })
  return google.youtube({ version: 'v3', auth: oauth2 })
}

export async function postToYouTube(item: ContentItem): Promise<PostResult> {
  if (!item.mediaPath || !fs.existsSync(item.mediaPath)) {
    throw new Error(`Video file not found: ${item.mediaPath}`)
  }

  const youtube = getYouTubeClient()

  const res = await youtube.videos.insert({
    part: ['snippet', 'status'],
    requestBody: {
      snippet: {
        title: item.title ?? 'New AI Tip',
        description: [item.caption ?? '', item.hashtags ?? ''].filter(Boolean).join('\n\n'),
        tags: item.hashtags?.split(' ').map((t) => t.replace('#', '')) ?? [],
        categoryId: '27', // Education
        defaultLanguage: 'en',
      },
      status: {
        privacyStatus: 'public',
        selfDeclaredMadeForKids: false,
      },
    },
    media: {
      body: fs.createReadStream(item.mediaPath),
    },
  })

  const videoId = res.data.id!
  const postUrl = `https://www.youtube.com/shorts/${videoId}`
  logger.info(`YouTube Short published: ${postUrl}`)
  return { postId: videoId, postUrl }
}
