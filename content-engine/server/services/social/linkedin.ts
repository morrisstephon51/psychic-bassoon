import axios from 'axios'
import { config } from '../../config/index.js'
import { logger } from '../../lib/logger.js'
import type { ContentItem } from '../../models/contentItem.js'
import type { PostResult } from './index.js'

const BASE = 'https://api.linkedin.com/v2'

export async function postToLinkedIn(item: ContentItem): Promise<PostResult> {
  const token = config.linkedinAccessToken
  const personId = config.linkedinPersonId

  if (!token || !personId) {
    throw new Error('LinkedIn credentials not configured')
  }

  const text = [item.caption ?? item.title ?? '', item.hashtags].filter(Boolean).join('\n\n')

  const res = await axios.post(
    `${BASE}/ugcPosts`,
    {
      author: `urn:li:person:${personId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text },
          shareMediaCategory: 'NONE',
        },
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0',
      },
    }
  )

  const postId = res.data.id ?? res.headers['x-restli-id']
  const postUrl = `https://www.linkedin.com/feed/update/${postId}/`
  logger.info(`LinkedIn post published: ${postUrl}`)
  return { postId, postUrl }
}
