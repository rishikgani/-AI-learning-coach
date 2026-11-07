import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const languageSchema = z.object({
  language: z.enum(['ENGLISH', 'HINDI', 'TELUGU']),
})

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { language } = languageSchema.parse(body)

    await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { language },
    })

    // Also update student profile preferred languages
    await prisma.studentProfile.update({
      where: { userId: (session.user as any).id },
      data: { preferredLanguages: JSON.stringify([language]) },
    })

    return NextResponse.json({ success: true, language })
  } catch (error) {
    console.error('Language update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}