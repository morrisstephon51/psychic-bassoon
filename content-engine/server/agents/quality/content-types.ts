// Subset of content-machine's types/index.ts needed by the ported design_quality agents.
// Ported from ~/programs/content-machine/types/index.ts (content-machine repo archived 2026-07-03).

export interface ContentPillar {
  id: string
  name: string
  description: string
  examples: string[]
}

export type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube' | 'twitter' | 'linkedin'

export interface Persona {
  id: string
  name: string
  age_range: string
  pain_points: string[]
  goals: string[]
  preferred_platforms: Platform[]
}

export interface BrandColors {
  primary: string
  secondary: string
  accent: string
  background_dark: string
  background_light: string
  text_on_dark: string
}

export interface VideoStyleConfig {
  primary_style: 'kinetic_text' | 'broll_overlay' | 'slideshow' | 'mixed'
  color_grade: 'vibrant' | 'muted' | 'high_contrast' | 'warm' | 'cool'
  transition_style: 'cut' | 'fade' | 'slide' | 'zoom'
  text_animation: 'typewriter' | 'pop' | 'slide_up' | 'fade_in' | 'bounce'
  music_genre: 'hip_hop' | 'gospel' | 'ambient' | 'electronic' | 'corporate'
  voiceover_enabled: boolean
  voiceover_engine: 'web_speech' | 'elevenlabs'
  voiceover_voice_id: string
  caption_style: 'bold_bottom' | 'center_pop' | 'side_scroll' | 'none'
}

export interface BrandVault {
  id: string
  user_id: string
  brand_name: string
  industry: string
  mission: string
  taglines: string[]
  voice_config: {
    descriptors: string[]
  }
  tone_settings: {
    formal_vs_casual: number
    serious_vs_playful: number
  }
  content_pillars: ContentPillar[]
  target_personas: Persona[]
  color_palette: BrandColors
  font_preferences: {
    headline: string
    body: string
  }
  canva_brand_kit_id: string
  figma_file_id: string
  banned_words: string[]
  compliance_rules: string[]
  sample_approved_posts: string[]
  logo_url: string
  video_style_config: VideoStyleConfig
  created_at: string
  updated_at: string
}

export type VideoFormat =
  | 'hook_15s'
  | 'commercial_30s'
  | 'explainer_60s'
  | 'tiktok_organic'
  | 'reels_organic'
  | 'youtube_short'
  | 'story_sequence'

export type AspectRatio = '9:16' | '1:1' | '16:9'

export interface TextLayer {
  id: string
  text: string
  style: 'headline' | 'subheadline' | 'body' | 'cta' | 'caption' | 'stat'
  position: 'top' | 'center' | 'bottom' | 'top-left' | 'bottom-right'
  animation: 'typewriter' | 'pop_in' | 'slide_up' | 'fade_in' | 'bounce'
  animation_delay_ms: number
  duration_ms: number
  font_size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  color: string
  background_pill: boolean
  background_color: string
  bold: boolean
  uppercase: boolean
}

export interface Scene {
  scene_id: string
  duration_ms: number
  background: {
    type: 'broll_video' | 'solid_color' | 'gradient' | 'image' | 'ai_generated'
    value: string
    overlay_opacity: number
  }
  text_layers: TextLayer[]
  voiceover_text: string
  voiceover_timing_ms: number
  transition_in: 'cut' | 'fade' | 'slide_up' | 'zoom_in' | 'wipe'
  transition_out: 'cut' | 'fade' | 'slide_down' | 'zoom_out' | 'wipe'
}

export interface DesignIssue {
  severity: 'error' | 'warning' | 'info'
  code: string
  location: string
  message: string
  suggestion?: string
}

export interface ValidationResult {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  issues: DesignIssue[]
  passed: string[]
  summary: string
}

export interface VideoSceneData {
  video_id: string
  format: VideoFormat
  brand_id: string
  total_duration_ms: number
  aspect_ratio: AspectRatio
  resolution: '1080x1920' | '1080x1080' | '1920x1080'
  broll_search_queries: string[]
  music: {
    genre: string
    mood: string
    tempo: 'slow' | 'medium' | 'fast'
    freesound_search: string
  }
  scenes: Scene[]
  platform_copy: {
    tiktok_caption: string
    instagram_caption: string
    facebook_caption: string
    youtube_description: string
    hashtags: string[]
  }
  confidence_score: number
  review_flag: boolean
  review_reason: string
  design_validation?: ValidationResult
  music_url?: string
}
