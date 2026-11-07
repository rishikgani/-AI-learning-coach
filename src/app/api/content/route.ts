import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { contentSchema } from '@/lib/validations'
import { slugify } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const type = searchParams.get('type')
    const subjectId = searchParams.get('subjectId')
    const examId = searchParams.get('examId')
    const language = searchParams.get('language')
    const difficulty = searchParams.get('difficulty')
    const query = searchParams.get('query')

    const where: any = {
      isPublished: true,
      isFree: true,
    }

    if (type) where.type = type
    if (subjectId) where.subjectId = subjectId
    if (examId) where.examId = examId
    if (language) where.language = language
    if (difficulty) where.difficulty = difficulty
    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query } },
      ]
    }

    const [content, total] = await Promise.all([
      prisma.content.findMany({
        where,
        include: {
          topic: { select: { name: true, slug: true } },
          subject: { select: { name: true, slug: true } },
          exam: { select: { name: true, slug: true } },
          author: { select: { name: true, image: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.content.count({ where }),
    ])

    return NextResponse.json({
      content,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || !['HOST', 'ADMIN'].includes((session.user as any).role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = contentSchema.parse(body)

    const content = await prisma.content.create({
      data: {
        ...validatedData,
        slug: slugify(validatedData.title),
        tags: validatedData.tags ? JSON.stringify(validatedData.tags) : '[]',
        authorId: (session.user as any).id,
        publishedAt: validatedData.isPublished ? new Date() : null,
      },
    })

    return NextResponse.json({ content }, { status: 201 })
  } catch (error) {
    console.error('Content creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}