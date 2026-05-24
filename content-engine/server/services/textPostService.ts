import { logger } from '../lib/logger.js'
import { broadcast } from '../lib/sse.js'
import { generateCaption } from '../lib/claude.js'
import { updateContentItem, getContentItem } from '../models/contentItem.js'
import { getBrand } from '../models/brand.js'

export async function buildTextPost(contentItemId: string, topic: string): Promise<void> {
  const item = getContentItem(contentItemId)
  if (!item) throw new Error(`Content item not found: ${contentItemId}`)

  const brand = getBrand(item.brandId)
  if (!brand) throw new Error(`Brand not found: ${item.brandId}`)

  updateContentItem(contentItemId, { status: 'generating' })
  broadcast('content:generating', { contentItemId })

  try {
    const result = await generateCaption({
      platform: item.platform,
      topic,
      brandName: brand.name,
      voice: brand.voice,
      hashtags: brand.hashtags,
    })

    updateContentItem(contentItemId, {
      status: 'ready',
      caption: result.caption,
      hashtags: result.hashtags,
    })

    broadcast('content:ready', { contentItemId })
    logger.info(`Text post ready: ${contentItemId}`)

  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    updateContentItem(contentItemId, { status: 'failed', error: msg })
    broadcast('content:error', { contentItemId, error: msg })
    throw error
  }
}
