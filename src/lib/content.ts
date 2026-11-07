import { remark } from 'remark'
import html from 'remark-html'
import matter from 'gray-matter'

/**
 * Content processing utilities for notes, markdown, and content rendering
 */

export interface ParsedContent {
  title: string
  description?: string
  tags?: string[]
  difficulty?: string
  estimatedTime?: number
  language?: string
  content: string
  htmlContent: string
}

export interface VideoInfo {
  provider: 'YOUTUBE' | 'VIMEO' | 'GOOGLE_DRIVE' | 'UNKNOWN'
  videoId: string
  embedUrl: string
  thumbnailUrl: string
  title?: string
}

/**
 * Parse markdown frontmatter and convert to HTML
 */
export async function parseMarkdownContent(markdown: string): Promise<ParsedContent> {
  const { data, content } = matter(markdown)
  const processedContent = await remark().use(html).process(content)
  const htmlContent = processedContent.toString()

  return {
    title: data.title || 'Untitled',
    description: data.description,
    tags: data.tags || [],
    difficulty: data.difficulty || 'MEDIUM',
    estimatedTime: data.estimatedTime || 0,
    language: data.language || 'ENGLISH',
    content,
    htmlContent,
  }
}

/**
 * Extract video info from various URL formats
 */
export function parseVideoUrl(url: string): VideoInfo | null {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern)
    if (match) {
      const videoId = match[1]
      return {
        provider: 'YOUTUBE',
        videoId,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      }
    }
  }

  // Vimeo patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /vimeo\.com\/channels\/[^/]+\/(\d+)/,
    /vimeo\.com\/groups\/[^/]+\/videos\/(\d+)/,
  ]

  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern)
    if (match) {
      const videoId = match[1]
      return {
        provider: 'VIMEO',
        videoId,
        embedUrl: `https://player.vimeo.com/video/${videoId}`,
        thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`,
      }
    }
  }

  // Google Drive
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^\/]+)/)
  if (driveMatch) {
    const videoId = driveMatch[1]
    return {
      provider: 'GOOGLE_DRIVE',
      videoId,
      embedUrl: `https://drive.google.com/file/d/${videoId}/preview`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${videoId}`,
    }
  }

  return null
}

/**
 * Generate video embed HTML
 */
export function getVideoEmbedHtml(videoUrl: string, width: string = '100%', height: string = '400'): string {
  const videoInfo = parseVideoUrl(videoUrl)
  if (!videoInfo) {
    return `<div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">Unsupported video format</div>`
  }

  return `
    <div class="relative aspect-video w-full">
      <iframe
        src="${videoInfo.embedUrl}"
        width="${width}"
        height="${height}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="rounded-lg w-full h-full"
      ></iframe>
    </div>
  `
}

/**
 * Sanitize HTML content for safe rendering
 */
export function sanitizeHtml(html: string): string {
  // Basic sanitization - in production use DOMPurify
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

/**
 * Extract plain text from HTML for search/excerpts
 */
export function extractTextFromHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Generate table of contents from HTML headings
 */
export interface TocItem {
  id: string
  text: string
  level: number
}

export function generateToc(html: string): TocItem[] {
  const headingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/gi
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    items.push({
      level: parseInt(match[1], 10),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ''),
    })
  }

  return items
}

/**
 * Format content for display (truncate, add read more, etc.)
 */
export function formatContentForPreview(html: string, maxLength: number = 300): string {
  const text = extractTextFromHtml(html)
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Get reading time estimate
 */
export function getReadingTime(content: string, wordsPerMinute: number = 200): number {
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Content type icons
 */
export const CONTENT_TYPE_ICONS: Record<string, string> = {
  NOTE: '📝',
  VIDEO: '🎥',
  HANDWRITTEN_NOTE: '✍️',
  QUIZ: '❓',
  PYQ: '📋',
  MOCK_TEST: '🧪',
  FORMULA_SHEET: '📐',
  MINDMAP: '🧠',
  CHEAT_SHEET: '📄',
}

export const CONTENT_TYPE_LABELS: Record<string, string> = {
  NOTE: 'Notes',
  VIDEO: 'Video',
  HANDWRITTEN_NOTE: 'Handwritten Notes',
  QUIZ: 'Quiz',
  PYQ: 'Previous Year Questions',
  MOCK_TEST: 'Mock Test',
  FORMULA_SHEET: 'Formula Sheet',
  MINDMAP: 'Mind Map',
  CHEAT_SHEET: 'Cheat Sheet',
}

export const DIFFICULTY_COLORS: Record<string, string> = {
  BEGINNER: 'bg-green-100 text-green-700',
  EASY: 'bg-green-100 text-green-700',
  MEDIUM: 'bg-yellow-100 text-yellow-700',
  HARD: 'bg-orange-100 text-orange-700',
  EXPERT: 'bg-red-100 text-red-700',
}

export const LANGUAGE_FLAGS: Record<string, string> = {
  ENGLISH: '🇺🇸',
  HINDI: '🇮🇳',
  TELUGU: '🇮🇳',
}

export const LANGUAGE_NAMES: Record<string, string> = {
  ENGLISH: 'English',
  HINDI: 'हिंदी',
  TELUGU: 'తెలుగు',
}

/**
 * Search content relevance scoring
 */
export function calculateRelevanceScore(
  content: { title: string; description?: string; tags?: string[]; content: string; language?: string },
  query: string,
  language?: string
): number {
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (searchTerms.length === 0) return 0

  let score = 0
  const title = content.title.toLowerCase()
  const description = content.description?.toLowerCase() || ''
  const tags = content.tags?.map((t) => t.toLowerCase()) || []
  const fullContent = content.content.toLowerCase()

  for (const term of searchTerms) {
    // Title match (highest weight)
    if (title.includes(term)) score += 10

    // Tag match
    if (tags.some((tag) => tag.includes(term))) score += 8

    // Description match
    if (description.includes(term)) score += 5

    // Content match
    if (fullContent.includes(term)) score += 2

    // Language bonus
    if (language && content.language === language) score += 3
  }

  return score
}

/**
 * Paginate array
 */
export function paginate<T>(items: T[], page: number, limit: number): { items: T[]; totalPages: number; totalItems: number } {
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / limit)
  const start = (page - 1) * limit
  const end = start + limit
  return {
    items: items.slice(start, end),
    totalPages,
    totalItems,
  }
}

/**
 * Sort content by various criteria
 */
export function sortContent<T extends { createdAt: string; updatedAt: string; viewCount: number; title: string }>(
  items: T[],
  sortBy: 'createdAt' | 'updatedAt' | 'viewCount' | 'title',
  sortOrder: 'asc' | 'desc'
): T[] {
  return [...items].sort((a, b) => {
    let comparison = 0
    switch (sortBy) {
      case 'createdAt':
      case 'updatedAt':
        comparison = new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime()
        break
      case 'viewCount':
        comparison = a.viewCount - b.viewCount
        break
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
    }
    return sortOrder === 'asc' ? comparison : -comparison
  })
}