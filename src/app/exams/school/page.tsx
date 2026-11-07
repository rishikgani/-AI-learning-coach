'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, ArrowRight, Video, Brain, Trophy, Award, GraduationCap, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const schoolExams = [
  {
    name: 'Class 10 Board',
    shortName: '10th',
    description: 'CBSE, ICSE, and State Board Class 10 examinations',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi/Sanskrit'],
    difficulty: 'MEDIUM',
    students: '1Cr+',
    icon: BookOpen,
    color: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/class-10',
  },
  {
    name: 'Class 12 Board',
    shortName: '12th',
    description: 'CBSE, ICSE, and State Board Class 12 examinations',
    subjects: ['Physics', 'Chemistry', 'Mathematics/Biology', 'English', 'Computer Science/Economics'],
    difficulty: 'MEDIUM',
    students: '80L+',
    icon: GraduationCap,
    color: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/class-12',
  },
  {
    name: 'NTSE',
    shortName: 'NTSE',
    description: 'National Talent Search Examination for Class 10 students',
    subjects: ['MAT (Mental Ability)', 'SAT (Scholastic Aptitude - Science, Math, Social Science)'],
    difficulty: 'HARD',
    students: '10L+',
    icon: Award,
    color: 'from-yellow-500 to-amber-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    href: '/exams/ntse',
  },
  {
    name: 'Olympiads',
    shortName: 'Olympiads',
    description: 'SOF, SilverZone, and other Olympiad exams (IMO, NSO, IEO, etc.)',
    subjects: ['Mathematics', 'Science', 'English', 'Cyber', 'General Knowledge'],
    difficulty: 'HARD',
    students: '50L+',
    icon: Star,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    href: '/exams/olympiads',
  },
  {
    name: 'KVPY',
    shortName: 'KVPY',
    description: 'Kishore Vaigyanik Protsahan Yojana for Class 11/12 science students',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
    difficulty: 'EXPERT',
    students: '1L+',
    icon: Award,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    href: '/exams/kvpy',
  },
]

const features = [
  { icon: BookOpen, title: 'NCERT Solutions', desc: 'Step-by-step solutions for all NCERT textbook questions and exemplars' },
  { icon: Video, title: 'Concept Videos', desc: 'Animated videos for Science and Mathematics concepts with real-life examples' },
  { icon: Brain, title: 'AI Study Plans', desc: 'Personalized daily study plans balancing school syllabus and competitive exam prep' },
  { icon: Trophy, title: 'Practice Worksheets', desc: 'Chapter-wise worksheets, sample papers, and previous year question banks' },
]

export default function SchoolExamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-green-500/5 via-background to-emerald-500/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 mb-8">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">School & Foundation Exams</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Excel in <span className="animated-gradient-text" style={{ background: 'linear-gradient(135deg, #22c55e, #10b981)' }}>School Exams</span> with AI
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Prepare for Class 10, Class 12 Boards, NTSE, Olympiads, KVPY with personalized AI study plans,
              NCERT solutions, concept videos, and practice worksheets. Available in English, Hindi & Telugu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-700">
                  <BookOpen className="h-5 w-5" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="#exams">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 border-green-500 text-green-600 hover:bg-green-50">
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">School & Foundation Exams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your target exam to access personalized study materials, AI-generated plans, and practice resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolExams.map((exam) => (
              <Link key={exam.name} href={exam.href} className={cn('exam-card', exam.bg)}>
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${exam.color.split(' to ')[0]}15, ${exam.color.split(' to ')[1]}15)` }} />
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className={cn('inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4', `bg-gradient-to-br ${exam.color}`)}>
                    <exam.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{exam.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{exam.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {exam.subjects.slice(0, 4).map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {exam.subjects.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{exam.subjects.length - 4} more</Badge>
                    )}
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

                  <Button variant="outline" className="w-full gap-2 border-green-500 text-green-600 hover:bg-green-50" asChild>
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
              Built for school students. Every feature designed to build strong foundations for future success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-green-500/10 text-green-600">
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
            <div className="relative rounded-2xl p-8 lg:p-16" style={{ background: 'linear-gradient(135deg, #22c55e, #10b981)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Build Strong Foundations Today?
                </h2>
                <p className="text-lg text-green-50/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of school students using AI Learning Coach for boards, NTSE, Olympiads & more.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <Link href="/auth/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                    <BookOpen className="h-5 w-5" />
                    Start Free Learning
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