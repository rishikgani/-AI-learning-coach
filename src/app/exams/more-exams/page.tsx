'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ArrowRight, BookOpen, Video, Brain, Trophy, Award, Briefcase, GraduationCap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const otherExams = [
  {
    name: 'GATE',
    shortName: 'GATE',
    description: 'Graduate Aptitude Test in Engineering for M.Tech/PhD admissions and PSU jobs',
    subjects: ['Engineering Mathematics', 'Core Engineering Subjects', 'General Aptitude'],
    difficulty: 'EXPERT',
    students: '8L+',
    icon: Award,
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    href: '/exams/gate',
  },
  {
    name: 'ESE (IES)',
    shortName: 'ESE',
    description: 'Engineering Services Examination for Group A technical posts in government',
    subjects: ['General Studies', 'Engineering Aptitude', 'Core Engineering (2 papers)'],
    difficulty: 'EXPERT',
    students: '2L+',
    icon: Briefcase,
    color: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/ese',
  },
  {
    name: 'CUET',
    shortName: 'CUET',
    description: 'Common University Entrance Test for UG/PG admissions in central universities',
    subjects: ['Language', 'Domain Subjects', 'General Test'],
    difficulty: 'MEDIUM',
    students: '15L+',
    icon: GraduationCap,
    color: 'from-orange-500 to-red-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    href: '/exams/cuet',
  },
  {
    name: 'B.Ed Entrance',
    shortName: 'B.Ed',
    description: 'Bachelor of Education entrance exams for teaching careers (State/Central)',
    subjects: ['General English', 'Teaching Aptitude', 'General Awareness', 'Logical Reasoning', 'Subject Knowledge'],
    difficulty: 'MEDIUM',
    students: '20L+',
    icon: GraduationCap,
    color: 'from-green-500 to-teal-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    href: '/exams/bed-entrance',
  },
  {
    name: 'M.Ed Entrance',
    shortName: 'M.Ed',
    description: 'Master of Education entrance for advanced teaching and educational research',
    subjects: ['Philosophy of Education', 'Psychology of Education', 'Research Methodology', 'Educational Technology'],
    difficulty: 'MEDIUM',
    students: '2L+',
    icon: GraduationCap,
    color: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    href: '/exams/med-entrance',
  },
  {
    name: 'B.P.Ed / M.P.Ed',
    shortName: 'B.P.Ed/M.P.Ed',
    description: 'Bachelor/Master of Physical Education for sports and fitness careers',
    subjects: ['Anatomy & Physiology', 'Sports Psychology', 'Kinesiology', 'Sports Management', 'Physical Fitness'],
    difficulty: 'MEDIUM',
    students: '1L+',
    icon: Trophy,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/bped-mped',
  },
  {
    name: 'LLB Entrance (3/5 Year)',
    shortName: 'LLB',
    description: 'Law entrance exams for 3-year and 5-year LLB programs (MH CET, PU LLB, etc.)',
    subjects: ['Legal Aptitude', 'General Knowledge', 'English', 'Logical Reasoning', 'Mathematics'],
    difficulty: 'MEDIUM',
    students: '5L+',
    icon: Award,
    color: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/llb-entrance',
  },
  {
    name: 'Hotel Management (NCHMCT)',
    shortName: 'Hotel Mgmt',
    description: 'National Council for Hotel Management JEE for B.Sc Hospitality & Hotel Administration',
    subjects: ['English', 'Reasoning', 'Numerical Ability', 'General Knowledge', 'Service Aptitude'],
    difficulty: 'MEDIUM',
    students: '1L+',
    icon: Briefcase,
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    href: '/exams/hotel-management',
  },
  {
    name: 'Mass Communication (IIMC, etc.)',
    shortName: 'Mass Comm',
    description: 'Entrance exams for journalism and mass communication programs',
    subjects: ['General Awareness', 'English', 'Media Aptitude', 'Current Affairs', 'Analytical Skills'],
    difficulty: 'MEDIUM',
    students: '50K+',
    icon: Star,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    href: '/exams/mass-communication',
  },
  {
    name: 'IPMAT',
    shortName: 'IPMAT',
    description: 'Integrated Program in Management Aptitude Test for IIM 5-year programs',
    subjects: ['Quantitative Ability', 'Verbal Ability', 'Logical Reasoning'],
    difficulty: 'HARD',
    students: '50K+',
    icon: Star,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/ipmat',
  },
  {
    name: 'NPAT',
    shortName: 'NPAT',
    description: 'NMIMS Programs After Twelfth for BBA, B.Com, B.Sc programs',
    subjects: ['Quantitative & Numerical Ability', 'Reasoning & General Intelligence', 'English'],
    difficulty: 'MEDIUM',
    students: '30K+',
    icon: GraduationCap,
    color: 'from-green-500 to-teal-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    href: '/exams/npat',
  },
  {
    name: 'SET',
    shortName: 'SET',
    description: 'Symbiosis Entrance Test for undergraduate programs',
    subjects: ['General English', 'Quantitative', 'General Awareness', 'Analytical & Logical Reasoning'],
    difficulty: 'MEDIUM',
    students: '40K+',
    icon: Star,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    href: '/exams/set',
  },
  {
    name: 'MAT',
    shortName: 'MAT',
    description: 'Management Aptitude Test for MBA/PGDM admissions',
    subjects: ['Language Comprehension', 'Mathematical Skills', 'Data Analysis', 'Intelligence & Critical Reasoning', 'Indian & Global Environment'],
    difficulty: 'MEDIUM',
    students: '1L+',
    icon: Briefcase,
    color: 'from-teal-500 to-cyan-500',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    href: '/exams/mat',
  },
  {
    name: 'XAT',
    shortName: 'XAT',
    description: 'Xavier Aptitude Test for XLRI and other XAMI member institutes',
    subjects: ['Verbal & Logical Ability', 'Decision Making', 'Quantitative Ability', 'General Knowledge'],
    difficulty: 'HARD',
    students: '1L+',
    icon: Award,
    color: 'from-red-500 to-rose-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    href: '/exams/xat',
  },
  {
    name: 'SSC CHSL',
    shortName: 'SSC CHSL',
    description: 'Combined Higher Secondary Level for LDC, DEO, PA/SA posts (10+2 level)',
    subjects: ['English', 'Quantitative Aptitude', 'General Intelligence', 'General Awareness'],
    difficulty: 'EASY',
    students: '50L+',
    icon: Shield,
    color: 'from-cyan-500 to-blue-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    href: '/exams/ssc-chsl',
  },
  {
    name: 'SSC MTS',
    shortName: 'SSC MTS',
    description: 'Multi Tasking Staff (Non-Technical) for Group C posts (10th pass)',
    subjects: ['English', 'Numerical Aptitude', 'General Awareness', 'Reasoning'],
    difficulty: 'EASY',
    students: '80L+',
    icon: Shield,
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    href: '/exams/ssc-mts',
  },
  {
    name: 'IBPS RRB',
    shortName: 'IBPS RRB',
    description: 'Regional Rural Bank exams for Officer Scale I,II,III and Office Assistant',
    subjects: ['Reasoning', 'Quantitative Aptitude', 'English/Hindi', 'General Awareness', 'Computer Knowledge'],
    difficulty: 'MEDIUM',
    students: '30L+',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    href: '/exams/ibps-rrb',
  },
  {
    name: 'LIC AAO/ADO',
    shortName: 'LIC',
    description: 'Life Insurance Corporation Assistant Administrative Officer and Apprentice Development Officer',
    subjects: ['Reasoning', 'Quantitative Aptitude', 'English', 'General Awareness', 'Insurance Knowledge'],
    difficulty: 'MEDIUM',
    students: '10L+',
    icon: Shield,
    color: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/lic-aao-ado',
  },
  {
    name: 'EPFO',
    shortName: 'EPFO',
    description: 'Employees Provident Fund Organisation SSA, Enforcement Officer, Accounts Officer exams',
    subjects: ['General English', 'Quantitative Aptitude', 'Reasoning', 'General Awareness', 'Social Security'],
    difficulty: 'MEDIUM',
    students: '5L+',
    icon: Briefcase,
    color: 'from-purple-500 to-violet-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/epfo',
  },
]

