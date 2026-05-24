import { getContentItem } from '../../models/contentItem.js'
import { updateContentItem } from '../../models/contentItem.js'
import { recordPost } from '../../models/platform.js'
import { broadcast } from '../../lib/sse.js'
import { logger } from '../../lib/logger.js'
import { postToInstagram } from './instagram.js'
import { postToTikTok } from './tiktok.js'
import { postToYouTube } from './youtube.js'
import { postToTwitter } from './twitter.js'
import { postToLinkedIn } from './linkedin.js'

export interface PostResult {
  postId: string
  postUrl: string
}

export async function publishContentItem(contentItemId: string): Promise<PostResult> {
  const item = getContentItem(contentItemId)
  if (!item) throw new Error(`Content item not found: ${contentItemId}`)
  if (item.status !== 'ready' && item.status !== 'scheduled') {
    throw new Error(`Content item not ready for publishing: status=${item.status}`)
  }

  updateContentItem(contentItemId, { status: 'publishing' })
  broadcast('publish:start', { contentItemId, platform: item.platform })

  try {
    let result: PostResult

    switch (item.platform) {
      case 'instagram':
        result = await postToInstagram(item)
        break
      case 'tiktok':
        result = await postToTikTok(item)
        break
      case 'youtube':
        result = await postToYouTube(item)
        break
      case 'twitter':
        result = await postToTwitter(item)
        break
      case 'linkedin':
        result = await postToLinkedIn(item)
        break
      default:
        throw new Error(`Unsupported platform: ${item.platform}`)
    }

    updateContentItem(contentItemId, {
      status: 'published',
      postId: result.postId,
      postUrl: result.postUrl,
      publishedAt: new Date().toISOString(),
      error: null,
    })

    recordPost(item.platform)
    broadcast('publish:success', { contentItemId, platform: item.platform, postUrl: result.postUrl })
    logger.info(`Published ${contentItemId} to ${item.platform}: ${result.postUrl}`)
    return result

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    updateContentItem(contentItemId, { status: 'failed', error: msg })
    broadcast('publish:error', { contentItemId, platform: item.platform, error: msg })
    throw error
  }
}
