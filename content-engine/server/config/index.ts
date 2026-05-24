import 'dotenv/config'
import { z } from 'zod'

const ConfigSchema = z.object({
  port: z.coerce.number().default(3001),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),

  anthropicApiKey: z.string().min(1, 'ANTHROPIC_API_KEY is required'),

  brandName: z.string().default('The Plug AI'),
  brandHandle: z.string().default('theplugai'),
  brandNiche: z.string().default('AI education for underserved communities'),
  brandVoice: z.string().default('Authentic, empowering, no-jargon, community-first'),
  brandHashtags: z.string().default('#AIForEveryone #ThePlugAI #AIEducation'),

  instagramAccessToken: z.string().optional(),
  instagramAccountId: z.string().optional(),
  tiktokAccessToken: z.string().optional(),
  tiktokOpenId: z.string().optional(),
  youtubeApiKey: z.string().optional(),
  youtubeClientId: z.string().optional(),
  youtubeClientSecret: z.string().optional(),
  youtubeRefreshToken: z.string().optional(),
  twitterApiKey: z.string().optional(),
  twitterApiSecret: z.string().optional(),
  twitterAccessToken: z.string().optional(),
  twitterAccessSecret: z.string().optional(),
  linkedinAccessToken: z.string().optional(),
  linkedinPersonId: z.string().optional(),

  dailySchedule: z.string().default('0 9 * * *'),
  contentWindowDays: z.coerce.number().default(7),

  ffmpegPath: z.string().default('/usr/bin/ffmpeg'),
  tempDir: z.string().default('/tmp/content-engine'),
  assetsDir: z.string().default('./assets'),

  dbPath: z.string().default('./data/content-engine.db'),
})

export const config = ConfigSchema.parse({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY ?? '',
  brandName: process.env.BRAND_NAME,
  brandHandle: process.env.BRAND_HANDLE,
  brandNiche: process.env.BRAND_NICHE,
  brandVoice: process.env.BRAND_VOICE,
  brandHashtags: process.env.BRAND_HASHTAGS,
  instagramAccessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  instagramAccountId: process.env.INSTAGRAM_ACCOUNT_ID,
  tiktokAccessToken: process.env.TIKTOK_ACCESS_TOKEN,
  tiktokOpenId: process.env.TIKTOK_OPEN_ID,
  youtubeApiKey: process.env.YOUTUBE_API_KEY,
  youtubeClientId: process.env.YOUTUBE_CLIENT_ID,
  youtubeClientSecret: process.env.YOUTUBE_CLIENT_SECRET,
  youtubeRefreshToken: process.env.YOUTUBE_REFRESH_TOKEN,
  twitterApiKey: process.env.TWITTER_API_KEY,
  twitterApiSecret: process.env.TWITTER_API_SECRET,
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
  twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET,
  linkedinAccessToken: process.env.LINKEDIN_ACCESS_TOKEN,
  linkedinPersonId: process.env.LINKEDIN_PERSON_ID,
  dailySchedule: process.env.DAILY_SCHEDULE,
  contentWindowDays: process.env.CONTENT_WINDOW_DAYS,
  ffmpegPath: process.env.FFMPEG_PATH,
  tempDir: process.env.TEMP_DIR,
  assetsDir: process.env.ASSETS_DIR,
  dbPath: process.env.DB_PATH,
})

export type Config = typeof config
