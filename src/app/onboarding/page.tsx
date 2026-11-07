'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Brain, GraduationCap, Target, Clock, Languages, BookOpen, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react'
import { onboardingSchema, type OnboardingInput } from '@/lib/validations'
import { cn, LANGUAGE_FLAGS, LANGUAGE_NAMES, getLanguageFlag, getLanguageName } from '@/lib/utils'
import { toast } from 'sonner'

// Exam options organized by category
const examOptions = [
  { category: 'Engineering', exams: ['JEE Mains', 'JEE Advanced', 'MHT-CET', 'BITSAT', 'VITEEE', 'SRMJEEE', 'COMEDK', 'WBJEE'] },
  { category: 'Medical', exams: ['NEET UG', 'NEET PG', 'AIIMS', 'JIPMER'] },
  { category: 'Competitive', exams: ['UPSC CSE', 'State PSC', 'SSC CGL', 'Bank PO', 'Railway', 'Defence', 'CLAT', 'CAT'] },
  { category: 'Engineering Streams', exams: ['CSE', 'CSE AI&ML', 'AIDS', 'CD', 'EEE', 'Logic & Algorithms'] },
  { category: 'School', exams: ['Class 10', 'Class 12', 'NTSE', 'Olympiads', 'KVPY'] },
  { category: 'Other', exams: ['GATE', 'ESE', 'CUET', 'IPMAT'] },
]

const classOptions = [
  'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  'B.Tech 1st Year', 'B.Tech 2nd Year', 'B.Tech 3rd Year', 'B.Tech 4th Year',
  'MBBS 1st Year', 'MBBS 2nd Year', 'MBBS 3rd Year', 'MBBS 4th Year',
  'Graduate', 'Post Graduate', 'Working Professional', 'Other'
]

