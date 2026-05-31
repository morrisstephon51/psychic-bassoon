/**
 * The Plug AI — Brand Vault
 * Single source of truth for all brand colors, typography, and tokens.
 */

export const brand = {
  // ─── Core Backgrounds ─────────────────────────────────────────
  bg: {
    primary: '#FAFAFA',      // Main page background (warm white)
    surface: '#F5F3FF',      // Alternating section background (light lavender)
    card: '#FFFFFF',         // Card / panel background
    input: '#FAFAFA',        // Form input background
    subtle: '#F0EEFF',       // Subtler hover / nested bg
  },

  // ─── Borders ──────────────────────────────────────────────────
  border: {
    light: '#EDE9FE',        // Default card border
    medium: '#D8D0F7',       // Stronger dividers
    focus: '#7C3AED',        // Focus rings (purple)
  },

  // ─── Text ─────────────────────────────────────────────────────
  text: {
    primary: '#1A0533',      // Headings / primary copy (deep purple-black)
    secondary: '#6B5A8E',    // Body copy / secondary text
    muted: '#9385B5',        // Captions, placeholders, disabled
    inverse: '#FAFAFA',      // Text on dark surfaces (buttons etc.)
  },

  // ─── Brand Purple ─────────────────────────────────────────────
  purple: {
    900: '#3B0764',
    800: '#4C1D95',
    700: '#6B21A8',          // Primary purple
    600: '#7C3AED',          // Medium purple
    500: '#8B5CF6',          // Light purple
    400: '#A78BFA',
    100: '#EDE9FE',          // Very light purple
    50:  '#F5F3FF',          // Barely-there purple
  },

  // ─── Brand Green ──────────────────────────────────────────────
  green: {
    700: '#15803D',
    600: '#16A34A',
    500: '#22C55E',          // Primary green
    400: '#4ADE80',
    100: '#DCFCE7',          // Very light green
    50:  '#F0FFF4',          // Barely-there green
  },

  // ─── Brand Gold ───────────────────────────────────────────────
  gold: {
    500: '#F59E0B',
    400: '#FBBF24',
    100: '#FEF3C7',
    50:  '#FFFBEB',
  },

  // ─── Typography ───────────────────────────────────────────────
  font: {
    heading: 'Space Grotesk',
    body: 'Inter',
  },

  // ─── Gradients ────────────────────────────────────────────────
  gradient: {
    brand: 'linear-gradient(135deg, #6B21A8 0%, #22C55E 100%)',
    heroBg: 'linear-gradient(135deg, #F5F3FF 0%, #FAFAFA 60%, #F0FFF4 100%)',
    purpleToGreen: 'from-purple-600 to-green-500',
  },

  // ─── Shadows ──────────────────────────────────────────────────
  shadow: {
    card: '0 1px 3px rgba(107,33,168,0.07), 0 4px 16px rgba(107,33,168,0.04)',
    cardHover: '0 4px 24px rgba(107,33,168,0.12), 0 1px 4px rgba(107,33,168,0.08)',
    green: '0 0 40px rgba(34,197,94,0.20)',
    purple: '0 0 40px rgba(107,33,168,0.20)',
  },
} as const

export type Brand = typeof brand
