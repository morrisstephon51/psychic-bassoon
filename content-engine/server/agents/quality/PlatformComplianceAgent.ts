import type { VideoSceneData, VideoFormat } from './content-types.js'
import type { QualityReport } from './types.js'

interface PlatformRules {
  maxCaptionChars: number
  maxHashtags: number
  maxDurationSec: number
  minDurationSec: number
  preferredAspectRatio: string
  maxDescriptionChars?: number
}

const FORMAT_RULES: Record<VideoFormat, PlatformRules> = {
  tiktok_organic: {
    maxCaptionChars: 2200,
    maxHashtags: 5,       // 3–5 is sweet spot; 30+ is common but algorithmic risk
    maxDurationSec: 180,
    minDurationSec: 5,
    preferredAspectRatio: '9:16',
  },
  reels_organic: {
    maxCaptionChars: 2200,
    maxHashtags: 30,
    maxDurationSec: 90,
    minDurationSec: 3,
    preferredAspectRatio: '9:16',
  },
  youtube_short: {
    maxCaptionChars: 5000,
    maxHashtags: 15,
    maxDurationSec: 60,
    minDurationSec: 1,
    preferredAspectRatio: '9:16',
    maxDescriptionChars: 5000,
  },
  story_sequence: {
    maxCaptionChars: 0,   // Stories have no caption
    maxHashtags: 10,
    maxDurationSec: 15,
    minDurationSec: 1,
    preferredAspectRatio: '9:16',
  },
  hook_15s: {
    maxCaptionChars: 2200,
    maxHashtags: 10,
    maxDurationSec: 15,
    minDurationSec: 10,
    preferredAspectRatio: '9:16',
  },
  commercial_30s: {
    maxCaptionChars: 2200,
    maxHashtags: 10,
    maxDurationSec: 30,
    minDurationSec: 25,
    preferredAspectRatio: '16:9',
  },
  explainer_60s: {
    maxCaptionChars: 5000,
    maxHashtags: 15,
    maxDurationSec: 60,
    minDurationSec: 45,
    preferredAspectRatio: '16:9',
  },
}

function countHashtags(text: string): number {
  return (text.match(/#\w+/g) ?? []).length
}

export function runPlatformComplianceAgent(data: VideoSceneData): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100

  const rules = FORMAT_RULES[data.format]
  if (!rules) {
    return {
      agentName: 'PlatformComplianceAgent',
      score: 70,
      issues: [`Unknown format '${data.format}' — platform rules unavailable`],
      suggestions: ['Use a recognised VideoFormat to enable compliance checking'],
      approved: true,
      timestamp: new Date().toISOString(),
    }
  }

  // ── Duration checks ──────────────────────────────────────────────────────────
  const durationSec = (data.total_duration_ms ?? 0) / 1000

  if (durationSec > rules.maxDurationSec) {
    issues.push(
      `${data.format} max duration is ${rules.maxDurationSec}s — this content is ${durationSec.toFixed(1)}s`
    )
    suggestions.push(`Trim total_duration_ms to ≤${rules.maxDurationSec * 1000}ms for platform compliance`)
    score -= 25
  }

  if (durationSec > 0 && durationSec < rules.minDurationSec) {
    issues.push(
      `${data.format} min duration is ${rules.minDurationSec}s — this content is only ${durationSec.toFixed(1)}s`
    )
    score -= 15
  }

  // ── Aspect ratio / resolution ────────────────────────────────────────────────
  if (data.aspect_ratio && data.aspect_ratio !== rules.preferredAspectRatio) {
    issues.push(
      `${data.format} expects ${rules.preferredAspectRatio} aspect ratio but content declares '${data.aspect_ratio}'`
    )
    suggestions.push(`Set aspect_ratio to '${rules.preferredAspectRatio}' for optimal delivery on this platform`)
    score -= 15
  }

  // ── Caption / copy length ────────────────────────────────────────────────────
  const copy = data.platform_copy ?? {}

  if (rules.maxCaptionChars > 0) {
    const tiktokCapLen = (copy.tiktok_caption ?? '').length
    if (data.format === 'tiktok_organic' && tiktokCapLen > rules.maxCaptionChars) {
      issues.push(`TikTok caption is ${tiktokCapLen} chars — limit is ${rules.maxCaptionChars}`)
      suggestions.push('Shorten tiktok_caption to fit within platform limits')
      score -= 10
    }

    const igCapLen = (copy.instagram_caption ?? '').length
    if (data.format === 'reels_organic' && igCapLen > rules.maxCaptionChars) {
      issues.push(`Instagram caption is ${igCapLen} chars — limit is ${rules.maxCaptionChars}`)
      suggestions.push('Shorten instagram_caption to fit within platform limits')
      score -= 10
    }

    const ytDescLen = (copy.youtube_description ?? '').length
    if (data.format === 'youtube_short' && rules.maxDescriptionChars && ytDescLen > rules.maxDescriptionChars) {
      issues.push(`YouTube description is ${ytDescLen} chars — limit is ${rules.maxDescriptionChars}`)
      score -= 10
    }
  }

  // ── Hashtag count ────────────────────────────────────────────────────────────
  const allCaptions = [
    copy.tiktok_caption,
    copy.instagram_caption,
    copy.facebook_caption,
  ].filter(Boolean).join(' ')

  const hashtagsInCaptions = countHashtags(allCaptions)
  const hashtagsInList = (copy.hashtags ?? []).length
  const totalHashtags = Math.max(hashtagsInCaptions, hashtagsInList)

  if (totalHashtags > rules.maxHashtags) {
    issues.push(
      `${data.format} recommended max is ${rules.maxHashtags} hashtags — found ${totalHashtags}`
    )
    suggestions.push(`Reduce to ${rules.maxHashtags} targeted hashtags for better algorithmic reach`)
    score -= 10
  }

  if (totalHashtags === 0) {
    suggestions.push('Add relevant hashtags to platform_copy.hashtags to improve discoverability')
    score -= 5
  }

  // ── Stories: no caption expected ────────────────────────────────────────────
  if (data.format === 'story_sequence') {
    const storyCapLen = (copy.instagram_caption ?? '').length
    if (storyCapLen > 150) {
      issues.push(`Story format uses text overlays, not captions — instagram_caption (${storyCapLen} chars) won't display`)
      suggestions.push('Put story copy in text_layers, not instagram_caption')
      score -= 5
    }
  }

  // ── Scene count sanity vs format ────────────────────────────────────────────
  const sceneCount = data.scenes.length
  if (data.format === 'hook_15s' && sceneCount > 5) {
    issues.push(`hook_15s format has ${sceneCount} scenes — fast-paced hooks should have ≤5 scene cuts`)
    suggestions.push('Reduce scene count to 3–5 to match 15-second format pacing')
    score -= 10
  }

  if ((data.format === 'explainer_60s' || data.format === 'commercial_30s') && sceneCount < 3) {
    issues.push(`${data.format} only has ${sceneCount} scene(s) — longer formats need ≥3 scenes for pacing`)
    suggestions.push('Add more scenes to sustain viewer attention across the full duration')
    score -= 10
  }

  score = Math.max(0, score)

  return {
    agentName: 'PlatformComplianceAgent',
    score,
    issues,
    suggestions,
    approved: score >= 70,
    timestamp: new Date().toISOString(),
  }
}
