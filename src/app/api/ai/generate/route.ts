import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAIService } from '@/lib/ai'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const generateSchema = z.object({
  feature: z.enum([
    'STUDY_PLAN_GENERATION',
    'QUIZ_GENERATION',
    'CONTENT_SUMMARIZATION',
    'DOUBT_SOLVING',
    'EXPLANATION_GENERATION',
    'RECOMMENDATION',
    'TRANSLATION',
    'NOTE_GENERATION',
    'MIND_MAP_GENERATION',
    'FLASHCARD_GENERATION',
    'CHAT',
  ]),
  input: z.record(z.any()),
  provider: z.string().optional(),
  model: z.string().optional(),
  apiKeys: z.record(z.string()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { feature, input, provider, model, apiKeys } = generateSchema.parse(body)

    // Get user for language preference
    const user = await prisma.user.findUnique({
      where: { id: (session.user as any).id },
    })

    // Initialize AI service with request API keys
    const aiService = getAIService(apiKeys)

    let result: any

    switch (feature) {
      case 'STUDY_PLAN_GENERATION':
        result = await aiService.generateStudyPlan({
          subject: input.subject,
          goal: input.goal,
          level: input.level,
          duration: input.duration,
          dailyHours: input.dailyHours,
          exam: input.exam,
          language: input.language || user?.language || 'ENGLISH',
        })
        break

      case 'QUIZ_GENERATION':
        result = await aiService.generateQuiz({
          topic: input.topic,
          subject: input.subject,
          difficulty: input.difficulty,
          questionCount: input.questionCount,
          language: input.language || user?.language || 'ENGLISH',
          exam: input.exam,
        })
        break

      case 'EXPLANATION_GENERATION':
        result = await aiService.explainConcept(
          input.concept,
          input.level || 'intermediate',
          input.language || user?.language || 'ENGLISH'
        )
        break

      case 'TRANSLATION':
        result = await aiService.translateContent(
          input.content,
          input.targetLanguage
        )
        break

      case 'CONTENT_SUMMARIZATION':
        result = await aiService.summarizeContent(
          input.content,
          input.maxLength
        )
        break

      case 'FLASHCARD_GENERATION':
        result = await aiService.generateFlashcards(
          input.topic,
          input.count
        )
        break

      case 'CHAT':
        result = await aiService.generateContent({
          messages: input.messages,
          model: input.model,
          provider: input.provider,
          temperature: input.temperature,
          maxTokens: input.maxTokens,
        })
        break

      case 'MIND_MAP_GENERATION':
        result = await aiService.generateMindMap(input.topic, input.count)
        break

      default:
        return NextResponse.json({ error: 'Unsupported feature' }, { status: 400 })
    }

    // Track AI usage
    await prisma.aIUsage.create({
      data: {
        userId: (session.user as any).id,
        feature,
        model: model || 'auto',
        provider: provider || 'auto',
        tokensUsed: result.usage?.totalTokens || 0,
        prompt: JSON.stringify(input),
        response: typeof result === 'string' ? result : JSON.stringify(result),
        success: !result.error,
        errorMessage: result.error,
      },
    })

    if (result.error) {
      return NextResponse.json({ error: result.error, raw: result.raw }, { status: 500 })
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error('AI generation error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}