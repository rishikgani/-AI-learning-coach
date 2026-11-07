import { z } from 'zod'

// Auth Validations
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['STUDENT', 'HOST']).default('STUDENT'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const verifyEmailSchema = z.object({
  token: z.string().min(1, 'Verification token is required'),
})

// Onboarding Validations
export const onboardingSchema = z.object({
  // Basic Info
  currentClass: z.string().optional(),
  board: z.string().optional(),
  stream: z.string().optional(),
  specialization: z.string().optional(),

  // Target Exams
  targetExams: z.array(z.string()).min(1, 'Select at least one target exam'),

  // Study Preferences
  dailyStudyTime: z.number().min(15).max(480).default(60),
  preferredLanguages: z.array(z.enum(['ENGLISH', 'HINDI', 'TELUGU'])).min(1).default(['ENGLISH']),

  // Goals
  shortTermGoal: z.string().max(500).optional(),
  longTermGoal: z.string().max(1000).optional(),
})

// Profile Validations
export const updateProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  image: z.string().url().optional(),
  language: z.enum(['ENGLISH', 'HINDI', 'TELUGU']).optional(),
  dailyStudyTime: z.number().min(15).max(480).optional(),
  preferredLanguages: z.array(z.enum(['ENGLISH', 'HINDI', 'TELUGU'])).optional(),
  shortTermGoal: z.string().max(500).optional(),
  longTermGoal: z.string().max(1000).optional(),
})

// Content Validations
export const contentSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().max(2000).optional(),
  type: z.enum(['NOTE', 'VIDEO', 'HANDWRITTEN_NOTE', 'QUIZ', 'PYQ', 'MOCK_TEST', 'FORMULA_SHEET', 'MINDMAP', 'CHEAT_SHEET']),
  topicId: z.string().min(1, 'Topic is required'),
  subjectId: z.string().min(1, 'Subject is required'),
  examId: z.string().optional(),
  language: z.enum(['ENGLISH', 'HINDI', 'TELUGU']).default('ENGLISH'),
  difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']).default('MEDIUM'),
  tags: z.array(z.string()).optional(),

  // For notes
  markdownContent: z.string().optional(),

  // For videos
  videoUrl: z.string().url().optional(),
  videoProvider: z.enum(['YOUTUBE', 'VIMEO', 'SELF_HOSTED', 'GOOGLE_DRIVE']).optional(),
  videoDuration: z.number().optional(),
  thumbnailUrl: z.string().url().optional(),

  // For files
  fileUrl: z.string().url().optional(),
  fileType: z.string().optional(),
  fileSize: z.number().optional(),

  isPublished: z.boolean().default(true),
  isFree: z.boolean().default(true),
})

// Quiz Validations
export const quizSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  topicId: z.string().min(1),
  examId: z.string().optional(),
  timeLimit: z.number().min(1).max(300).optional(),
  questionCount: z.number().min(1).max(100).default(10),
  passingScore: z.number().min(0).max(100).default(60),
  difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']).default('MEDIUM'),
  language: z.enum(['ENGLISH', 'HINDI', 'TELUGU']).default('ENGLISH'),
  source: z.enum(['MANUAL', 'AI_GENERATED', 'PYQ']).default('MANUAL'),
  aiModel: z.string().optional(),
  aiPrompt: z.string().optional(),
  isPublished: z.boolean().default(true),
})

export const quizQuestionSchema = z.object({
  quizId: z.string().min(1),
  question: z.string().min(5, 'Question too short'),
  type: z.enum(['MCQ', 'MSQ', 'TRUE_FALSE', 'FILL_BLANK', 'NUMERICAL', 'SHORT_ANSWER', 'LONG_ANSWER']).default('MCQ'),
  options: z.array(z.string()).min(2, 'At least 2 options required').optional(),
  correctAnswer: z.string().min(1, 'Correct answer required'),
  explanation: z.string().max(2000).optional(),
  difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']).default('MEDIUM'),
  marks: z.number().min(1).max(10).default(1),
  negativeMarks: z.number().min(0).max(5).default(0),
  tags: z.array(z.string()).optional(),
  language: z.enum(['ENGLISH', 'HINDI', 'TELUGU']).default('ENGLISH'),
})

// Study Plan Validations
export const studyPlanSchema = z.object({
  examId: z.string().min(1, 'Exam is required'),
  title: z.string().min(3).max(200),
  description: z.string().max(2000).optional(),
  targetDate: z.string().datetime(),
  dailyHours: z.number().min(0.5).max(12).default(2),
  isAIGenerated: z.boolean().default(false),
  aiModel: z.string().optional(),
  aiPrompt: z.string().optional(),
})

// AI Settings Validations
export const aiSettingsSchema = z.object({
  provider: z.string().optional(),
  model: z.string().optional(),
  apiKeys: z.record(z.string()).optional(),
  defaultTemperature: z.number().min(0).max(2).default(0.7),
  defaultMaxTokens: z.number().min(100).max(8000).default(4096),
  enableAI: z.boolean().default(true),
})

// Settings Validations
export const settingsSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  currentClass: z.string().optional(),
  board: z.string().optional(),
  stream: z.string().optional(),
  specialization: z.string().optional(),
  preferredLanguages: z.array(z.enum(['ENGLISH', 'HINDI', 'TELUGU'])).min(1).default(['ENGLISH']),
  dailyStudyTime: z.number().min(15).max(480).default(60),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  weeklyDigest: z.boolean().default(true),
  theme: z.enum(['light', 'dark', 'system']).default('system'),
})

// Search/Filter Validations
export const contentFilterSchema = z.object({
  query: z.string().optional(),
  type: z.enum(['NOTE', 'VIDEO', 'HANDWRITTEN_NOTE', 'QUIZ', 'PYQ', 'MOCK_TEST', 'FORMULA_SHEET', 'MINDMAP', 'CHEAT_SHEET']).optional(),
  subjectId: z.string().optional(),
  examId: z.string().optional(),
  language: z.enum(['ENGLISH', 'HINDI', 'TELUGU']).optional(),
  difficulty: z.enum(['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']).optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'updatedAt', 'viewCount', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Type exports
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type OnboardingInput = z.infer<typeof onboardingSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ContentInput = z.infer<typeof contentSchema>
export type QuizInput = z.infer<typeof quizSchema>
export type QuizQuestionInput = z.infer<typeof quizQuestionSchema>
export type StudyPlanInput = z.infer<typeof studyPlanSchema>
export type AISettingsInput = z.infer<typeof aiSettingsSchema>
export type ContentFilterInput = z.infer<typeof contentFilterSchema>
export type SettingsInput = z.infer<typeof settingsSchema>