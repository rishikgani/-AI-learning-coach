'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Video,
  Edit3,
  PlusCircle,
  Trophy,
  Brain,
  GraduationCap,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  ArrowRight,
  Activity,
  Eye,
  Download,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Plus,
  Upload,
} from 'lucide-react'
import { cn, formatRelativeTime } from '@/lib/utils'
import { useState } from 'react'

interface ContentItem {
  id: string
  title: string
  type: string
  subject: string
  exam: string
  status: 'published' | 'draft' | 'review'
  views: number
  createdAt: string
}

interface PendingItem {
  id: string
  title: string
  type: string
  subject: string
  submittedBy: string
  submittedAt: string
}

const quickActions = [
  { label: 'Create Note', icon: Edit3, href: '/host/content/create?type=NOTE', color: 'bg-blue-100 text-blue-600' },
  { label: 'Upload Video', icon: Video, href: '/host/content/create?type=VIDEO', color: 'bg-red-100 text-red-600' },
  { label: 'Upload Handwritten', icon: Edit3, href: '/host/content/create?type=HANDWRITTEN_NOTE', color: 'bg-orange-100 text-orange-600' },
  { label: 'Create Quiz', icon: Trophy, href: '/host/quizzes/create', color: 'bg-purple-100 text-purple-600' },
  { label: 'AI Generate Quiz', icon: Brain, href: '/host/quizzes/ai-generate', color: 'bg-green-100 text-green-600' },
  { label: 'Add Exam', icon: GraduationCap, href: '/host/exams/create', color: 'bg-indigo-100 text-indigo-600' },
  { label: 'Bulk Import', icon: PlusCircle, href: '/host/content/import', color: 'bg-gray-100 text-gray-600' },
  { label: 'View Analytics', icon: BarChart3, href: '/host/analytics', color: 'bg-pink-100 text-pink-600' },
]

const contentTypes = [
  { type: 'Notes', count: 0, icon: FileText, color: 'text-blue-500' },
  { type: 'Videos', count: 0, icon: Video, color: 'text-red-500' },
  { type: 'Handwritten', count: 0, icon: Edit3, color: 'text-orange-500' },
  { type: 'Formulas', count: 0, icon: Brain, color: 'text-purple-500' },
  { type: 'Mind Maps', count: 0, icon: Brain, color: 'text-green-500' },
  { type: 'PYQs', count: 0, icon: GraduationCap, color: 'text-indigo-500' },
  { type: 'Mock Tests', count: 0, icon: Trophy, color: 'text-pink-500' },
  { type: 'Cheat Sheets', count: 0, icon: FileText, color: 'text-gray-500' },
]

