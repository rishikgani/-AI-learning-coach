import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getAIService, AI_PROVIDERS, DEFAULT_MODELS } from '@/lib/ai'

describe('AI Service', () => {
  let aiService: ReturnType<typeof getAIService>

  beforeEach(() => {
    aiService = getAIService()
    vi.clearAllMocks()
  })

  describe('Provider Configuration', () => {
    it('has all required providers configured', () => {
      const providerIds = AI_PROVIDERS.map(p => p.id)
      expect(providerIds).toContain('google')
      expect(providerIds).toContain('groq')
      expect(providerIds).toContain('openrouter')
      expect(providerIds).toContain('openai')
      expect(providerIds).toContain('anthropic')
      expect(providerIds).toContain('together')
      expect(providerIds).toContain('huggingface')
    })

    it('has models for each provider', () => {
      AI_PROVIDERS.forEach(provider => {
        expect(provider.models.length).toBeGreaterThan(0)
        provider.models.forEach(model => {
          expect(model.id).toBeTruthy()
          expect(model.name).toBeTruthy()
          expect(model.provider).toBe(provider.id)
          expect(model.maxTokens).toBeGreaterThan(0)
          expect(model.capabilities.length).toBeGreaterThan(0)
        })
      })
    })

    it('has default models configured', () => {
      expect(DEFAULT_MODELS.chat).toBeTruthy()
      expect(DEFAULT_MODELS.fast).toBeTruthy()
      expect(DEFAULT_MODELS.reasoning).toBeTruthy()
      expect(DEFAULT_MODELS.coding).toBeTruthy()
    })
  })

  describe('API Key Management', () => {
    it('allows setting API keys', () => {
      aiService.setApiKey('google', 'test-key')
      expect(aiService.getApiKey('google')).toBe('test-key')
    })

    it('falls back to environment variables', () => {
      process.env.GOOGLE_API_KEY = 'env-key'
      const service = getAIService()
      expect(service.getApiKey('google')).toBe('env-key')
    })

    it('prioritizes explicit keys over environment', () => {
      process.env.GOOGLE_API_KEY = 'env-key'
      aiService.setApiKey('google', 'explicit-key')
      expect(aiService.getApiKey('google')).toBe('explicit-key')
    })
  })

  describe('Provider Detection', () => {
    it('detects Google models', () => {
      expect(aiService['detectProvider']('gemini-1.5-flash')).toBe('google')
      expect(aiService['detectProvider']('gemini-1.5-pro')).toBe('google')
    })

    it('detects Groq models', () => {
      expect(aiService['detectProvider']('llama-3.1-70b-versatile')).toBe('groq')
      expect(aiService['detectProvider']('mixtral-8x7b-32768')).toBe('groq')
      expect(aiService['detectProvider']('gemma2-9b-it')).toBe('groq')
    })

    it('detects OpenAI models', () => {
      expect(aiService['detectProvider']('gpt-4o')).toBe('openai')
      expect(aiService['detectProvider']('gpt-4o-mini')).toBe('openai')
    })

    it('detects Anthropic models', () => {
      expect(aiService['detectProvider']('claude-3-haiku-20240307')).toBe('anthropic')
      expect(aiService['detectProvider']('claude-3-5-sonnet-20241022')).toBe('anthropic')
    })

    it('detects OpenRouter models', () => {
      expect(aiService['detectProvider']('meta-llama/llama-3.1-70b-instruct:free')).toBe('openrouter')
    })

    it('defaults to Google for unknown models', () => {
      expect(aiService['detectProvider']('unknown-model')).toBe('google')
      expect(aiService['detectProvider'](undefined)).toBe('google')
    })
  })

  describe('Helper Methods', () => {
    it('generateStudyPlan returns structured plan', async () => {
      const result = await aiService.generateStudyPlan({
        subject: 'Physics',
        goal: 'JEE Mains',
        level: 'BEGINNER',
        duration: 30,
        dailyHours: 2,
      })

      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('days')
      expect(Array.isArray(result.days)).toBe(true)
    })

    it('generateQuiz returns structured quiz', async () => {
      const result = await aiService.generateQuiz({
        topic: 'Thermodynamics',
        subject: 'Physics',
        difficulty: 'MEDIUM',
        questionCount: 10,
      })

      expect(result).toHaveProperty('title')
      expect(result).toHaveProperty('questions')
      expect(Array.isArray(result.questions)).toBe(true)
    })

    it('explainConcept returns string', async () => {
      const result = await aiService.explainConcept('Thermodynamics', 'intermediate')
      expect(typeof result).toBe('string')
    })

    it('translateContent returns string', async () => {
      const result = await aiService.translateContent('Hello world', 'HINDI')
      expect(typeof result).toBe('string')
    })

    it('summarizeContent returns string', async () => {
      const result = await aiService.summarizeContent('Long content...', 100)
      expect(typeof result).toBe('string')
    })

    it('generateFlashcards returns array', async () => {
      const result = await aiService.generateFlashcards('Physics', 5)
      expect(Array.isArray(result)).toBe(true)
    })

    it('generateMindMap returns string', async () => {
      const result = await aiService.generateMindMap('Physics')
      expect(typeof result).toBe('string')
    })
  })
})