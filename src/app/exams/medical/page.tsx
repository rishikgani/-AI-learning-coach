'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, ArrowRight, BookOpen, Video, Brain, Trophy, Stethoscope } from 'lucide-react'
import { cn } from '@/lib/utils'

const medicalExams = [
  {
    name: 'NEET UG',
    shortName: 'NEET',
    description: 'National Eligibility cum Entrance Test for MBBS, BDS, and other medical courses',
    subjects: ['Physics', 'Chemistry', 'Biology (Botany + Zoology)'],
    difficulty: 'HARD',
    students: '20L+',
    icon: Stethoscope,
    color: 'from-red-500 to-pink-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    href: '/exams/neet-ug',
  },
  {
    name: 'NEET PG',
    shortName: 'NEET PG',
    description: 'Postgraduate medical entrance for MD/MS/Diploma courses in India',
    subjects: ['Pre-clinical', 'Para-clinical', 'Clinical Subjects'],
    difficulty: 'EXPERT',
    students: '2L+',
    icon: Stethoscope,
    color: 'from-rose-500 to-red-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    href: '/exams/neet-pg',
  },
  {
    name: 'AIIMS',
    shortName: 'AIIMS',
    description: 'All India Institute of Medical Sciences entrance (now through NEET)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'General Knowledge'],
    difficulty: 'EXPERT',
    students: '15L+',
    icon: Heart,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    href: '/exams/aiims',
  },
  {
    name: 'JIPMER',
    shortName: 'JIPMER',
    description: 'Jawaharlal Institute of Postgraduate Medical Education & Research (now through NEET)',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Logic'],
    difficulty: 'HARD',
    students: '10L+',
    icon: Heart,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    href: '/exams/jipmer',
  },
]

const features = [
  { icon: BookOpen, title: 'NCERT-Based Notes', desc: 'High-yield notes aligned with NCERT syllabus - the foundation of NEET' },
  { icon: Video, title: 'Biology Video Lectures', desc: 'Detailed video explanations for complex Biology topics with diagrams' },
  { icon: Brain, title: 'AI Study Plans', desc: 'Personalized day-wise plans balancing Physics, Chemistry, and Biology' },
  { icon: Trophy, title: 'NEET Mock Tests', desc: 'Full-length mock tests with real exam pattern, AI-generated PYQs' },
]

export default function MedicalExamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-500/5 via-background to-pink-500/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 mb-8">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Medical Entrance Exams</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Ace <span className="animated-gradient-text" style={{ background: 'linear-gradient(135deg, #ef4444, #ec4899)' }}>Medical Exams</span> with AI
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Prepare for NEET UG, NEET PG, AIIMS, JIPMER with personalized AI study plans,
              comprehensive NCERT-based notes, video lectures, and smart practice quizzes.
              Available in English, Hindi & Telugu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-red-600 hover:bg-red-700">
                  <Heart className="h-5 w-5" />
                  Start Preparing Free
                </Button>
              </Link>
              <Link href="#exams">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 border-red-500 text-red-600 hover:bg-red-50">
                  <ArrowRight className="h-5 w-5" />
                  View All Exams
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exams Grid */}
      <section id="exams" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Medical Entrance Exams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your target exam to access personalized study materials, AI-generated plans, and practice resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicalExams.map((exam) => (
              <Link key={exam.name} href={exam.href} className={cn('exam-card', exam.bg)}>
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${exam.color.split(' to ')[0]}15, ${exam.color.split(' to ')[1]}15)` }} />
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className={cn('inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4', `bg-gradient-to-br ${exam.color}`)}>
                    <exam.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exam.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{exam.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exam.subjects.map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Badge variant="secondary" className={cn(
                        'text-xs',
                        exam.difficulty === 'EXPERT' && 'bg-red-100 text-red-700',
                        exam.difficulty === 'HARD' && 'bg-orange-100 text-orange-700',
                        exam.difficulty === 'MEDIUM' && 'bg-yellow-100 text-yellow-700'
                      )}>
                        {exam.difficulty}
                      </Badge>
                    </span>
                    <span>{exam.students} students</span>
                  </div>

                  <Button variant="outline" className="w-full gap-2 border-red-500 text-red-600 hover:bg-red-50" asChild>
                    <Link href={exam.href} className="flex items-center justify-center gap-2 w-full">
                      <span>Explore Resources</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose AI Learning Coach for Medical?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for medical aspirants. Every feature designed to maximize your learning efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-red-500/10 text-red-600">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative rounded-2xl p-8 lg:p-16" style={{ background: 'linear-gradient(135deg, #ef4444, #ec4899)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Become a Doctor?
                </h2>
                <p className="text-lg text-red-50/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of medical aspirants using AI Learning Coach.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <Link href="/auth/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                    <Heart className="h-5 w-5" />
                    Start Free Preparation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}