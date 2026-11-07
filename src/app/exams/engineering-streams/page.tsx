'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { GraduationCap, ArrowRight, BookOpen, Video, Brain, Trophy, Code, Cpu, Database, Waves, Zap, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

const streamExams = [
  {
    name: 'CSE (Computer Science Engineering)',
    shortName: 'CSE',
    description: 'Core computer science subjects including algorithms, data structures, OS, DBMS, CN',
    subjects: ['DSA', 'Operating Systems', 'DBMS', 'Computer Networks', 'OOP', 'Software Engineering'],
    difficulty: 'HARD',
    students: '5L+',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    href: '/exams/cse',
  },
  {
    name: 'CSE AI&ML',
    shortName: 'AI&ML',
    description: 'Artificial Intelligence and Machine Learning specialization in CSE',
    subjects: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'NLP', 'Computer Vision', 'Data Science'],
    difficulty: 'EXPERT',
    students: '2L+',
    icon: Cpu,
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    href: '/exams/cse-aiml',
  },
  {
    name: 'AIDS (AI & Data Science)',
    shortName: 'AIDS',
    description: 'Artificial Intelligence and Data Science engineering stream',
    subjects: ['Data Mining', 'Big Data Analytics', 'ML Algorithms', 'Statistics', 'Data Visualization', 'AI Ethics'],
    difficulty: 'HARD',
    students: '1L+',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
    href: '/exams/aids',
  },
  {
    name: 'CD (Cyber Security / Cloud / DevOps)',
    shortName: 'CD',
    description: 'Cyber Security, Cloud Computing, and DevOps specialization',
    subjects: ['Network Security', 'Ethical Hacking', 'Cloud Architecture', 'DevOps', 'Cryptography', 'Compliance'],
    difficulty: 'HARD',
    students: '1.5L+',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-50 dark:bg-red-900/20',
    href: '/exams/cd',
  },
  {
    name: 'EEE (Electrical & Electronics)',
    shortName: 'EEE',
    description: 'Core electrical engineering with electronics and power systems',
    subjects: ['Circuit Theory', 'Power Systems', 'Control Systems', 'Electrical Machines', 'Power Electronics', 'Signals'],
    difficulty: 'HARD',
    students: '3L+',
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    href: '/exams/eee',
  },
  {
    name: 'ECE (Electronics & Communication)',
    shortName: 'ECE',
    description: 'Electronics, communication systems, and signal processing',
    subjects: ['Analog/Digital Electronics', 'Communication Systems', 'Signals & Systems', 'Microprocessors', 'VLSI', 'EMFT'],
    difficulty: 'HARD',
    students: '4L+',
    icon: Waves,
    color: 'from-indigo-500 to-blue-500',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    href: '/exams/ece',
  },
]

const features = [
  { icon: BookOpen, title: 'Core Subject Notes', desc: 'Semester-wise notes for all core engineering subjects with solved examples' },
  { icon: Video, title: 'Lab & Project Guides', desc: 'Video tutorials for programming labs, circuit simulations, and final year projects' },
  { icon: Brain, title: 'AI Study Plans', desc: 'Semester-wise study plans aligned with university curriculum and GATE syllabus' },
  { icon: Trophy, title: 'GATE & Placement Prep', desc: 'Combined preparation for GATE exam and campus placement technical rounds' },
]

export default function EngineeringStreamsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-500/5 via-background to-cyan-500/5 py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 mb-8">
              <GraduationCap className="h-4 w-4" />
              <span className="text-sm font-medium">Engineering Stream Subjects</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Master <span className="animated-gradient-text" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>Engineering Streams</span> with AI
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Prepare for CSE, AI&ML, AIDS, Cyber Security, EEE, ECE and other engineering streams with
              semester-wise notes, AI study plans, lab guides, and placement preparation.
              Available in English, Hindi & Telugu.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2 bg-blue-600 hover:bg-blue-700">
                  <GraduationCap className="h-5 w-5" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="#streams">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 border-blue-500 text-blue-600 hover:bg-blue-50">
                  <ArrowRight className="h-5 w-5" />
                  View All Streams
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Streams Grid */}
      <section id="streams" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Engineering Stream Subjects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your engineering stream to access semester-wise study materials, AI-generated plans, and practice resources
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamExams.map((stream) => (
              <Link key={stream.name} href={stream.href} className={cn('exam-card', stream.bg)}>
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${stream.color.split(' to ')[0]}15, ${stream.color.split(' to ')[1]}15)` }} />
                <div className="relative z-10 p-6 h-full flex flex-col">
                  <div className={cn('inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4', `bg-gradient-to-br ${stream.color}`)}>
                    <stream.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{stream.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">{stream.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {stream.subjects.slice(0, 4).map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {stream.subjects.length > 4 && (
                      <Badge variant="secondary" className="text-xs">+{stream.subjects.length - 4} more</Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Badge variant="secondary" className={cn(
                        'text-xs',
                        stream.difficulty === 'EXPERT' && 'bg-red-100 text-red-700',
                        stream.difficulty === 'HARD' && 'bg-orange-100 text-orange-700',
                        stream.difficulty === 'MEDIUM' && 'bg-yellow-100 text-yellow-700'
                      )}>
                        {stream.difficulty}
                      </Badge>
                    </span>
                    <span>{stream.students} students</span>
                  </div>

                  <Button variant="outline" className="w-full gap-2 border-blue-500 text-blue-600 hover:bg-blue-50" asChild>
                    <Link href={stream.href} className="flex items-center justify-center gap-2 w-full">
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
              Built for engineering students. Every feature designed to help you excel in academics and placements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-blue-500/10 text-blue-600">
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
            <div className="relative rounded-2xl p-8 lg:p-16" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl" />
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                  Ready to Excel in Engineering?
                </h2>
                <p className="text-lg text-blue-50/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of engineering students using AI Learning Coach for academics, GATE & placements.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <Link href="/auth/register">
                  <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                    <GraduationCap className="h-5 w-5" />
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