import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  })
}

export function formatRelativeTime(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(d)
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number) {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function calculatePercentage(value: number, total: number) {
  if (total === 0) return 0
  return Math.round((value / total) * 100)
}

export function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
    case 'easy':
      return 'text-green-600 bg-green-100'
    case 'medium':
      return 'text-yellow-600 bg-yellow-100'
    case 'hard':
      return 'text-orange-600 bg-orange-100'
    case 'expert':
      return 'text-red-600 bg-red-100'
    default:
      return 'text-gray-600 bg-gray-100'
  }
}

export function getRoleBadge(role: string) {
  switch (role) {
    case 'ADMIN':
      return 'bg-purple-100 text-purple-700'
    case 'HOST':
      return 'bg-blue-100 text-blue-700'
    case 'STUDENT':
    default:
      return 'bg-green-100 text-green-700'
  }
}

export function getLanguageName(code: string) {
  const languages: Record<string, string> = {
    ENGLISH: 'English',
    HINDI: 'हिंदी',
    TELUGU: 'తెలుగు',
  }
  return languages[code] || code
}

export function getLanguageFlag(code: string) {
  const flags: Record<string, string> = {
    ENGLISH: '🇺🇸',
    HINDI: '🇮🇳',
    TELUGU: '🇮🇳',
  }
  return flags[code] || '🌐'
}

export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${secs}s`
  return `${secs}s`
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export function generateId() {
  return Math.random().toString(36).substring(2, 15)
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function isValidPassword(password: string) {
  return password.length >= 8
}

export const LANGUAGE_NAMES: Record<string, string> = {
  ENGLISH: 'English',
  HINDI: 'हिंदी',
  TELUGU: 'తెలుగు',
}

export const LANGUAGE_FLAGS: Record<string, string> = {
  ENGLISH: '🇺🇸',
  HINDI: '🇮🇳',
  TELUGU: '🇮🇳',
}

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  NOTE: 'Note',
  VIDEO: 'Video',
  HANDWRITTEN_NOTE: 'Handwritten Note',
  QUIZ: 'Quiz',
  PYQ: 'Previous Year Questions',
  MOCK_TEST: 'Mock Test',
  FORMULA_SHEET: 'Formula Sheet',
  MINDMAP: 'Mind Map',
  CHEAT_SHEET: 'Cheat Sheet',
}

export const CONTENT_TYPE_ICONS: Record<string, string> = {
  NOTE: '📝',
  VIDEO: '🎥',
  HANDWRITTEN_NOTE: '✍️',
  QUIZ: '❓',
  PYQ: '📚',
  MOCK_TEST: '🧪',
  FORMULA_SHEET: '📐',
  MINDMAP: '🧠',
  CHEAT_SHEET: '📋',
}