'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Brain,
  BookOpen,
  Trophy,
  Flame,
  Target,
  Zap,
  Clock,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Plus,
  PieChart,
  BarChart3,
  LineChart,
  Sparkles,
  PlayCircle,
} from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'
import { useState, useEffect } from 'react'

// Types for real data (will be fetched from API)
interface UserStats {
  studyStreak: number
  topicsCompleted: number
  quizzesTaken: number
  hoursStudied: number
}

interface RecentActivity {
  type: 'quiz' | 'note' | 'plan'
  title: string
  score: number | null
  time: string
  color: string
}

interface WeakTopic {
  topic: string
  subject: string
  mastery: number
  color: string
}

interface UpcomingQuiz {
  title: string
  date: string
  questions: number
  duration: number
  type: string
}

interface Recommendation {
  title: string
  reason: string
  action: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

interface StudyPlanProgress {
  name: string
  progress: number
  daysCompleted: number
  topicsDone: number
  daysRemaining: number
  nextTopic: string
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const user = session?.user
  const userName = user?.name?.split(' ')[0] || 'Student'
  const [isNewUser, setIsNewUser] = useState(true)
  const [hasOnboarded, setHasOnboarded] = useState(false)

  // Check if user has completed onboarding
  useEffect(() => {
    if (session?.user) {
      // In a real app, fetch from API: /api/user/stats, /api/user/onboarding-status
      // For now, we'll simulate checking if user has data
      const checkUserData = async () => {
        try {
          // This would be an API call in production
          // const response = await fetch('/api/user/stats')
          // const data = await response.json()

          // Simulate: new user has no data
          // setIsNewUser(data.isNewUser)
          // setHasOnboarded(data.hasOnboarded)
        } catch {
          // Ignore errors
        }
      }
      checkUserData()
    }
  }, [session])

