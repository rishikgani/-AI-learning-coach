'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Target, ArrowRight, BookOpen, Video, Brain, Trophy, Shield, Landmark } from 'lucide-react'
import { cn } from '@/lib/utils'

const competitiveExams = [
  {
    name: 'UPSC CSE',
    shortName: 'UPSC',
    description: 'Civil Services Examination for IAS, IPS, IFS, IRS and other Group A & B services',
    subjects: ['History', 'Geography', 'Polity', 'Economy', 'Environment', 'Science & Tech', 'Current Affairs', 'Ethics', 'Essay', 'Optional Subject'],
    difficulty: 'EXPERT',
    students: '10L+',
    icon: Landmark,
    color: 'from-purple-500 to-indigo-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/upsc-cse',
  },
  {
    name: 'IAS/IPS/IFS',
    shortName: 'IAS/IPS/IFS',
    description: 'Indian Administrative Service, Police Service, Foreign Service via UPSC CSE',
    subjects: ['Same as UPSC CSE', 'Personality Test Preparation', 'Mock Interviews'],
    difficulty: 'EXPERT',
    students: '10L+',
    icon: Landmark,
    color: 'from-indigo-500 to-purple-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    href: '/exams/ias-ips',
  },
  {
    name: 'State PSC',
    shortName: 'State PSC',
    description: 'State Public Service Commission exams for state civil services (Dy. Collector, DSP, etc.)',
    subjects: ['State History', 'State Geography', 'Indian Polity', 'Economy', 'Current Affairs', 'State Specific GK'],
    difficulty: 'HARD',
    students: '5L+',
    icon: Landmark,
    color: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-50 dark:bg-violet-900/20',
    href: '/exams/state-psc',
  },
  {
    name: 'SSC CGL',
    shortName: 'SSC CGL',
    description: 'Staff Selection Commission Combined Graduate Level for Group B & C posts',
    subjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'General Awareness'],
    difficulty: 'MEDIUM',
    students: '30L+',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/ssc-cgl',
  },
  {
    name: 'SSC GD Constable',
    shortName: 'SSC GD',
    description: 'Staff Selection Commission General Duty Constable for CAPFs, NIA, SSF, Rifleman',
    subjects: ['General Intelligence & Reasoning', 'General Knowledge & Awareness', 'Elementary Mathematics', 'English/Hindi'],
    difficulty: 'EASY',
    students: '50L+',
    icon: Shield,
    color: 'from-cyan-500 to-teal-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    href: '/exams/ssc-gd-constable',
  },
  {
    name: 'State Police Constable',
    shortName: 'State Constable',
    description: 'State police constable recruitment exams (UP Police, Bihar Police, MP Police, etc.)',
    subjects: ['General Knowledge', 'Reasoning', 'Numerical Ability', 'Hindi/English', 'State GK'],
    difficulty: 'EASY',
    students: '1Cr+',
    icon: Shield,
    color: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/state-police-constable',
  },
  {
    name: 'Bank PO',
    shortName: 'Bank PO',
    description: 'Probationary Officer exams for SBI, IBPS, and other public sector banks',
    subjects: ['Quantitative Aptitude', 'Reasoning', 'English', 'General/Banking Awareness', 'Computer Awareness'],
    difficulty: 'MEDIUM',
    students: '25L+',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    href: '/exams/bank-po',
  },
  {
    name: 'Bank Clerk',
    shortName: 'Bank Clerk',
    description: 'Clerical cadre exams for SBI, IBPS, and other public sector banks',
    subjects: ['English', 'Numerical Ability', 'Reasoning', 'General/Financial Awareness'],
    difficulty: 'EASY',
    students: '40L+',
    icon: Shield,
    color: 'from-emerald-500 to-green-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    href: '/exams/bank-clerk',
  },
  {
    name: 'Railway',
    shortName: 'Railway',
    description: 'RRB exams for Group D, NTPC, ALP, Technician, and other railway positions',
    subjects: ['Mathematics', 'Reasoning', 'General Awareness', 'General Science', 'Technical Subjects'],
    difficulty: 'EASY',
    students: '1Cr+',
    icon: Shield,
    color: 'from-orange-500 to-amber-500',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    href: '/exams/railway',
  },
  {
    name: 'Defence',
    shortName: 'Defence',
    description: 'NDA, CDS, AFCAT, CAPF, and other defence services entrance exams',
    subjects: ['Mathematics', 'English', 'General Knowledge', 'Physics', 'Chemistry', 'Current Affairs'],
    difficulty: 'HARD',
    students: '5L+',
    icon: Target,
    color: 'from-red-500 to-rose-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    href: '/exams/defence',
  },
  {
    name: 'CLAT',
    shortName: 'CLAT',
    description: 'Common Law Admission Test for National Law Universities',
    subjects: ['English', 'Current Affairs', 'Legal Reasoning', 'Logical Reasoning', 'Quantitative Techniques'],
    difficulty: 'HARD',
    students: '60K+',
    icon: Landmark,
    color: 'from-yellow-500 to-orange-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    href: '/exams/clat',
  },
  {
    name: 'CAT',
    shortName: 'CAT',
    description: 'Common Admission Test for IIMs and top B-schools',
    subjects: ['Quantitative Ability', 'Data Interpretation', 'Logical Reasoning', 'Verbal Ability'],
    difficulty: 'EXPERT',
    students: '3L+',
    icon: Target,
    color: 'from-indigo-500 to-purple-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    href: '/exams/cat',
  },
]