export default function HostDashboardPage() {
  const { data: session } = useSession()
  const userName = session?.user?.name?.split(' ')[0] || 'Host'
  const [recentContent, setRecentContent] = useState<ContentItem[]>([])
  const [pendingReview, setPendingReview] = useState<PendingItem[]>([])
  const [stats, setStats] = useState({
    totalContent: 0,
    activeStudents: 0,
    quizzesCreated: 0,
    aiGenerations: 0,
  })

  // In a real app, fetch from API:
  // useEffect(() => {
  //   fetch('/api/host/stats').then(res => res.json()).then(setStats)
  //   fetch('/api/host/content').then(res => res.json()).then(setRecentContent)
  //   fetch('/api/host/pending').then(res => res.json()).then(setPendingReview)
  // }, [])

  // Generate stats based on actual data
  const displayStats = [
    { label: 'Total Content', value: stats.totalContent.toLocaleString(), icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100', change: stats.totalContent > 0 ? '+0%' : 'No content yet' },
    { label: 'Active Students', value: stats.activeStudents.toLocaleString(), icon: Users, color: 'text-green-500', bg: 'bg-green-100', change: stats.activeStudents > 0 ? '+0%' : 'No students yet' },
    { label: 'Quizzes Created', value: stats.quizzesCreated.toLocaleString(), icon: Trophy, color: 'text-purple-500', bg: 'bg-purple-100', change: stats.quizzesCreated > 0 ? '+0%' : 'No quizzes yet' },
    { label: 'AI Generations', value: stats.aiGenerations.toLocaleString(), icon: Brain, color: 'text-orange-500', bg: 'bg-orange-100', change: stats.aiGenerations > 0 ? '+0%' : 'No AI usage yet' },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Host Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userName}! Manage your content and track engagement.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/host/content/create?type=NOTE">
            <Button className="gap-2"><PlusCircle className="h-4 w-4" />New Content</Button>
          </Link>
          <Link href="/host/quizzes/create">
            <Button variant="outline" className="gap-2"><Trophy className="h-4 w-4" />New Quiz</Button>
          </Link>
        </div>
      </div>

      {/* Getting Started Banner for New Hosts */}
      {stats.totalContent === 0 && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Welcome to AI Learning Coach!</h3>
                  <p className="text-sm text-muted-foreground">Start creating content to help students prepare for their exams. You can create notes, upload videos, generate quizzes with AI, and more.</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Link href="/host/content/create?type=NOTE">
                  <Button className="gap-2"><Plus className="h-4 w-4" />Create First Note</Button>
                </Link>
                <Link href="/host/quizzes/ai-generate">
                  <Button variant="outline" className="gap-2"><Brain className="h-4 w-4" />AI Generate Quiz</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {displayStats.map((stat, index) => (
          <Card key={stat.label} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={cn('p-3 rounded-xl', stat.bg)}>
                  <stat.icon className={cn('h-6 w-6', stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {quickActions.map((action) => (
                  <Link key={action.label} href={action.href}>
                    <Button
                      variant="outline"
                      className={cn('h-20 flex-col gap-2 justify-center', action.color)}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Content & Pending Review Tabs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Content Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="recent">
                    <Activity className="h-4 w-4 mr-2" />
                    Recent Content
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Pending Review ({pendingReview.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="space-y-3">
                  {recentContent.length > 0 ? (
                    recentContent.map((content) => <ContentRow key={content.id} content={content} />)
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                      <h4 className="font-medium mb-2">No Content Yet</h4>
                      <p className="text-muted-foreground mb-4">Create your first piece of content to get started.</p>
                      <Link href="/host/content/create?type=NOTE">
                        <Button variant="outline" className="gap-2"><Plus className="h-4 w-4" />Create Content</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="pending" className="space-y-3">
                  {pendingReview.length > 0 ? (
                    pendingReview.map((item) => <PendingRow key={item.id} item={item} />)
                  ) : (
                    <div className="text-center py-8">
                      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                      <h4 className="font-medium mb-2">No Pending Reviews</h4>
                      <p className="text-muted-foreground">Content submitted by other educators will appear here for review.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - 1/3 */}
        <div className="space-y-6">
          {/* Content by Type */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Content by Type
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contentTypes.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-2 rounded-lg bg-muted', item.color)}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
              {stats.totalContent === 0 && (
                <div className="text-center py-4 text-muted-foreground text-sm border-t pt-4">
                  Create content to see breakdown by type
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Performing Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Performing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentContent.length > 0 ? (
                recentContent
                  .filter((c) => c.status === 'published')
                  .sort((a, b) => b.views - a.views)
                  .slice(0, 5)
                  .map((content, index) => (
                    <div key={content.id} className="flex items-center gap-3">
                      <span className="w-6 text-center text-muted-foreground font-medium">#{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{content.title}</p>
                        <p className="text-xs text-muted-foreground">{content.subject} • {content.exam}</p>
                      </div>
                      <span className="text-sm font-medium text-primary">{content.views.toLocaleString()}</span>
                    </div>
                  ))
              ) : (
                <div className="text-center py-6">
                  <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                  <p className="text-muted-foreground mb-3">No published content yet</p>
                  <p className="text-xs text-muted-foreground mb-4">Publish content to see top performing items here.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-gradient-to-br from-primary/5 to-purple-5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Database</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>AI Services</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Storage Used</span>
                <Badge variant="secondary">0 GB / 10 GB</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Active Users (24h)</span>
                <Badge variant="secondary">{stats.activeStudents.toLocaleString()}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Getting Started Tips */}
          {stats.totalContent === 0 && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Upload className="h-5 w-5" />
                  Getting Started Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">1</span>
                  <span>Create notes for topics you teach using the rich text editor</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">2</span>
                  <span>Upload video lectures or link YouTube videos</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">3</span>
                  <span>Use AI to generate quizzes from your content</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">4</span>
                  <span>Add exams and subjects to organize your content</span>
                </div>
                <div className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">5</span>
                  <span>Track student engagement in Analytics</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

function ContentRow({ content }: { content: ContentItem }) {
  const getStatusConfig = () => {
    switch (content.status) {
      case 'published':
        return { color: 'bg-green-100 text-green-700', icon: CheckCircle2, label: 'Published' }
      case 'draft':
        return { color: 'bg-gray-100 text-gray-700', icon: Clock, label: 'Draft' }
      case 'review':
        return { color: 'bg-yellow-100 text-yellow-700', icon: AlertTriangle, label: 'In Review' }
      default:
        return { color: 'bg-blue-100 text-blue-700', icon: Eye, label: content.status }
    }
  }

  const status = getStatusConfig()
  const StatusIcon = status.icon

  return (
    <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-lg bg-muted">
          {content.type === 'VIDEO' && <Video className="h-5 w-5 text-red-500" />}
          {content.type === 'NOTE' && <FileText className="h-5 w-5 text-blue-500" />}
          {content.type === 'HANDWRITTEN_NOTE' && <Edit3 className="h-5 w-5 text-orange-500" />}
          {content.type === 'FORMULA_SHEET' && <Brain className="h-5 w-5 text-purple-500" />}
          {content.type === 'MINDMAP' && <Brain className="h-5 w-5 text-green-500" />}
          {content.type === 'PYQ' && <GraduationCap className="h-5 w-5 text-indigo-500" />}
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{content.title}</p>
          <p className="text-sm text-muted-foreground">{content.subject} • {content.exam}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="outline" className={status.color}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {status.label}
        </Badge>
        <span className="text-sm text-muted-foreground">{content.views.toLocaleString()} views</span>
        <span className="text-xs text-muted-foreground">{formatRelativeTime(content.createdAt)}</span>
        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
      </div>
    </div>
  )
}

function PendingRow({ item }: { item: PendingItem }) {
  return (
    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="p-2 rounded-lg bg-yellow-100">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
        </div>
        <div className="min-w-0">
          <p className="font-medium truncate">{item.title}</p>
          <p className="text-sm text-muted-foreground">{item.type} • {item.subject} • Submitted by {item.submittedBy}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{formatRelativeTime(item.submittedAt)}</span>
        <Button size="sm" variant="outline">Review</Button>
      </div>
    </div>
  )
}