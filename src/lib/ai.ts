/**
 * Multi-Provider AI Service for AI Learning Coach
 * Supports: Gemini, OpenAI, Anthropic, Groq, OpenRouter, Together, HuggingFace
 * Users can provide their own API keys in settings
 */

export interface AIProvider {
  id: string
  name: string
  models: AIModel[]
  requiresApiKey: boolean
  freeTier?: string
}

export interface AIModel {
  id: string
  name: string
  provider: string
  maxTokens: number
  costPer1kTokens?: { input: number; output: number }
  capabilities: ModelCapability[]
}

export type ModelCapability =
  | 'chat'
  | 'reasoning'
  | 'code'
  | 'translation'
  | 'summarization'
  | 'structured_output'

export interface AIMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface AIRequest {
  messages: AIMessage[]
  model?: string
  provider?: string
  temperature?: number
  maxTokens?: number
  responseFormat?: 'text' | 'json'
  apiKey?: string
}

export interface AIResponse {
  content: string
  usage: {
    promptTokens: number
    completionTokens: number
    totalTokens: number
  }
  model: string
  provider: string
  cost?: number
}

// Provider configurations
export const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'google',
    name: 'Google AI (Gemini)',
    requiresApiKey: true,
    freeTier: 'Generous free tier: 15 RPM, 1M tokens/day',
    models: [
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        provider: 'google',
        maxTokens: 1048576,
        costPer1kTokens: { input: 0.000075, output: 0.0003 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization', 'structured_output'],
      },
      {
        id: 'gemini-1.5-flash-8b',
        name: 'Gemini 1.5 Flash 8B',
        provider: 'google',
        maxTokens: 1048576,
        costPer1kTokens: { input: 0.0000375, output: 0.00015 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization'],
      },
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'google',
        maxTokens: 2097152,
        costPer1kTokens: { input: 0.00125, output: 0.005 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization', 'structured_output'],
      },
    ],
  },
  {
    id: 'groq',
    name: 'Groq (Ultra Fast)',
    requiresApiKey: true,
    freeTier: 'Free: 14,400 req/day, 30K tokens/min',
    models: [
      {
        id: 'llama-3.1-70b-versatile',
        name: 'Llama 3.1 70B Versatile',
        provider: 'groq',
        maxTokens: 131072,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization'],
      },
      {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B Instant',
        provider: 'groq',
        maxTokens: 131072,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization'],
      },
      {
        id: 'mixtral-8x7b-32768',
        name: 'Mixtral 8x7B',
        provider: 'groq',
        maxTokens: 32768,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code', 'translation'],
      },
      {
        id: 'gemma2-9b-it',
        name: 'Gemma 2 9B',
        provider: 'groq',
        maxTokens: 8192,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code'],
      },
    ],
  },
  {
    id: 'openrouter',
    name: 'OpenRouter (Many Models)',
    requiresApiKey: true,
    freeTier: 'Free models available, pay for premium',
    models: [
      {
        id: 'meta-llama/llama-3.1-405b-instruct:free',
        name: 'Llama 3.1 405B (Free)',
        provider: 'openrouter',
        maxTokens: 131072,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization'],
      },
      {
        id: 'meta-llama/llama-3.1-70b-instruct:free',
        name: 'Llama 3.1 70B (Free)',
        provider: 'openrouter',
        maxTokens: 131072,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization'],
      },
      {
        id: 'google/gemma-2-9b-it:free',
        name: 'Gemma 2 9B (Free)',
        provider: 'openrouter',
        maxTokens: 8192,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning'],
      },
      {
        id: 'mistralai/mistral-7b-instruct:free',
        name: 'Mistral 7B (Free)',
        provider: 'openrouter',
        maxTokens: 32768,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code'],
      },
    ],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    requiresApiKey: true,
    freeTier: 'Free trial credits, then pay-as-you-go',
    models: [
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o Mini',
        provider: 'openai',
        maxTokens: 16384,
        costPer1kTokens: { input: 0.00015, output: 0.0006 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization', 'structured_output'],
      },
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'openai',
        maxTokens: 128000,
        costPer1kTokens: { input: 0.0025, output: 0.01 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization', 'structured_output'],
      },
    ],
  },
  {
    id: 'anthropic',
    name: 'Anthropic (Claude)',
    requiresApiKey: true,
    freeTier: 'Free trial credits',
    models: [
      {
        id: 'claude-3-haiku-20240307',
        name: 'Claude 3 Haiku',
        provider: 'anthropic',
        maxTokens: 200000,
        costPer1kTokens: { input: 0.00025, output: 0.00125 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization', 'structured_output'],
      },
      {
        id: 'claude-3-5-sonnet-20241022',
        name: 'Claude 3.5 Sonnet',
        provider: 'anthropic',
        maxTokens: 200000,
        costPer1kTokens: { input: 0.003, output: 0.015 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization', 'structured_output'],
      },
    ],
  },
  {
    id: 'together',
    name: 'Together AI',
    requiresApiKey: true,
    freeTier: 'Free credits on signup',
    models: [
      {
        id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        name: 'Llama 3.1 70B Turbo',
        provider: 'together',
        maxTokens: 131072,
        costPer1kTokens: { input: 0.0009, output: 0.0009 },
        capabilities: ['chat', 'reasoning', 'code', 'translation', 'summarization'],
      },
      {
        id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        name: 'Llama 3.1 8B Turbo',
        provider: 'together',
        maxTokens: 131072,
        costPer1kTokens: { input: 0.00018, output: 0.00018 },
        capabilities: ['chat', 'reasoning', 'code', 'translation'],
      },
    ],
  },
  {
    id: 'huggingface',
    name: 'Hugging Face Inference',
    requiresApiKey: true,
    freeTier: 'Free inference for many models',
    models: [
      {
        id: 'meta-llama/Meta-Llama-3.1-70B-Instruct',
        name: 'Llama 3.1 70B (HF)',
        provider: 'huggingface',
        maxTokens: 131072,
        costPer1kTokens: { input: 0, output: 0 },
        capabilities: ['chat', 'reasoning', 'code'],
      },
    ],
  },
]

// Default models for different tasks
export const DEFAULT_MODELS = {
  chat: 'gemini-1.5-flash',
  fast: 'gemini-1.5-flash-8b',
  reasoning: 'gemini-1.5-pro',
  coding: 'llama-3.1-70b-versatile',
  translation: 'gemini-1.5-flash',
  summarization: 'gemini-1.5-flash',
  structured: 'gemini-1.5-flash',
}

// AI Service Class
export class AIService {
  private apiKeys: Record<string, string> = {}

  constructor(apiKeys?: Record<string, string>) {
    if (apiKeys) this.apiKeys = apiKeys
  }

  setApiKey(provider: string, key: string) {
    this.apiKeys[provider] = key
  }

  getApiKey(provider: string): string | undefined {
    return this.apiKeys[provider] || process.env[`${provider.toUpperCase()}_API_KEY`]
  }

  async generateContent(request: AIRequest): Promise<AIResponse> {
    const provider = request.provider || this.detectProvider(request.model)
    const apiKey = request.apiKey || this.getApiKey(provider)

    if (!apiKey) {
      throw new Error(`No API key found for provider: ${provider}. Please add your API key in settings.`)
    }

    switch (provider) {
      case 'google':
        return this.callGoogle(request, apiKey)
      case 'groq':
        return this.callGroq(request, apiKey)
      case 'openrouter':
        return this.callOpenRouter(request, apiKey)
      case 'openai':
        return this.callOpenAI(request, apiKey)
      case 'anthropic':
        return this.callAnthropic(request, apiKey)
      case 'together':
        return this.callTogether(request, apiKey)
      case 'huggingface':
        return this.callHuggingFace(request, apiKey)
      default:
        throw new Error(`Unsupported provider: ${provider}`)
    }
  }

  private detectProvider(model?: string): string {
    if (!model) return 'google'
    if (model.startsWith('gemini')) return 'google'
    if (model.startsWith('llama') || model.startsWith('mixtral') || model.startsWith('gemma')) return 'groq'
    if (model.startsWith('gpt')) return 'openai'
    if (model.startsWith('claude')) return 'anthropic'
    if (model.includes('/')) return 'openrouter'
    return 'google'
  }

  private async callGoogle(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || DEFAULT_MODELS.chat
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const contents = request.messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: request.temperature ?? 0.7,
          maxOutputTokens: request.maxTokens ?? 4096,
          responseMimeType: request.responseFormat === 'json' ? 'application/json' : 'text/plain',
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Google API Error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const usage = data.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0, totalTokenCount: 0 }

    return {
      content,
      usage: {
        promptTokens: usage.promptTokenCount || 0,
        completionTokens: usage.candidatesTokenCount || 0,
        totalTokens: usage.totalTokenCount || 0,
      },
      model,
      provider: 'google',
    }
  }

  private async callGroq(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || DEFAULT_MODELS.coding
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4096,
        response_format: request.responseFormat === 'json' ? { type: 'json_object' } : undefined,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Groq API Error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      model,
      provider: 'groq',
    }
  }

  private async callOpenRouter(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || DEFAULT_MODELS.chat
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Learning Coach',
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4096,
        response_format: request.responseFormat === 'json' ? { type: 'json_object' } : undefined,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenRouter API Error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      model,
      provider: 'openrouter',
    }
  }

  private async callOpenAI(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || DEFAULT_MODELS.chat
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4096,
        response_format: request.responseFormat === 'json' ? { type: 'json_object' } : undefined,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API Error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      model,
      provider: 'openai',
    }
  }

  private async callAnthropic(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || DEFAULT_MODELS.reasoning
    const systemMessage = request.messages.find((m) => m.role === 'system')
    const messages = request.messages.filter((m) => m.role !== 'system')

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model,
        system: systemMessage?.content,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4096,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Anthropic API Error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.content?.[0]?.text || '',
      usage: data.usage || { input_tokens: 0, output_tokens: 0 },
      model,
      provider: 'anthropic',
    }
  }

  private async callTogether(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || DEFAULT_MODELS.coding
    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: request.messages,
        temperature: request.temperature ?? 0.7,
        max_tokens: request.maxTokens ?? 4096,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Together API Error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    return {
      content: data.choices[0]?.message?.content || '',
      usage: data.usage || { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
      model,
      provider: 'together',
    }
  }

  private async callHuggingFace(request: AIRequest, apiKey: string): Promise<AIResponse> {
    const model = request.model || 'meta-llama/Meta-Llama-3.1-70B-Instruct'
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        inputs: request.messages.map((m) => `${m.role}: ${m.content}`).join('\n'),
        parameters: {
          temperature: request.temperature ?? 0.7,
          max_new_tokens: request.maxTokens ?? 4096,
          return_full_text: false,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`HuggingFace API Error: ${error.error || response.statusText}`)
    }

    const data = await response.json()
    const content = Array.isArray(data) ? data[0]?.generated_text : data.generated_text

    return {
      content: content || '',
      usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 },
      model,
      provider: 'huggingface',
    }
  }

  // Helper methods for common AI tasks
  async generateStudyPlan(params: {
    subject: string
    goal: string
    level: string
    duration: number
    dailyHours: number
    exam?: string
    language?: string
  }): Promise<any> {
    const prompt = `Create a detailed day-wise study plan for:
Subject: ${params.subject}
Goal: ${params.goal}
Current Level: ${params.level}
Duration: ${params.duration} days
Daily Study Time: ${params.dailyHours} hours
${params.exam ? `Target Exam: ${params.exam}` : ''}
${params.language ? `Language: ${params.language}` : ''}

Return as JSON with this structure:
{
  "title": "Study Plan Title",
  "description": "Brief description",
  "days": [
    {
      "day": 1,
      "topics": ["Topic 1", "Topic 2"],
      "objectives": ["Objective 1", "Objective 2"],
      "estimatedHours": 2,
      "activities": ["Read chapter", "Watch video", "Practice problems"]
    }
  ]
}`

    const response = await this.generateContent({
      messages: [
        { role: 'system', content: 'You are an expert educational planner. Create structured, realistic study plans.' },
        { role: 'user', content: prompt },
      ],
      responseFormat: 'json',
      temperature: 0.5,
    })

    try {
      return JSON.parse(response.content)
    } catch {
      return { error: 'Failed to parse AI response', raw: response.content }
    }
  }

  async generateQuiz(params: {
    topic: string
    subject: string
    difficulty: string
    questionCount: number
    language?: string
    exam?: string
  }): Promise<any> {
    const prompt = `Generate a ${params.questionCount}-question quiz for:
Topic: ${params.topic}
Subject: ${params.subject}
Difficulty: ${params.difficulty}
${params.exam ? `Exam: ${params.exam}` : ''}
${params.language ? `Language: ${params.language}` : ''}

Return as JSON:
{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "Question text",
      "type": "MCQ",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "0",
      "explanation": "Why this is correct",
      "difficulty": "${params.difficulty}",
      "marks": 1
    }
  ]
}`

    const response = await this.generateContent({
      messages: [
        { role: 'system', content: 'You are an expert quiz creator. Generate clear, accurate questions with explanations.' },
        { role: 'user', content: prompt },
      ],
      responseFormat: 'json',
      temperature: 0.6,
    })

    try {
      return JSON.parse(response.content)
    } catch {
      return { error: 'Failed to parse AI response', raw: response.content }
    }
  }

  async translateContent(content: string, targetLanguage: string): Promise<string> {
    const response = await this.generateContent({
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following educational content to ${targetLanguage}. Preserve formatting, technical terms, and educational context.`,
        },
        { role: 'user', content: content },
      ],
      temperature: 0.3,
    })
    return response.content
  }

  async summarizeContent(content: string, maxLength: number = 500): Promise<string> {
    const response = await this.generateContent({
      messages: [
        {
          role: 'system',
          content: `Summarize the following educational content in ${maxLength} words or less. Keep key concepts, formulas, and important points.`,
        },
        { role: 'user', content: content },
      ],
      temperature: 0.4,
    })
    return response.content
  }

  async explainConcept(concept: string, level: string, language?: string): Promise<string> {
    const response = await this.generateContent({
      messages: [
        {
          role: 'system',
          content: `You are an expert teacher. Explain "${concept}" for a ${level} level student. Use clear examples, analogies, and step-by-step explanations. ${language ? `Respond in ${language}.` : ''}`,
        },
        { role: 'user', content: `Explain ${concept} for ${level} level.` },
      ],
      temperature: 0.5,
    })
    return response.content
  }

  async generateFlashcards(topic: string, count: number = 10): Promise<any[]> {
    const response = await this.generateContent({
      messages: [
        {
          role: 'system',
          content: `Create ${count} flashcards for "${topic}". Each card should have a question/term on front and answer/definition on back. Return as JSON array.`,
        },
        { role: 'user', content: `Generate flashcards for ${topic}` },
      ],
      responseFormat: 'json',
      temperature: 0.6,
    })

    try {
      return JSON.parse(response.content)
    } catch {
      return []
    }
  }

  async generateMindMap(topic: string, count: number = 10): Promise<string> {
    const response = await this.generateContent({
      messages: [
        {
          role: 'system',
          content: `Create a mind map for "${topic}" in Mermaid.js format. Generate a hierarchical mind map with main branches and sub-branches. Return only the Mermaid.js code block.`,
        },
        { role: 'user', content: `Generate a mind map for ${topic}` },
      ],
      temperature: 0.5,
    })

    return response.content
  }
}

// Singleton instance
let aiServiceInstance: AIService | null = null

export function getAIService(apiKeys?: Record<string, string>): AIService {
  if (!aiServiceInstance) {
    aiServiceInstance = new AIService(apiKeys)
  } else if (apiKeys) {
    Object.entries(apiKeys).forEach(([provider, key]) => {
      aiServiceInstance!.setApiKey(provider, key)
    })
  }
  return aiServiceInstance
}