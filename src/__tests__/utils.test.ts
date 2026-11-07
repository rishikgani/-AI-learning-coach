import { describe, it, expect } from 'vitest'
import { cn, slugify, formatRelativeTime, getLanguageFlag, getLanguageName } from '@/lib/utils'

describe('Utility Functions', () => {
  describe('cn (className merger)', () => {
    it('merges class names correctly', () => {
      expect(cn('base', 'extra')).toBe('base extra')
    })

    it('handles conditional classes', () => {
      expect(cn('base', true && 'conditional')).toBe('base conditional')
      expect(cn('base', false && 'conditional')).toBe('base')
    })

    it('handles Tailwind conflicts with tailwind-merge', () => {
      expect(cn('p-2 p-4')).toBe('p-4')
      expect(cn('text-red-500 text-blue-500')).toBe('text-blue-500')
    })
  })

  describe('slugify', () => {
    it('creates URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('JEE Mains 2024')).toBe('jee-mains-2024')
      expect(slugify('C++ Programming')).toBe('c-programming')
    })

    it('handles special characters', () => {
      expect(slugify('Test @#$%^&*()')).toBe('test')
      expect(slugify('Multiple   Spaces')).toBe('multiple-spaces')
    })
  })

  describe('formatRelativeTime', () => {
    it('formats recent times correctly', () => {
      const now = new Date()
      const minuteAgo = new Date(now.getTime() - 60 * 1000)
      const hourAgo = new Date(now.getTime() - 60 * 60 * 1000)
      const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

      // Function returns format like "1m ago", "1h ago", "1d ago"
      expect(formatRelativeTime(minuteAgo.toISOString())).toContain('m ago')
      expect(formatRelativeTime(hourAgo.toISOString())).toContain('h ago')
      expect(formatRelativeTime(dayAgo.toISOString())).toContain('d ago')
    })
  })

  describe('Language utilities', () => {
    it('returns correct language flags', () => {
      expect(getLanguageFlag('ENGLISH')).toBe('🇺🇸')
      expect(getLanguageFlag('HINDI')).toBe('🇮🇳')
      expect(getLanguageFlag('TELUGU')).toBe('🇮🇳')
    })

    it('returns correct language names (native script)', () => {
      expect(getLanguageName('ENGLISH')).toBe('English')
      expect(getLanguageName('HINDI')).toBe('हिंदी')
      expect(getLanguageName('TELUGU')).toBe('తెలుగు')
    })
  })
})