import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const aiSettingsSchema = z.object({
  defaultProvider: z.string().optional(),
  defaultModel: z.string().optional(),
  geminiApiKey: z.string().optional(),
  groqApiKey: z.string().optional(),
  openrouterApiKey: z.string().optional(),
  openaiApiKey: z.string().optional(),
  anthropicApiKey: z.string().optional(),
  togetherApiKey: z.string().optional(),
  huggingfaceApiKey: z.string().optional(),
  defaultTemperature: z.number().min(0).max(2).default(0.7),
  defaultMaxTokens: z.number().min(100).max(8000).default(4096),
  enableAI: z.boolean().default(true),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const aiConfig = await prisma.aIConfig.findUnique({
      where: { userId: (session.user as any).id },
    })

    // Don't return API keys in GET response for security
    if (aiConfig) {
      const {
        geminiApiKey,
        groqApiKey,
        openrouterApiKey,
        openaiApiKey,
        anthropicApiKey,
        togetherApiKey,
        huggingfaceApiKey,
        ...safeConfig
      } = aiConfig
      return NextResponse.json({ config: safeConfig })
    }

    return NextResponse.json({ config: null })
  } catch (error) {
    console.error('AI settings fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = aiSettingsSchema.parse(body)

    const aiConfig = await prisma.aIConfig.upsert({
      where: { userId: (session.user as any).id },
      update: validatedData,
      create: {
        userId: (session.user as any).id,
        ...validatedData,
      },
    })

    // Don't return API keys in response for security
    const {
      geminiApiKey,
      groqApiKey,
      openrouterApiKey,
      openaiApiKey,
      anthropicApiKey,
      togetherApiKey,
      huggingfaceApiKey,
      ...safeConfig
    } = aiConfig

    return NextResponse.json({ config: safeConfig })
  } catch (error) {
    console.error('AI settings save error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid input', details: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}