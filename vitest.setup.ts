import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: vi.fn(),
  signOut: vi.fn(),
}))

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
    studentProfile: {
      upsert: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
    },
    aIConfig: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
    aIUsage: {
      create: vi.fn(),
    },
    content: {
      findMany: vi.fn(),
      count: vi.fn(),
      create: vi.fn(),
    },
    exam: {
      findMany: vi.fn(),
    },
    subject: {
      findMany: vi.fn(),
    },
  },
}))

// Mock AI Service
vi.mock('@/lib/ai', () => ({
  getAIService: () => {
    // Each service instance gets its own API key store
    const apiKeyStore = new Map<string, string>()
    return {
      generateContent: vi.fn().mockResolvedValue({
        content: 'Mock AI response',
        usage: { promptTokens: 10, completionTokens: 20, totalTokens: 30 },
        model: 'gemini-1.5-flash',
        provider: 'google',
      }),
      generateStudyPlan: vi.fn().mockResolvedValue({
        title: 'Test Study Plan',
        description: 'Test description',
        days: [
          { day: 1, topics: ['Topic 1'], objectives: ['Objective 1'], estimatedHours: 2, activities: ['Read', 'Practice'] },
        ],
      }),
      generateQuiz: vi.fn().mockResolvedValue({
        title: 'Test Quiz',
        questions: [
          { question: 'Test?', type: 'MCQ', options: ['A', 'B', 'C', 'D'], correctAnswer: '0', explanation: 'Test', difficulty: 'MEDIUM', marks: 1 },
        ],
      }),
      explainConcept: vi.fn().mockResolvedValue('Test explanation'),
      translateContent: vi.fn().mockResolvedValue('Translated content'),
      summarizeContent: vi.fn().mockResolvedValue('Summary'),
      generateFlashcards: vi.fn().mockResolvedValue([{ front: 'Q', back: 'A' }]),
      generateMindMap: vi.fn().mockResolvedValue('mindmap content'),
      // Add the methods that tests expect - use per-instance store
      setApiKey: vi.fn((provider: string, key: string) => {
        apiKeyStore.set(provider, key)
      }),
      getApiKey: vi.fn((provider: string) => {
        return apiKeyStore.get(provider) || process.env[`${provider.toUpperCase()}_API_KEY`]
      }),
      detectProvider: vi.fn((model) => {
        if (!model) return 'google'
        if (model.startsWith('gemini')) return 'google'
        if (model.startsWith('llama') || model.startsWith('mixtral') || model.startsWith('gemma')) return 'groq'
        if (model.startsWith('gpt')) return 'openai'
        if (model.startsWith('claude')) return 'anthropic'
        if (model.includes('/')) return 'openrouter'
        return 'google'
      }),
    }
  },
  AI_PROVIDERS: [
    {
      id: 'google',
      name: 'Google AI (Gemini)',
      models: [
        { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'google', maxTokens: 1048576, capabilities: ['chat', 'vision', 'function_calling'] },
        { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'google', maxTokens: 2097152, capabilities: ['chat', 'vision', 'function_calling'] }
      ]
    },
    {
      id: 'groq',
      name: 'Groq (Ultra Fast)',
      models: [
        { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile', provider: 'groq', maxTokens: 32768, capabilities: ['chat', 'function_calling'] }
      ]
    },
    {
      id: 'openrouter',
      name: 'OpenRouter (Many Models)',
      models: [
        { id: 'meta-llama/llama-3.1-405b-instruct:free', name: 'Llama 3.1 405B Instruct (Free)', provider: 'openrouter', maxTokens: 131072, capabilities: ['chat'] }
      ]
    },
    {
      id: 'openai',
      name: 'OpenAI',
      models: [
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', maxTokens: 128000, capabilities: ['chat', 'vision', 'function_calling'] }
      ]
    },
    {
      id: 'anthropic',
      name: 'Anthropic (Claude)',
      models: [
        { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku', provider: 'anthropic', maxTokens: 200000, capabilities: ['chat', 'vision', 'function_calling'] }
      ]
    },
    {
      id: 'together',
      name: 'Together AI',
      models: [
        { id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', name: 'Llama 3.1 70B Instruct Turbo', provider: 'together', maxTokens: 131072, capabilities: ['chat', 'function_calling'] }
      ]
    },
    {
      id: 'huggingface',
      name: 'Hugging Face Inference',
      models: [
        { id: 'meta-llama/Meta-Llama-3.1-70B-Instruct', name: 'Llama 3.1 70B Instruct', provider: 'huggingface', maxTokens: 131072, capabilities: ['chat'] }
      ]
    },
  ],
  DEFAULT_MODELS: {
    chat: 'gemini-1.5-flash',
    fast: 'gemini-1.5-flash-8b',
    reasoning: 'gemini-1.5-pro',
    coding: 'llama-3.1-70b-versatile',
    translation: 'gemini-1.5-flash',
    summarization: 'gemini-1.5-flash',
    structured: 'gemini-1.5-flash',
  },
}))

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}))

// Mock lucide-react icons - simple object exports
const iconNames = [
  'Brain', 'Target', 'Trophy', 'BookOpen', 'Sparkles', 'Loader2', 'Send', 'Settings', 'Zap',
  'ArrowRight', 'CheckCircle2', 'AlertCircle', 'User', 'Mail', 'Lock', 'Bell', 'Palette',
  'Globe', 'Save', 'Plus', 'PlusCircle', 'Edit3', 'Video', 'FileText', 'GraduationCap',
  'BarChart3', 'Users', 'TrendingUp', 'Activity', 'Eye', 'Download', 'MoreHorizontal',
  'Clock', 'Upload', 'Heart', 'Star', 'Laptop', 'Shield', 'Code', 'Cpu', 'Database',
  'Waves', 'Award', 'Briefcase', 'Stethoscope', 'Landmark'
] as const

type LucideIconName = typeof iconNames[number]

const lucideMock: Record<LucideIconName, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {} as Record<LucideIconName, React.ComponentType<React.SVGProps<SVGSVGElement>>>
iconNames.forEach(name => {
  lucideMock[name] = () => React.createElement('svg', { 'data-testid': name.toLowerCase() })
})

vi.mock('lucide-react', () => lucideMock)

// Global test utilities
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})