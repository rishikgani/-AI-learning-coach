'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  Trophy,
  Target,
  Zap,
  Award,
  Clock,
  Brain,
  Play,
  RefreshCw,
  TrendingUp,
  Flag,
  CheckCircle2,
  XCircle,
  BarChart3,
  Filter,
  Search,
  ChevronDown,
} from 'lucide-react'
import { cn, formatDuration, getDifficultyColor } from '@/lib/utils'

// Mock data
const mockQuizzes = [
  {
    id: '1',
    title: 'JEE Mains Physics - Full Syllabus Mock Test',
    type: 'MOCK_TEST',
    subject: 'Physics',
    exam: 'JEE Mains',
    topic: 'Full Syllabus',
    questions: 75,
    duration: 180,
    difficulty: 'HARD',
    language: 'ENGLISH',
    attempts: 1240,
    avgScore: 58,
    passingScore: 60,
    tags: ['JEE', 'Mock Test', 'Full Syllabus'],
    status: 'available',
  },
  {
    id: '2',
    title: 'Thermodynamics - Chapter Practice Quiz',
    type: 'TOPIC',
    subject: 'Physics',
    exam: 'JEE Mains',
    topic: 'Thermodynamics',
    questions: 15,
    duration: 30,
    difficulty: 'MEDIUM',
    language: 'ENGLISH',
    attempts: 3200,
    avgScore: 72,
    passingScore: 60,
    tags: ['JEE', 'Thermodynamics', 'Chapter'],
    status: 'completed',
    userScore: 85,
    userAttempts: 2,
  },
  {
    id: '3',
    title: 'Organic Chemistry - Reaction Mechanisms',
    type: 'TOPIC',
    subject: 'Chemistry',
    exam: 'NEET UG',
    topic: 'Organic Chemistry',
    questions: 20,
    duration: 40,
    difficulty: 'HARD',
    language: 'HINDI',
    attempts: 2100,
    avgScore: 65,
    passingScore: 60,
    tags: ['NEET', 'Organic Chemistry', 'Mechanisms'],
    status: 'in_progress',
    userScore: 45,
    userAttempts: 1,
  },
  {
    id: '4',
    title: 'Calculus - Definite Integration Practice',
    type: 'CHAPTER',
    subject: 'Mathematics',
    exam: 'JEE Advanced',
    topic: 'Calculus',
    questions: 25,
    duration: 50,
    difficulty: 'MEDIUM',
    language: 'ENGLISH',
    attempts: 1800,
    avgScore: 68,
    passingScore: 60,
    tags: ['JEE', 'Calculus', 'Integration'],
    status: 'available',
  },
  {
    id: '5',
    title: 'NEET Biology - Previous Year Questions (2020-2024)',
    type: 'PYQ',
    subject: 'Biology',
    exam: 'NEET UG',
    topic: 'Full Syllabus',
    questions: 90,
    duration: 120,
    difficulty: 'HARD',
    language: 'ENGLISH',
    attempts: 5600,
    avgScore: 75,
    passingScore: 60,
    tags: ['NEET', 'Biology', 'PYQ'],
    status: 'completed',
    userScore: 82,
    userAttempts: 3,
  },
  {
    id: '6',
    title: 'Electrostatics - Quick Revision Quiz',
    type: 'TOPIC',
    subject: 'Physics',
    exam: 'JEE Mains',
    topic: 'Electrostatics',
    questions: 10,
    duration: 20,
    difficulty: 'EASY',
    language: 'TELUGU',
    attempts: 4500,
    avgScore: 78,
    passingScore: 50,
    tags: ['JEE', 'Electrostatics', 'Revision'],
    status: 'available',
  },
]

const mockAttempts = [
  { id: '1', quizTitle: 'Thermodynamics Quiz', score: 85, date: '2 hours ago', status: 'completed', correct: 13, total: 15 },
  { id: '2', quizTitle: 'Modern Physics Mock', score: 72, date: '1 day ago', status: 'completed', correct: 54, total: 75 },
  { id: '3', quizTitle: 'Organic Chemistry Mechanisms', score: 45, date: '2 days ago', status: 'completed', correct: 9, total: 20 },
  { id: '4', quizTitle: 'Calculus Integration', score: 68, date: '3 days ago', status: 'completed', correct: 17, total: 25 },
  { id: '5', quizTitle: 'Biology PYQ Set 1', score: 82, date: '5 days ago', status: 'completed', correct: 74, total: 90 },
]

const practiceModes = [
  { value: 'topic', label: 'Topic-wise', icon: Target, desc: 'Practice specific topics' },
  { value: 'chapter', label: 'Chapter Tests', icon: Award, desc: 'Full chapter coverage' },
  { value: 'mock', label: 'Mock Tests', icon: Zap, desc: 'Full exam simulation' },
  { value: 'pyq', label: 'PYQs', icon: Flag, desc: 'Previous year questions' },
  { value: 'ai', label: 'AI Generated', icon: Brain, desc: 'Custom AI quizzes' },
]

