import axios from 'axios'
import crypto from 'crypto'
import { config } from '../../config/index.js'
import { logger } from '../../lib/logger.js'
import type { ContentItem } from '../../models/contentItem.js'
import type { PostResult } from './index.js'

const BASE = 'https://api.twitter.com/2'

function buildOAuthHeader(method: string, url: string, params: Record<string, string>): string {
  if (!config.twitterApiKey || !config.twitterApiSecret || !config.twitterAccessToken || !config.twitterAccessSecret) {
    throw new Error('Twitter credentials not configured')
  }

  const oauthParams: Record<string, string> = {
    oauth_consumer_key: config.twitterApiKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: config.twitterAccessToken,
    oauth_version: '1.0',
  }

  const allParams = { ...params, ...oauthParams }
  const sortedKeys = Object.keys(allParams).sort()
  const paramStr = sortedKeys.map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(allParams[k])}`).join('&')

  const sigBase = [method.toUpperCase(), encodeURIComponent(url), encodeURIComponent(paramStr)].join('&')
  const sigKey = `${encodeURIComponent(config.twitterApiSecret)}&${encodeURIComponent(config.twitterAccessSecret)}`
  const signature = crypto.createHmac('sha1', sigKey).update(sigBase).digest('base64')

  oauthParams['oauth_signature'] = signature

  return 'OAuth ' + Object.keys(oauthParams)
    .map((k) => `${encodeURIComponent(k)}="${encodeURIComponent(oauthParams[k])}"`)
    .join(', ')
}

export async function postToTwitter(item: ContentItem): Promise<PostResult> {
  const text = [item.caption ?? item.title ?? '', item.hashtags].filter(Boolean).join('\n\n').substring(0, 280)

  const url = `${BASE}/tweets`
  const oauthHeader = buildOAuthHeader('POST', url, {})

  const res = await axios.post(
    url,
    { text },
    { headers: { Authorization: oauthHeader, 'Content-Type': 'application/json' } }
  )

  const tweetId = res.data.data.id
  const postUrl = `https://twitter.com/i/status/${tweetId}`
  logger.info(`Twitter/X post published: ${postUrl}`)
  return { postId: tweetId, postUrl }
}