const features = [
  { icon: BookOpen, title: 'Current Affairs Daily', desc: 'AI-curated daily current affairs with summaries and quiz questions' },
  { icon: Video, title: 'Concept Videos', desc: 'Animated videos for Polity, Economy, Geography, and Quantitative Aptitude' },
  { icon: Brain, title: 'AI Study Plans', desc: 'Personalized plans balancing static syllabus and current affairs preparation' },
  { icon: Trophy, title: 'Mock Tests & PYQs', desc: 'Full-length mocks with detailed analysis and previous year question practice' },
]

export default function CompetitiveExamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-500/5 via-background to-indigo-500/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 mb-8">
              <Target className="h-4 w-4" />
              <span className="text-sm font-medium">Competitive & Government Exams</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Crack <span className="animated-gradient-text" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>Competitive Exams</span> with AI
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Prepare for UPSC, State PSC, SSC, Banking, Railway, Defence, CLAT, CAT with personalized AI study plans,
              comprehensive notes, video lectures, and smart practice quizzes. Available in English, Hindi & Telugu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-purple-600 hover:bg-purple-700">
                  <Target className="h-5 w-5" />
                  Start Preparing Free
                </Button>
              </Link>
              <Link href="#exams">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 border-purple-500 text-purple-600 hover:bg-purple-50">
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Competitive & Government Exams</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your target exam to access personalized study materials, AI-generated plans, and practice resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveExams.map((exam) => (
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
                        exam.difficulty === 'MEDIUM' && 'bg-yellow-100 text-yellow-700',
                        exam.difficulty === 'EASY' && 'bg-green-100 text-green-700'
                      )}>
                        {exam.difficulty}
                      </Badge>
                    </span>
                    <span>{exam.students} students</span>
                  </div>

                  <Button variant="outline" className="w-full gap-2 border-purple-500 text-purple-600 hover:bg-purple-50" asChild>
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
              Built for competitive exam aspirants. Every feature designed to maximize your learning efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-purple-500/10 text-purple-600">
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
            <div className="relative rounded-2xl p-8 lg:p-16" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Serve the Nation?
                </h2>
                <p className="text-lg text-purple-50/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of aspirants using AI Learning Coach for UPSC, SSC, Banking & more.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <Link href="/auth/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                    <Target className="h-5 w-5" />
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