export default function PracticePage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('mode') || 'topic')
  const [activeType, setActiveType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAttempts, setShowAttempts] = useState(false)

  const filteredQuizzes = mockQuizzes.filter((quiz) => {
    const matchesType = activeType === 'all' || quiz.type === activeType.toUpperCase()
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesType && matchesSearch
  })

  if (showAttempts) {
    return (
      <AttemptsView attempts={mockAttempts} onBack={() => setShowAttempts(false)} />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Practice Quizzes</h1>
          <p className="text-muted-foreground">Test your knowledge with smart quizzes and mock tests</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAttempts(true)} className="gap-2">
            <BarChart3 className="h-4 w-4" />
            My Attempts
          </Button>
          <Button className="gap-2">
            <Brain className="h-4 w-4" />
            AI Generate Quiz
          </Button>
        </div>
      </div>

      {/* Practice Modes */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
            {practiceModes.map((mode) => (
              <button
                key={mode.value}
                onClick={() => setActiveTab(mode.value)}
                className={cn(
                  'relative p-4 rounded-xl border-2 text-left transition-all',
                  activeTab === mode.value
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg', activeTab === mode.value ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                    <mode.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{mode.label}</p>
                    <p className="text-xs text-muted-foreground">{mode.desc}</p>
                  </div>
                </div>
                {activeTab === mode.value && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search quizzes, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={activeType} onValueChange={setActiveType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Quiz Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="topic">Topic Practice</SelectItem>
                <SelectItem value="chapter">Chapter Tests</SelectItem>
                <SelectItem value="mock">Mock Tests</SelectItem>
                <SelectItem value="pyq">PYQs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quiz List */}
      <div className="space-y-4">
        {filteredQuizzes.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
            <p className="text-muted-foreground">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function QuizCard({ quiz }: { quiz: typeof mockQuizzes[0] }) {
  const getStatusConfig = () => {
    switch (quiz.status) {
      case 'completed':
        return { color: 'text-green-600 bg-green-100', icon: CheckCircle2, label: 'Completed' }
      case 'in_progress':
        return { color: 'text-blue-600 bg-blue-100', icon: Play, label: 'In Progress' }
      default:
        return { color: 'text-primary bg-primary/10', icon: Play, label: 'Available' }
    }
  }

  const status = getStatusConfig()
  const StatusIcon = status.icon

  return (
    <Card className="card-hover">
      <CardContent className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <div className={cn('p-3 rounded-xl flex-shrink-0', quiz.type === 'MOCK_TEST' ? 'bg-red-100' : quiz.type === 'PYQ' ? 'bg-purple-100' : 'bg-primary/10')}>
              <Trophy className={cn('h-6 w-6', quiz.type === 'MOCK_TEST' ? 'text-red-600' : quiz.type === 'PYQ' ? 'text-purple-600' : 'text-primary')} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <Badge variant="secondary">{quiz.type.replace('_', ' ')}</Badge>
                <Badge variant="outline" className="text-xs">{quiz.subject}</Badge>
                <Badge variant="outline" className="text-xs">{quiz.exam}</Badge>
                <Badge className={cn('text-xs', getDifficultyColor(quiz.difficulty))}>
                  {quiz.difficulty}
                </Badge>
                <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs">
                  <Languages className="h-3 w-3" />
                  {quiz.language}
                </div>
              </div>
              <h3 className="font-semibold text-lg truncate">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{quiz.topic}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{formatDuration(quiz.duration * 60)}</span>
                <span className="flex items-center gap-1">{quiz.questions} Questions</span>
                <span className="flex items-center gap-1">{quiz.attempts.toLocaleString()} attempts</span>
                <span className="flex items-center gap-1 text-green-600">Avg: {quiz.avgScore}%</span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col lg:items-end gap-3 lg:flex-row lg:gap-4">
            {/* Status & Score */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className={status.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {status.label}
              </Badge>
              {quiz.userScore !== undefined && (
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{quiz.userScore}%</p>
                  <p className="text-xs text-muted-foreground">{quiz.userAttempts} attempt(s)</p>
                </div>
              )}
            </div>

            {/* Progress Bar for completed/in-progress */}
            {quiz.userScore !== undefined && (
              <div className="w-48 lg:w-64">
                <Progress value={quiz.userScore} className="h-2" />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {quiz.status === 'in_progress' ? (
                <Button className="gap-2 w-full lg:w-auto">
                  <Play className="h-4 w-4" />
                  Continue
                </Button>
              ) : quiz.status === 'completed' ? (
                <>
                  <Button variant="outline" className="gap-2 w-full lg:w-auto">
                    <RefreshCw className="h-4 w-4" />
                    Retake
                  </Button>
                  <Button variant="ghost" size="icon">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button className="gap-2 w-full lg:w-auto">
                  <Play className="h-4 w-4" />
                  Start Quiz
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AttemptsView({ attempts, onBack }: { attempts: typeof mockAttempts; onBack: () => void }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ChevronDown className="h-4 w-4" />
          Back to Quizzes
        </Button>
        <h1 className="text-3xl font-bold">My Attempts</h1>
      </div>

      <div className="space-y-3">
        {attempts.map((attempt) => (
          <Card key={attempt.id}>
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={cn('p-3 rounded-xl', attempt.score >= 70 ? 'bg-green-100' : attempt.score >= 50 ? 'bg-yellow-100' : 'bg-red-100')}>
                    <Trophy className={cn('h-6 w-6', attempt.score >= 70 ? 'text-green-600' : attempt.score >= 50 ? 'text-yellow-600' : 'text-red-600')} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{attempt.quizTitle}</h3>
                    <p className="text-sm text-muted-foreground">{attempt.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className={cn('text-2xl font-bold', attempt.score >= 70 ? 'text-green-600' : attempt.score >= 50 ? 'text-yellow-600' : 'text-red-600')}>
                      {attempt.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">{attempt.correct}/{attempt.total} correct</p>
                  </div>
                  <Badge variant="outline" className={attempt.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}>
                    {attempt.status}
                  </Badge>
                  <Button variant="ghost" size="icon"><BarChart3 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

import { Languages } from 'lucide-react'