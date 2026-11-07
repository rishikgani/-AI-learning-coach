'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Laptop, ArrowRight, BookOpen, Video, Brain, Trophy, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const engineeringExams = [
  {
    name: 'JEE Mains',
    shortName: 'JEE',
    description: 'Joint Entrance Examination for NITs, IIITs, and other centrally funded technical institutes',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    difficulty: 'HARD',
    students: '10L+',
    icon: Laptop,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/jee-mains',
  },
  {
    name: 'JEE Advanced',
    shortName: 'JEE Adv',
    description: 'Advanced examination for admission to IITs',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    difficulty: 'EXPERT',
    students: '2L+',
    icon: Laptop,
    color: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/jee-advanced',
  },
  {
    name: 'MHT-CET',
    shortName: 'MHT-CET',
    description: 'Maharashtra Common Entrance Test for engineering admissions in Maharashtra',
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    difficulty: 'HARD',
    students: '4L+',
    icon: Laptop,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    href: '/exams/mht-cet',
  },
  {
    name: 'BITSAT',
    shortName: 'BITSAT',
    description: 'Birla Institute of Technology and Science Admission Test',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Logical Reasoning'],
    difficulty: 'HARD',
    students: '3L+',
    icon: Laptop,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    href: '/exams/bitsat',
  },
  {
    name: 'VITEEE',
    shortName: 'VITEEE',
    description: 'Vellore Institute of Technology Engineering Entrance Examination',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    difficulty: 'MEDIUM',
    students: '2L+',
    icon: Laptop,
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    href: '/exams/viteee',
  },
  {
    name: 'SRMJEEE',
    shortName: 'SRMJEEE',
    description: 'SRM Joint Engineering Entrance Examination',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English'],
    difficulty: 'MEDIUM',
    students: '1.5L+',
    icon: Laptop,
    color: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    href: '/exams/srmjeee',
  },
]

const features = [
  { icon: BookOpen, title: 'Comprehensive Notes', desc: 'Chapter-wise notes covering entire syllabus with formulas and key concepts' },
  { icon: Video, title: 'Video Lectures', desc: 'Curated YouTube playlists and educator channels for each topic' },
  { icon: Brain, title: 'AI Study Plans', desc: 'Personalized day-wise study plans based on your target exam and level' },
  { icon: Trophy, title: 'Practice Quizzes', desc: 'Topic-wise, chapter-wise, and full mock tests with AI-generated questions' },
]

export default function EngineeringExamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-secondary/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
              <Laptop className="h-4 w-4" />
              <span className="text-sm font-medium">Engineering Entrance Exams</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Crack Top <span className="animated-gradient-text">Engineering Exams</span> with AI
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Prepare for JEE Mains, JEE Advanced, BITSAT, VITEEE, and state CETs with personalized AI study plans,
              comprehensive notes, video lectures, and smart practice quizzes. Available in English, Hindi & Telugu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2">
                  <Laptop className="h-5 w-5" />
                  Start Preparing Free
                </Button>
              </Link>
              <Link href="#exams">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Engineering Entrance Exams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your target exam to access personalized study materials, AI-generated plans, and practice resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringExams.map((exam) => (
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

                  <Button variant="outline" className="w-full gap-2" asChild>
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose AI Learning Coach?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for engineering aspirants. Every feature designed to maximize your learning efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-primary/10 text-primary">
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
            <div className="relative rounded-2xl p-8 lg:p-16 gradient-primary">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Crack Your Engineering Dream?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of engineering aspirants using AI Learning Coach.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <Link href="/auth/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                    <Laptop className="h-5 w-5" />
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