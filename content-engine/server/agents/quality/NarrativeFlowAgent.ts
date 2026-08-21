import type { VideoSceneData } from './content-types.js'
import type { QualityReport } from './types.js'

const CTA_SIGNALS = [
  /\b(shop|buy|get|order|try|sign up|subscribe|follow|click|tap|swipe|visit|download|learn more|check out|grab|claim|book|schedule|call|dm|message)\b/i,
  /\blink in bio\b/i,
  /\bswipe up\b/i,
  /\b(now|today|limited time|don't miss|last chance)\b/i,
]

function hasCTASignal(text: string): boolean {
  return CTA_SIGNALS.some(p => p.test(text))
}

function extractWords(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 4)
  )
}

function overlapRatio(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let shared = 0
  for (const w of a) if (b.has(w)) shared++
  return shared / Math.min(a.size, b.size)
}

export function runNarrativeFlowAgent(data: VideoSceneData): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100

  const scenes = data.scenes
  if (scenes.length < 2) {
    return {
      agentName: 'NarrativeFlowAgent',
      score: 70,
      issues: [],
      suggestions: ['Single-scene content — no multi-scene narrative to validate'],
      approved: true,
      timestamp: new Date().toISOString(),
    }
  }

  const voiceovers = scenes.map(s => s.voiceover_text ?? '')
  const hasVoiceover = voiceovers.some(v => v.trim().length > 0)

  if (!hasVoiceover) {
    issues.push('No voiceover text found across any scene — narrative cannot be validated')
    suggestions.push('Add voiceover_text to each scene to create a cohesive spoken narrative')
    score -= 20
  } else {
    // Check for excessive repetition between consecutive scenes
    for (let i = 0; i < voiceovers.length - 1; i++) {
      const curr = extractWords(voiceovers[i])
      const next = extractWords(voiceovers[i + 1])
      const overlap = overlapRatio(curr, next)
      if (overlap > 0.6) {
        issues.push(`Scenes ${scenes[i].scene_id} → ${scenes[i + 1].scene_id}: Voiceover is ${Math.round(overlap * 100)}% repetitive — content doesn't progress`)
        suggestions.push('Rewrite adjacent voiceovers so each scene adds new information rather than restating')
        score -= 15
      }
    }

    // All voiceovers should form a coherent arc: hook → build → close
    const firstVo = voiceovers[0]
    const lastVo = voiceovers[voiceovers.length - 1]

    const lastSceneTexts = [
      lastVo,
      ...(scenes[scenes.length - 1].text_layers ?? []).map(l => l.text),
    ].join(' ')

    if (!hasCTASignal(lastSceneTexts)) {
      issues.push(`Last scene (${scenes[scenes.length - 1].scene_id}) lacks a clear call-to-action in voiceover or text`)
      suggestions.push('End with a direct CTA: "Shop now", "Follow for more", "Link in bio", or "Try it free"')
      score -= 20
    }

    // Opening voiceover should be short (hook pattern)
    if (firstVo.trim().split(/\s+/).length > 20) {
      suggestions.push('Open voiceover is long — aim for ≤15 words in scene 1 to match fast-paced attention spans')
      score -= 5
    }

    // Check escalating urgency — last scene should feel conclusive vs first
    const firstWords = extractWords(firstVo)
    const lastWords = extractWords(lastVo)
    if (firstWords.size > 0 && lastWords.size > 0 && overlapRatio(firstWords, lastWords) > 0.5) {
      issues.push('Opening and closing voiceovers are too similar — the story feels circular rather than progressive')
      suggestions.push('Structure as: Hook → Problem/Insight → Solution → CTA. Each stage should introduce new ideas')
      score -= 10
    }
  }

  // Text layers should complement, not duplicate, adjacent scene text
  for (let i = 0; i < scenes.length - 1; i++) {
    const currTexts = (scenes[i].text_layers ?? []).map(l => l.text).join(' ')
    const nextTexts = (scenes[i + 1].text_layers ?? []).map(l => l.text).join(' ')
    const overlap = overlapRatio(extractWords(currTexts), extractWords(nextTexts))
    if (overlap > 0.7 && currTexts.trim().length > 10) {
      issues.push(`Scenes ${scenes[i].scene_id} → ${scenes[i + 1].scene_id}: Text layers are nearly identical — no visual narrative progression`)
      suggestions.push('Vary text content across scenes to advance the message rather than repeat it')
      score -= 10
    }
  }

  // Total voiceover word count sanity check vs format duration
  const totalWords = voiceovers.join(' ').trim().split(/\s+/).filter(Boolean).length
  const durationSec = (data.total_duration_ms ?? 0) / 1000
  if (durationSec > 0 && totalWords > 0) {
    // Average reading pace ~2.5 words/sec for narration
    const estimatedSec = totalWords / 2.5
    if (estimatedSec > durationSec * 1.3) {
      issues.push(`Voiceover (~${totalWords} words) is too dense for a ${durationSec}s video — will feel rushed`)
      suggestions.push(`Trim narration to ~${Math.floor(durationSec * 2.5)} words or fewer for comfortable pacing`)
      score -= 15
    }
  }

  score = Math.max(0, score)

  return {
    agentName: 'NarrativeFlowAgent',
    score,
    issues,
    suggestions,
    approved: score >= 65,
    timestamp: new Date().toISOString(),
  }
}
