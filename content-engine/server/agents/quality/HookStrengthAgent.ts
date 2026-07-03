import type { VideoSceneData } from './content-types.js'
import type { QualityReport } from './types.js'

// Words that signal urgency, curiosity, or pattern-interrupt
const POWER_WORDS = [
  'secret', 'stop', 'warning', 'never', 'always', 'proven', 'urgent', 'mistake',
  'hack', 'truth', 'exposed', 'shocking', 'finally', 'revealed', 'instantly',
  'guarantee', 'free', 'limited', 'exclusive', 'only', 'now', 'today', 'fast',
  'breaking', 'viral', 'trending', 'biggest', 'worst', 'best', 'real', 'hidden',
]

// Hook formulas that perform well on short-form platforms
const HOOK_PATTERNS = [
  /\bif you (don't|do|are|want|have)\b/i,     // conditional
  /\bmost people (don't|never|won't)\b/i,      // contrarian
  /\bhow (to|i|we|they)\b/i,                   // how-to
  /\b(#?[1-9])\s+(things|ways|reasons|tips|steps|secrets)\b/i, // list
  /\bpov:/i,                                    // POV
  /\bwould you rather\b/i,                      // engagement bait
  /\b(before you|before i|before we)\b/i,      // curiosity gap
  /^\s*wait[.,!?]/i,                            // pattern interrupt
]

function hasPowerWord(text: string): boolean {
  const lower = text.toLowerCase()
  return POWER_WORDS.some(w => lower.includes(w))
}

function matchesHookFormula(text: string): boolean {
  return HOOK_PATTERNS.some(p => p.test(text))
}

export function runHookStrengthAgent(data: VideoSceneData): QualityReport {
  const issues: string[] = []
  const suggestions: string[] = []
  let score = 100

  const firstScene = data.scenes[0]
  if (!firstScene) {
    return {
      agentName: 'HookStrengthAgent',
      score: 0,
      issues: ['No scenes found — cannot evaluate hook strength'],
      suggestions: ['Add at least one scene with a compelling opening hook'],
      approved: false,
      timestamp: new Date().toISOString(),
    }
  }

  const hookLayers = firstScene.text_layers ?? []
  const hookTexts = hookLayers.map(l => l.text ?? '').filter(Boolean)
  const combinedHook = hookTexts.join(' ')

  // Must have text in scene 1
  if (hookTexts.length === 0) {
    issues.push('Scene 1 has no text layers — the opening hook is purely visual with no copy')
    suggestions.push('Add a short, punchy headline (≤8 words) to scene 1 to capture attention')
    score -= 30
  }

  // Hook text should be brief
  const primaryLayer = hookLayers.find(l => l.style === 'headline') ?? hookLayers[0]
  if (primaryLayer) {
    const wordCount = primaryLayer.text.trim().split(/\s+/).length
    if (wordCount > 10) {
      issues.push(`Scene 1 headline is ${wordCount} words — too long for a scroll-stopping hook`)
      suggestions.push('Trim the hook to ≤8 words; move supporting context to subsequent scenes')
      score -= 20
    }
  }

  // Should contain a power word or hook formula
  const hasPower = hasPowerWord(combinedHook)
  const hasFormula = matchesHookFormula(combinedHook)

  if (!hasPower && !hasFormula) {
    issues.push('Scene 1 copy lacks urgency signals or a proven hook formula')
    suggestions.push('Open with a curiosity gap, contrarian claim, or a power word to stop the scroll')
    score -= 25
  } else if (!hasFormula) {
    suggestions.push('Consider a hook formula (list, how-to, POV, contrarian) to further boost engagement')
    score -= 5
  }

  // Voiceover in scene 1 should be short (hook pattern)
  const vo = firstScene.voiceover_text ?? ''
  if (vo) {
    const voWords = vo.trim().split(/\s+/).length
    if (voWords > 20) {
      issues.push(`Scene 1 voiceover is ${voWords} words — the hook narration should be ≤15 words`)
      suggestions.push('Shorten the opening voiceover; get to the point immediately to retain viewers')
      score -= 15
    }
  }

  // Background should be dynamic (not a plain gradient) for the hook
  if (firstScene.background?.type === 'gradient' || firstScene.background?.type === 'solid_color') {
    issues.push('Scene 1 uses a static gradient background — hook scenes perform better with motion or imagery')
    suggestions.push('Use broll_video or ai_generated imagery in scene 1 to create visual contrast')
    score -= 10
  }

  score = Math.max(0, score)

  return {
    agentName: 'HookStrengthAgent',
    score,
    issues,
    suggestions,
    approved: score >= 65,
    timestamp: new Date().toISOString(),
  }
}