const features = [
  { icon: BookOpen, title: 'Syllabus-Aligned Notes', desc: 'Comprehensive notes covering exact syllabus for each exam with weightage analysis' },
  { icon: Video, title: 'Strategy Videos', desc: 'Expert strategy videos for exam pattern, time management, and section-wise preparation' },
  { icon: Brain, title: 'AI Study Plans', desc: 'Customized plans based on exam pattern, your strengths, and available preparation time' },
  { icon: Trophy, title: 'Mock Tests & Analysis', desc: 'Full-length mock tests with detailed performance analytics and weak area identification' },
]

export default function MoreExamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-500/5 via-background to-cyan-500/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-600 mb-8">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Other Important Exams</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Prepare for <span className="animated-gradient-text" style={{ background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }}>More Exams</span> with AI
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Prepare for GATE, ESE, CUET, IPMAT, NPAT, SET, MAT, XAT and other important exams with
              personalized AI study plans, comprehensive notes, video lectures, and smart practice quizzes.
              Available in English, Hindi & Telugu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-teal-600 hover:bg-teal-700">
                  <Star className="h-5 w-5" />
                  Start Preparing Free
                </Button>
              </Link>
              <Link href="#exams">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 border-teal-500 text-teal-600 hover:bg-teal-50">
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Other Important Exams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your target exam to access personalized study materials, AI-generated plans, and practice resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherExams.map((exam) => (
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

                  <Button variant="outline" className="w-full gap-2 border-teal-500 text-teal-600 hover:bg-teal-50" asChild>
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
              Built for serious aspirants. Every feature designed to help you crack competitive exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-teal-500/10 text-teal-600">
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
            <div className="relative rounded-2xl p-8 lg:p-16" style={{ background: 'linear-gradient(135deg, #14b8a6, #06b6d4)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Crack Your Dream Exam?
                </h2>
                <p className="text-lg text-teal-50/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of aspirants using AI Learning Coach for GATE, ESE, CUET, IPMAT & more.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <Link href="/auth/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                    <Star className="h-5 w-5" />
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