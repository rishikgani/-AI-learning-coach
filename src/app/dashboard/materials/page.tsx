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
import {
  Search,
  Filter,
  FileText,
  Video,
  Edit3,
  BookOpen,
  Brain,
  Award,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Bookmark,
  MoreHorizontal,
  Languages,
  Globe,
  Plus,
} from 'lucide-react'
import { cn, getDifficultyColor, CONTENT_TYPE_ICONS, CONTENT_TYPE_LABELS, LANGUAGE_FLAGS, LANGUAGE_NAMES } from '@/lib/utils'

// Mock data - in production, fetch from API
const mockContent = [
  {
    id: '1',
    title: 'Thermodynamics - Complete Handwritten Notes',
    type: 'HANDWRITTEN_NOTE',
    subject: 'Physics',
    exam: 'JEE Mains',
    topic: 'Thermodynamics',
    language: 'ENGLISH',
    difficulty: 'MEDIUM',
    views: 12450,
    downloads: 3200,
    author: 'Dr. Sharma',
    tags: ['JEE', 'Thermodynamics', 'Physics'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Organic Chemistry Reaction Mechanisms',
    type: 'VIDEO',
    subject: 'Chemistry',
    exam: 'NEET UG',
    topic: 'Organic Chemistry',
    language: 'HINDI',
    difficulty: 'HARD',
    views: 8900,
    duration: 2700,
    videoUrl: 'https://youtube.com/watch?v=example',
    author: 'Prof. Verma',
    tags: ['NEET', 'Organic Chemistry', 'Reactions'],
    createdAt: '2024-01-10',
  },
  {
    id: '3',
    title: 'Calculus - Definite Integration Formula Sheet',
    type: 'FORMULA_SHEET',
    subject: 'Mathematics',
    exam: 'JEE Advanced',
    topic: 'Calculus',
    language: 'ENGLISH',
    difficulty: 'MEDIUM',
    views: 15600,
    downloads: 5400,
    tags: ['JEE', 'Calculus', 'Formulas'],
    createdAt: '2024-01-08',
  },
  {
    id: '4',
    title: 'Cell Biology - Mind Map for Quick Revision',
    type: 'MINDMAP',
    subject: 'Biology',
    exam: 'NEET UG',
    topic: 'Cell Biology',
    language: 'TELUGU',
    difficulty: 'EASY',
    views: 6700,
    downloads: 2100,
    tags: ['NEET', 'Biology', 'Mind Map'],
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'Electrostatics - Complete Chapter Notes',
    type: 'NOTE',
    subject: 'Physics',
    exam: 'JEE Mains',
    topic: 'Electrostatics',
    language: 'ENGLISH',
    difficulty: 'MEDIUM',
    views: 9800,
    downloads: 2800,
    tags: ['JEE', 'Electrostatics', 'Physics'],
    createdAt: '2024-01-14',
  },
  {
    id: '6',
    title: 'Modern Physics - Previous Year Questions',
    type: 'PYQ',
    subject: 'Physics',
    exam: 'JEE Mains',
    topic: 'Modern Physics',
    language: 'HINDI',
    difficulty: 'HARD',
    views: 11200,
    downloads: 4100,
    tags: ['JEE', 'Modern Physics', 'PYQ'],
    createdAt: '2024-01-05',
  },
]

const typeTabs = [
  { value: 'all', label: 'All', icon: BookOpen },
  { value: 'NOTE', label: 'Notes', icon: FileText },
  { value: 'VIDEO', label: 'Videos', icon: Video },
  { value: 'HANDWRITTEN_NOTE', label: 'Handwritten', icon: Edit3 },
  { value: 'PYQ', label: 'PYQs', icon: Award },
  { value: 'FORMULA_SHEET', label: 'Formulas', icon: Brain },
  { value: 'MINDMAP', label: 'Mind Maps', icon: Brain },
]

const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science']
const exams = ['All', 'JEE Mains', 'JEE Advanced', 'NEET UG', 'NEET PG', 'UPSC', 'MHT-CET', 'BITSAT']
const languages = ['All', 'ENGLISH', 'HINDI', 'TELUGU']
const difficulties = ['All', 'BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']

export default function MaterialsPage() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('query') || '')
  const [activeType, setActiveType] = useState(searchParams.get('type') || 'all')
  const [activeSubject, setActiveSubject] = useState('All')
  const [activeExam, setActiveExam] = useState('All')
  const [activeLanguage, setActiveLanguage] = useState('All')
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter content
  const filteredContent = mockContent.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = activeType === 'all' || item.type === activeType
    const matchesSubject = activeSubject === 'All' || item.subject === activeSubject
    const matchesExam = activeExam === 'All' || item.exam === activeExam
    const matchesLanguage = activeLanguage === 'All' || item.language === activeLanguage
    const matchesDifficulty = activeDifficulty === 'All' || item.difficulty === activeDifficulty
    return matchesSearch && matchesType && matchesSubject && matchesExam && matchesLanguage && matchesDifficulty
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <p className="text-muted-foreground">Access notes, videos, handwritten materials, and more</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Request Content
        </Button>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials, topics, exams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Tabs */}
            <Tabs value={activeType} onValueChange={setActiveType} className="flex-1">
              <TabsList className="grid grid-cols-4 lg:grid-cols-8 gap-1 bg-muted p-1">
                {typeTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="gap-1 text-xs">
                    <tab.icon className="h-3.5 w-3.5" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t mt-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={activeSubject} onValueChange={setActiveSubject}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={activeExam} onValueChange={setActiveExam}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Exam" />
              </SelectTrigger>
              <SelectContent>
                {exams.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={activeLanguage} onValueChange={setActiveLanguage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((l) => <SelectItem key={l} value={l}>{l === 'All' ? 'All' : LANGUAGE_NAMES[l]}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={activeDifficulty} onValueChange={setActiveDifficulty}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="title">Title A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-muted p-1 rounded-lg ml-auto">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <div className="grid grid-cols-2 gap-1 w-5 h-5">
                  <div className="bg-primary/50 rounded" />
                  <div className="bg-primary/50 rounded" />
                  <div className="bg-primary/50 rounded" />
                  <div className="bg-primary/50 rounded" />
                </div>
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <div className="w-5 h-5 flex flex-col gap-1">
                  <div className="h-1 bg-primary/50 rounded w-full" />
                  <div className="h-1 bg-primary/50 rounded w-3/4" />
                  <div className="h-1 bg-primary/50 rounded w-full" />
                  <div className="h-1 bg-primary/50 rounded w-3/4" />
                </div>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{filteredContent.length} materials found</span>
        <Badge variant="outline">Free</Badge>
      </div>

      {/* Content Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredContent.map((item) => (
            <ContentListItem key={item.id} item={item} />
          ))}
        </div>
      )}

      {filteredContent.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Search className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-2">No materials found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function ContentCard({ item }: { item: typeof mockContent[0] }) {
  const typeIcon = CONTENT_TYPE_ICONS[item.type] || '📄'
  const typeLabel = CONTENT_TYPE_LABELS[item.type] || item.type

  return (
    <Card className="card-hover h-full flex flex-col">
      <div className="relative aspect-video bg-muted overflow-hidden">
        {item.type === 'VIDEO' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center backdrop-blur">
              <span className="text-white text-2xl">▶</span>
            </div>
          </div>
        )}
        {item.type === 'HANDWRITTEN_NOTE' && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          <Badge variant="secondary" className="text-xs">
            {typeIcon} {typeLabel}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between">
          <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
            {item.difficulty}
          </Badge>
          <div className="flex items-center gap-1 px-2 py-1 bg-black/50 text-white text-xs rounded">
            {LANGUAGE_FLAGS[item.language]} {LANGUAGE_NAMES[item.language]}
          </div>
        </div>
      </div>

      <CardContent className="flex-1 p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{item.subject}</Badge>
          <Badge variant="outline" className="text-xs">{item.exam}</Badge>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 flex-1">
          By {item.author} • {item.views.toLocaleString()} views • {item.downloads?.toLocaleString()} downloads
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t mt-auto">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ContentListItem({ item }: { item: typeof mockContent[0] }) {
  const typeIcon = CONTENT_TYPE_ICONS[item.type] || '📄'
  const typeLabel = CONTENT_TYPE_LABELS[item.type] || item.type

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={cn('p-3 rounded-xl', item.type === 'VIDEO' ? 'bg-red-100' : item.type === 'HANDWRITTEN_NOTE' ? 'bg-orange-100' : 'bg-primary/10')}>
            <span className="text-2xl">{typeIcon}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="secondary" className="text-xs">{typeLabel}</Badge>
              <Badge variant="outline" className="text-xs">{item.subject}</Badge>
              <Badge variant="outline" className="text-xs">{item.exam}</Badge>
              <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>{item.difficulty}</Badge>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-xs">
                {LANGUAGE_FLAGS[item.language]} {LANGUAGE_NAMES[item.language]}
              </div>
            </div>
            <h3 className="font-semibold truncate">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              By {item.author} • {item.views.toLocaleString()} views • {item.downloads?.toLocaleString()} downloads
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Download className="h-4 w-4" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}