  // Generate stats based on user state
  const stats = isNewUser
    ? [
        { label: 'Study Streak', value: '0 days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
        { label: 'Topics Completed', value: '0', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' },
        { label: 'Quizzes Taken', value: '0', icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-100' },
        { label: 'Hours Studied', value: '0h', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100' },
      ]
    : [
        // This would come from real API data
        { label: 'Study Streak', value: '0 days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-100' },
        { label: 'Topics Completed', value: '0', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-100' },
        { label: 'Quizzes Taken', value: '0', icon: Trophy, color: 'text-blue-500', bg: 'bg-blue-100' },
        { label: 'Hours Studied', value: '0h', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-100' },
      ]

  const recentActivity: RecentActivity[] = []
  const weakTopics: WeakTopic[] = []
  const upcomingQuizzes: UpcomingQuiz[] = []
  const recommendations: Recommendation[] = []

  // Show helpful recommendations for new users
  const getNewUserRecommendations = (): Recommendation[] => {
    if (!hasOnboarded) {
      return [
        { title: 'Complete Your Profile', reason: 'Get personalized study plans', action: 'Start Onboarding', icon: Sparkles, color: 'text-purple-600' },
        { title: 'Select Target Exams', reason: 'Choose JEE, NEET, UPSC, etc.', action: 'Choose Exams', icon: Target, color: 'text-blue-600' },
        { title: 'Set Study Goals', reason: 'Daily study time & preferences', action: 'Set Goals', icon: Clock, color: 'text-green-600' },
        { title: 'Add AI API Key', reason: 'Unlock AI coach features', action: 'Add Key', icon: Brain, color: 'text-orange-600' },
      ]
    }
    return [
      { title: 'Generate Study Plan', reason: 'AI creates personalized schedule', action: 'Create Plan', icon: Target, color: 'text-blue-600' },
      { title: 'Take a Practice Quiz', reason: 'Test your current knowledge', action: 'Start Quiz', icon: Trophy, color: 'text-green-600' },
      { title: 'Browse Study Materials', reason: 'Notes, videos, handwritten notes', action: 'Explore', icon: BookOpen, color: 'text-purple-600' },
      { title: 'Ask AI Coach', reason: 'Get instant explanations', action: 'Chat Now', icon: Brain, color: 'text-orange-600' },
    ]
  }

  const currentRecommendations = hasOnboarded ? getNewUserRecommendations() : getNewUserRecommendations()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {userName}! 👋</h1>
          <p className="text-muted-foreground mt-1">
            {hasOnboarded
              ? "Here's your learning progress overview"
              : 'Complete your profile to get personalized recommendations'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/ai-coach/plan">
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              New Study Plan
            </Button>
          </Link>
          <Link href="/dashboard/practice">
            <Button className="gap-2">
              <Trophy className="h-4 w-4" />
              Practice Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Onboarding Banner for New Users */}
      {!hasOnboarded && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Welcome to AI Learning Coach!</h3>
                  <p className="text-sm text-muted-foreground">Complete your profile to unlock personalized study plans, AI recommendations, and progress tracking.</p>
                </div>
              </div>
              <Link href="/onboarding">
                <Button className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Complete Profile Setup
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={stat.label} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={cn('p-3 rounded-xl', stat.bg)}>
                  <stat.icon className={cn('h-6 w-6', stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Plan Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Current Study Plan
              </CardTitle>
              <Link href="/dashboard/ai-coach/plan">
                <Button variant="ghost" size="sm">Generate Plan</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {hasOnboarded ? (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>No study plan yet</span>
                      <span className="font-medium">0%</span>
                    </div>
                    <Progress value={0} className="h-3" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-muted-foreground">0</p>
                      <p className="text-muted-foreground">Days Completed</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-muted-foreground">0</p>
                      <p className="text-muted-foreground">Topics Done</p>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <p className="text-2xl font-bold text-muted-foreground">0</p>
                      <p className="text-muted-foreground">Days Remaining</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Generate a study plan to get started</span>
                    </div>
                    <Link href="/dashboard/ai-coach/plan">
                      <Button size="sm" className="gap-1">
                        Create Plan <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h4 className="font-medium mb-2">No Study Plan Yet</h4>
                  <p className="text-muted-foreground mb-4">Complete your profile to generate a personalized AI study plan based on your goals, exam targets, and available study time.</p>
                  <Link href="/onboarding">
                    <Button className="gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Weak Topics & Recommendations Tabs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommendations" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="weak">
                    <Brain className="h-4 w-4 mr-2" />
                    Weak Topics
                  </TabsTrigger>
                  <TabsTrigger value="recommendations">
                    <Zap className="h-4 w-4 mr-2" />
                    Recommendations
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="weak" className="space-y-4 mt-4">
                  {weakTopics.length > 0 ? (
                    weakTopics.map((topic, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{topic.topic}</p>
                          <p className="text-sm text-muted-foreground">{topic.subject}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-32">
                            <Progress value={topic.mastery} className="h-2" />
                          </div>
                          <span className={cn('text-sm font-medium', topic.color)}>{topic.mastery}%</span>
                          <Button size="sm" variant="outline">Revise</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Brain className="h-12 w-12 mx-auto mb-3 text-muted-foreground/30" />
                      <p>No weak topics detected yet. Take some quizzes to identify areas for improvement.</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="recommendations" className="space-y-4">
                  {currentRecommendations.map((rec, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={cn('p-2 rounded-lg bg-primary/10', rec.color)}>
                          <rec.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">{rec.title}</p>
                          <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                      </div>
                      <Button size="sm" className="gap-1" variant={rec.action === 'Start Onboarding' || rec.action === 'Complete Profile' ? 'default' : 'outline'}>
                        {rec.action} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <Link href="/dashboard/progress">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <Link key={index} href="#" className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn('p-2 rounded-lg', activity.type === 'quiz' ? 'bg-blue-100' : 'bg-green-100')}>
                          {activity.type === 'quiz' ? (
                            <Trophy className="h-5 w-5 text-blue-600" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      {activity.score !== null && (
                        <span className={cn('font-medium', activity.color)}>
                          {activity.score}%
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <PieChart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                  <h4 className="font-medium mb-2">No Activity Yet</h4>
                  <p className="text-muted-foreground mb-4">Your learning activity will appear here once you start studying, taking quizzes, or completing study plans.</p>
                  <div className="flex gap-2 justify-center">
                    <Link href="/dashboard/practice">
                      <Button variant="outline" className="gap-2">
                        <Trophy className="h-4 w-4" />
                        Take a Quiz
                      </Button>
                    </Link>
                    <Link href="/dashboard/materials">
                      <Button variant="outline" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Browse Materials
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Upcoming Quizzes */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Upcoming Practice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingQuizzes.length > 0 ? (
                <>
                  {upcomingQuizzes.map((quiz, index) => (
                    <Link key={index} href="#" className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors group">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{quiz.title}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {quiz.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {quiz.questions} Q · {quiz.duration}min
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {quiz.type}
                      </Badge>
                    </Link>
                  ))}
                  <Link href="/dashboard/practice" className="block text-center text-primary hover:underline mt-2">
                    View all upcoming →
                  </Link>
                </>
              ) : (
                <div className="text-center py-6">
                  <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground mb-3">No upcoming quizzes scheduled</p>
                  <Link href="/dashboard/practice">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Find a Quiz
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/ai-coach">
                <Button variant="outline" className="h-24 flex-col gap-2 p-4">
                  <Brain className="h-6 w-6" />
                  <span>AI Coach</span>
                </Button>
              </Link>
              <Link href="/dashboard/materials">
                <Button variant="outline" className="h-24 flex-col gap-2 p-4">
                  <BookOpen className="h-6 w-6" />
                  <span>Study Materials</span>
                </Button>
              </Link>
              <Link href="/dashboard/practice">
                <Button variant="outline" className="h-24 flex-col gap-2 p-4">
                  <Trophy className="h-6 w-6" />
                  <span>Practice Quiz</span>
                </Button>
              </Link>
              <Link href="/dashboard/ai-coach/plan">
                <Button variant="outline" className="h-24 flex-col gap-2 p-4">
                  <Target className="h-6 w-6" />
                  <span>Generate Plan</span>
                </Button>
              </Link>
              <Link href="/dashboard/ai-coach/flashcards">
                <Button variant="outline" className="h-24 flex-col gap-2 p-4">
                  <Award className="h-6 w-6" />
                  <span>Flashcards</span>
                </Button>
              </Link>
              <Link href="/dashboard/progress/weak">
                <Button variant="outline" className="h-24 flex-col gap-2 p-4">
                  <TrendingUp className="h-6 w-6" />
                  <span>Weak Topics</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Streak Card / Getting Started */}
          <Card className="bg-gradient-to-br from-primary/10 to-purple-100 border-primary/20">
            <CardContent className="p-6 text-center">
              {hasOnboarded ? (
                <>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Flame className="h-8 w-8 text-orange-500" />
                    <span className="text-4xl font-bold text-primary">0</span>
                    <span className="text-xl text-muted-foreground self-end mb-1">day streak</span>
                  </div>
                  <p className="text-muted-foreground mb-4">Start your learning journey today! Take a quiz or begin a study plan to build your streak.</p>
                  <div className="flex items-center justify-center gap-2">
                    <Link href="/dashboard/practice">
                      <Button size="sm" variant="secondary" className="gap-1">
                        <PlayCircle className="h-4 w-4" />
                        Start Studying
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">Ready to Start?</h4>
                  <p className="text-muted-foreground mb-4">Complete your profile setup to unlock personalized AI study plans, smart recommendations, and progress tracking.</p>
                  <Link href="/onboarding">
                    <Button size="lg" className="gap-2 w-full sm:w-auto">
                      <ArrowRight className="h-4 w-4" />
                      Complete Setup
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}