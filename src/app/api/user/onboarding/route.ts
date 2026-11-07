import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { onboardingSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = onboardingSchema.parse(body)

    // Update student profile
    await prisma.studentProfile.upsert({
      where: { userId: (session.user as any).id },
      update: {
        targetExams: JSON.stringify(validatedData.targetExams),
        currentClass: validatedData.currentClass,
        board: validatedData.board,
        stream: validatedData.stream,
        specialization: validatedData.specialization,
        dailyStudyTime: validatedData.dailyStudyTime,
        preferredLanguages: JSON.stringify(validatedData.preferredLanguages),
        shortTermGoal: validatedData.shortTermGoal,
        longTermGoal: validatedData.longTermGoal,
      },
      create: {
        userId: (session.user as any).id,
        targetExams: JSON.stringify(validatedData.targetExams),
        currentClass: validatedData.currentClass,
        board: validatedData.board,
        stream: validatedData.stream,
        specialization: validatedData.specialization,
        dailyStudyTime: validatedData.dailyStudyTime,
        preferredLanguages: JSON.stringify(validatedData.preferredLanguages),
        shortTermGoal: validatedData.shortTermGoal,
        longTermGoal: validatedData.longTermGoal,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}