const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Other']
const streamOptions = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts/Humanities', 'Vocational']
const specializationOptions = [
  'CSE', 'CSE AI&ML', 'AIDS', 'CD', 'EEE', 'ECE', 'Mechanical', 'Civil',
  'Chemical', 'Biotechnology', 'Aerospace', 'Other'
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnboardingInput>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      targetExams: [],
      preferredLanguages: ['ENGLISH'],
      dailyStudyTime: 60,
    },
  })

  const targetExams = watch('targetExams', [])
  const preferredLanguages = watch('preferredLanguages', ['ENGLISH'])

  const totalSteps = 4

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleExam = (exam: string) => {
    if (targetExams.includes(exam)) {
      setValue('targetExams', targetExams.filter((e) => e !== exam))
    } else {
      setValue('targetExams', [...targetExams, exam])
    }
  }

  const toggleLanguage = (lang: 'ENGLISH' | 'HINDI' | 'TELUGU') => {
    if (preferredLanguages.includes(lang)) {
      setValue('preferredLanguages', preferredLanguages.filter((l) => l !== lang))
    } else {
      setValue('preferredLanguages', [...preferredLanguages, lang])
    }
  }

  const onSubmit = async (data: OnboardingInput) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save onboarding data')
      }

      toast.success('Profile setup complete!')
      router.push('/dashboard')
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepExams onNext={nextStep} onBack={prevStep} targetExams={targetExams} toggleExam={toggleExam} errors={errors} />
      case 2:
        return <StepProfile onNext={nextStep} onBack={prevStep} register={register} errors={errors} />
      case 3:
        return <StepPreferences onNext={nextStep} onBack={prevStep} preferredLanguages={preferredLanguages} toggleLanguage={toggleLanguage} register={register} watch={watch} errors={errors} />
      case 4:
        return <StepGoals onSubmit={handleSubmit(onSubmit)} onBack={prevStep} isSubmitting={isSubmitting} register={register} errors={errors} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-purple-500/5 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Personalize Your Experience</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Let's set up your profile</h1>
          <p className="text-muted-foreground">This helps us create personalized study plans and recommendations</p>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all',
                  step < currentStep ? 'bg-primary text-primary-foreground' :
                  step === currentStep ? 'bg-primary/20 text-primary border-2 border-primary' :
                  'bg-muted text-muted-foreground'
                )}>
                  {step < currentStep ? <CheckCircle2 className="h-5 w-5" /> : step}
                </div>
                {step < totalSteps && (
                  <div className={cn(
                    'hidden md:block w-16 h-1 rounded-full',
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  )} />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span>Exams</span>
            <span>Profile</span>
            <span>Preferences</span>
            <span>Goals</span>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-center">Step {currentStep} of {totalSteps}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {renderStep()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="gap-2"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back
                </Button>
                {currentStep === totalSteps ? (
                  <Button type="submit" className="gap-2" disabled={isSubmitting}>
                    Complete Setup
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button" onClick={nextStep} className="gap-2">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Step Components
function StepExams({ onNext, onBack, targetExams, toggleExam, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <Target className="h-12 w-12 mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold">What are your target exams?</h3>
        <p className="text-muted-foreground text-sm">Select all that apply</p>
      </div>

      {errors.targetExams && (
        <p className="text-sm text-red-600 text-center">{errors.targetExams.message}</p>
      )}

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {examOptions.map(({ category, exams }) => (
          <div key={category} className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {exams.map((exam) => (
                <button
                  key={exam}
                  type="button"
                  onClick={() => toggleExam(exam)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all border',
                    targetExams.includes(exam)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:border-primary/50'
                  )}
                >
                  {exam}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {targetExams.length > 0 && (
        <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
          <p className="text-sm text-primary font-medium">
            {targetExams.length} exam{targetExams.length > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  )
}

function StepProfile({ onNext, onBack, register, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <GraduationCap className="h-12 w-12 mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold">Tell us about yourself</h3>
        <p className="text-muted-foreground text-sm">This helps us tailor content to your level</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="currentClass">Current Class/Year</Label>
          <Select {...register('currentClass')}>
            <SelectTrigger>
              <SelectValue placeholder="Select your class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
          {errors.currentClass && <p className="text-sm text-red-600">{errors.currentClass.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="board">Board</Label>
          <Select {...register('board')}>
            <SelectTrigger>
              <SelectValue placeholder="Select board" />
            </SelectTrigger>
            <SelectContent>
              {boardOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stream">Stream</Label>
          <Select {...register('stream')}>
            <SelectTrigger>
              <SelectValue placeholder="Select stream" />
            </SelectTrigger>
            <SelectContent>
              {streamOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization (if applicable)</Label>
          <Select {...register('specialization')}>
            <SelectTrigger>
              <SelectValue placeholder="Select specialization" />
            </SelectTrigger>
            <SelectContent>
              {specializationOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function StepPreferences({ onNext, onBack, preferredLanguages, toggleLanguage, register, watch, errors }: any) {
  const dailyStudyTime = watch('dailyStudyTime', 60)

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <Languages className="h-12 w-12 mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold">Study Preferences</h3>
        <p className="text-muted-foreground text-sm">How do you like to learn?</p>
      </div>

      <div className="space-y-2">
        <Label>Preferred Languages</Label>
        <div className="flex flex-wrap gap-2">
          {['ENGLISH', 'HINDI', 'TELUGU'].map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => toggleLanguage(lang)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all',
                preferredLanguages.includes(lang)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <span>{getLanguageFlag(lang)}</span>
              <span>{getLanguageName(lang)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dailyStudyTime">Daily Study Time</Label>
        <div className="flex items-center gap-4">
          <Input
            id="dailyStudyTime"
            type="range"
            min="15"
            max="480"
            step="15"
            {...register('dailyStudyTime', { valueAsNumber: true })}
            className="flex-1"
          />
          <span className="text-sm font-medium w-24 text-right">{dailyStudyTime} min</span>
        </div>
        <p className="text-xs text-muted-foreground">Recommended: 60-120 minutes for consistent progress</p>
      </div>
    </div>
  )
}

function StepGoals({ onSubmit, onBack, isSubmitting, register, errors }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <BookOpen className="h-12 w-12 mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold">Your Learning Goals</h3>
        <p className="text-muted-foreground text-sm">Optional but helps us create better plans</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shortTermGoal">Short-term Goal (1-3 months)</Label>
          <Textarea
            id="shortTermGoal"
            placeholder="e.g., Complete JEE Mains Physics syllabus, Score 90% in NEET Biology..."
            {...register('shortTermGoal')}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="longTermGoal">Long-term Goal (6-12 months)</Label>
          <Textarea
            id="longTermGoal"
            placeholder="e.g., Get into IIT Bombay CSE, Become a doctor, Clear UPSC in first attempt..."
            {...register('longTermGoal')}
            rows={3}
          />
        </div>
      </div>

      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-start gap-3">
          <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-primary">AI-Powered Personalization</p>
            <p className="text-sm text-muted-foreground mt-1">
              Based on your goals, we'll generate personalized study plans, recommend relevant content,
              create custom quizzes, and track your progress with AI insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Textarea } from '@/components/ui/textarea'