'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, BookOpen, Video, Trophy, Zap, Users, Globe, Languages, Shield, CheckCircle, ArrowRight, Sparkles, Target, GraduationCap, Laptop, Heart, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const examCategories = [
  { name: 'Engineering', exams: ['JEE Mains', 'JEE Advanced', 'MHT-CET', 'BITSAT', 'VITEEE', 'SRMJEEE', 'COMEDK', 'WBJEE'], icon: Laptop, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Medical', exams: ['NEET UG', 'NEET PG', 'AIIMS', 'JIPMER', 'MBBS', 'BDS', 'Nursing', 'Pharmacy'], icon: Heart, color: 'from-red-500 to-pink-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { name: 'Competitive', exams: ['UPSC CSE', 'State PSC', 'SSC CGL', 'Bank PO', 'Railway', 'Defence', 'CLAT', 'CAT'], icon: Target, color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'Engineering Streams', exams: ['CSE', 'CSE AI&ML', 'AIDS', 'CD', 'EEE', 'ECE', 'Mechanical', 'Civil'], icon: GraduationCap, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { name: 'School', exams: ['10th Board', '12th Board', 'CBSE', 'ICSE', 'State Boards', 'NTSE', 'Olympiads', 'KVPY'], icon: BookOpen, color: 'from-orange-500 to-amber-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { name: 'More Exams', exams: ['GATE', 'ESE', 'CUET', 'IPMAT', 'NPAT', 'SET', 'MAT', 'XAT'], icon: Star, color: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Personalization',
    description: 'Get personalized study plans based on your goals, current level, and available time. AI adapts to your progress.',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon: BookOpen,
    title: 'Handwritten Notes',
    description: 'Access high-quality handwritten notes from toppers and educators. Available in English, Hindi, and Telugu.',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: Video,
    title: 'Video Lectures',
    description: 'Learn from curated video lectures. YouTube embeds, educator channels, and topic-wise playlists.',
    color: 'text-red-600 bg-red-100',
  },
  {
    icon: Trophy,
    title: 'Smart Practice Quizzes',
    description: 'AI-generated quizzes, PYQs, and mock tests. Instant feedback with explanations and weak topic detection.',
    color: 'text-yellow-600 bg-yellow-100',
  },
  {
    icon: Globe,
    title: 'Multi-Language Support',
    description: 'Study in your preferred language - English, Hindi (हिंदी), or Telugu (తెలుగు). AI translation available.',
    color: 'text-green-600 bg-green-100',
  },
  {
    icon: Zap,
    title: 'Progress Tracking',
    description: 'Detailed analytics, streak tracking, weak topic identification, and AI-powered next-step recommendations.',
    color: 'text-orange-600 bg-orange-100',
  },
]

const stats = [
  { value: '50+', label: 'Exams Covered' },
  { value: '10,000+', label: 'Study Materials' },
  { value: '100+', label: 'Subjects' },
  { value: '3', label: 'Languages' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    exam: 'JEE Mains 2024 - 99.2%ile',
    content: 'The personalized study plan saved me months of confusion. AI identified my weak topics in Physics and gave me targeted practice.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Kumar',
    exam: 'NEET UG 2024 - 680/720',
    content: 'Handwritten notes in Hindi were a game changer. The Biology notes were exactly what NCERT doesn\'t explain well.',
    avatar: 'RK',
  },
  {
    name: 'Ananya Reddy',
    exam: 'EAMCET - Rank 1,247',
    content: 'Free access to quality content and AI coach helped me balance board exams and entrance prep. The streak feature kept me consistent.',
    avatar: 'AR',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-secondary/5 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Completely Free • No Credit Card Required • Open Source</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Your <span className="animated-gradient-text">AI Learning Coach</span> for Every Exam
            </h1>

            {/* Subheadline */}
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '100ms' }}>
              Free, personalized AI-powered learning platform for JEE, NEET, UPSC, Engineering, Medical, School exams & more.
              Get custom study plans, handwritten notes, video lectures, and smart quizzes in English, Hindi & Telugu.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <Link href="/auth/register">
                <Button size="xl" className="w-full sm:w-auto gap-2">
                  <Brain className="h-5 w-5" />
                  Start Learning Free
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2">
                  <ArrowRight className="h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>No API costs - Bring your own keys</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>100% Free forever</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Open source & self-hostable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Categories */}
      <section id="exams" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">All Exams Covered</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From JEE & NEET to UPSC & Engineering streams - one platform for every competitive exam in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examCategories.map((category, index) => (
              <Link
                key={category.name}
                href={`/exams/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={cn('group exam-category-card', category.bg)}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${category.color.split(' to ')[0]}15, ${category.color.split(' to ')[1]}15)` }} />
                <div className="relative z-10">
                  <div className={cn('inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4', `bg-gradient-to-br ${category.color}`)}>
                    <category.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{category.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.exams.slice(0, 6).map((exam) => (
                      <Badge key={exam} variant="outline" className="text-xs group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors">
                        {exam}
                      </Badge>
                    ))}
                    {category.exams.length > 6 && (
                      <Badge variant="secondary" className="text-xs">+{category.exams.length - 6} more</Badge>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose AI Learning Coach?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for students, by students. Every feature designed to maximize your learning efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className={cn('inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4', feature.color)}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From signup to success in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Sign Up Free', desc: 'Create account with Google or email. No credit card. Choose your target exams and preferences.' },
              { step: '02', title: 'Get AI Study Plan', desc: 'Tell us your goal, current level, and daily study time. AI generates a personalized day-wise plan.' },
              { step: '03', title: 'Learn & Practice', desc: 'Access notes, videos, and handwritten materials. Take AI-generated quizzes with instant feedback.' },
              { step: '04', title: 'Track & Improve', desc: 'Monitor progress, identify weak topics, get AI recommendations. Build streaks and ace your exams!' },
            ].map((item, index) => (
              <div key={item.step} className="relative text-center">
                <div className="relative mb-6">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-2xl z-10">
                    {item.step}
                  </div>
                  {index < 3 && (
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 hidden lg:block" />
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Toppers</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real students, real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={testimonial.name} className="card-hover h-full">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.exam}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
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
                  Ready to Ace Your Exams?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who are already using AI Learning Coach.
                  Completely free, no hidden costs, bring your own AI keys.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/auth/register">
                    <Button size="xl" variant="secondary" className="w-full sm:w-auto gap-2 text-lg px-8">
                      <Brain className="h-5 w-5" />
                      Start Free Now
                    </Button>
                  </Link>
                  <Link href="/docs" target="_blank" rel="noopener noreferrer">
                    <Button size="xl" variant="outline" className="w-full sm:w-auto gap-2 text-lg px-8 border-white text-white hover:bg-white/10">
                      View Documentation
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">AI Learning Coach</span>
              </Link>
              <p className="text-muted-foreground max-w-sm">
                Free AI-powered personalized learning platform for all competitive exams in India.
                Built with ❤️ for students who can't afford expensive coaching.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Exams</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/exams/engineering" className="hover:text-foreground">Engineering (JEE, CET, etc.)</Link></li>
                <li><Link href="/exams/medical" className="hover:text-foreground">Medical (NEET, AIIMS, etc.)</Link></li>
                <li><Link href="/exams/competitive" className="hover:text-foreground">Competitive (UPSC, SSC, etc.)</Link></li>
                <li><Link href="/exams/school" className="hover:text-foreground">School (10th, 12th, Olympiads)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/docs" className="hover:text-foreground" target="_blank" rel="noopener">Documentation</Link></li>
                <li><Link href="/api-docs" className="hover:text-foreground" target="_blank" rel="noopener">API Reference</Link></li>
                <li><Link href="/github" className="hover:text-foreground" target="_blank" rel="noopener">GitHub Repository</Link></li>
                <li><Link href="/contribute" className="hover:text-foreground">Contribute</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© 2024 AI Learning Coach. Free forever. Open source.</p>
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="hover:text-foreground">Privacy</a>
              <a href="/terms" className="hover:text-foreground">Terms</a>
              <a href="/contact" className="hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}