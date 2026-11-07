import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role as any,
        emailVerified: null, // Will be verified via email
      },
    })

    // Create student/host profile
    if (validatedData.role === 'STUDENT') {
      await prisma.studentProfile.create({
        data: {
          userId: user.id,
          preferredLanguages: JSON.stringify(['ENGLISH']),
          dailyStudyTime: 60,
        },
      })
    } else if (validatedData.role === 'HOST') {
      await prisma.hostProfile.create({
        data: {
          userId: user.id,
          canCreateContent: true,
          canViewAnalytics: true,
        },
      })
    }

    // TODO: Send verification email

    return NextResponse.json(
      { message: 'User created successfully. Please verify your email.' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}