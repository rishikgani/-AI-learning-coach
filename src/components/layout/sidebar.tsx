'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BookOpen,
  Trophy,
  Flame,
  Brain,
  Settings,
  Users,
  BarChart3,
  FileText,
  Video,
  Edit3,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Target,
  Zap,
  Library,
  HelpCircle,
} from 'lucide-react'
import { useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
  children?: NavItem[]
}

const studentNavigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Study Materials',
    href: '/dashboard/materials',
    icon: Library,
    children: [
      { name: 'All Materials', href: '/dashboard/materials', icon: FileText },
      { name: 'Notes', href: '/dashboard/materials?type=NOTE', icon: FileText },
      { name: 'Videos', href: '/dashboard/materials?type=VIDEO', icon: Video },
      { name: 'Handwritten Notes', href: '/dashboard/materials?type=HANDWRITTEN_NOTE', icon: Edit3 },
      { name: 'Formula Sheets', href: '/dashboard/materials?type=FORMULA_SHEET', icon: FileText },
      { name: 'Mind Maps', href: '/dashboard/materials?type=MINDMAP', icon: Brain },
    ],
  },
  {
    name: 'Practice',
    href: '/dashboard/practice',
    icon: Trophy,
    children: [
      { name: 'All Quizzes', href: '/dashboard/practice', icon: Trophy },
      { name: 'Topic-wise', href: '/dashboard/practice?mode=topic', icon: Target },
      { name: 'Mock Tests', href: '/dashboard/practice?type=MOCK_TEST', icon: Zap },
      { name: 'PYQs', href: '/dashboard/practice?type=PYQ', icon: GraduationCap },
      { name: 'My Attempts', href: '/dashboard/practice/attempts', icon: FileText },
    ],
  },
  {
    name: 'Progress',
    href: '/dashboard/progress',
    icon: Flame,
    children: [
      { name: 'Overview', href: '/dashboard/progress', icon: BarChart3 },
      { name: 'Study Plan', href: '/dashboard/progress/plan', icon: Target },
      { name: 'Weak Topics', href: '/dashboard/progress/weak', icon: Brain },
      { name: 'Streak', href: '/dashboard/progress/streak', icon: Flame },
    ],
  },
  {
    name: 'AI Coach',
    href: '/dashboard/ai-coach',
    icon: Brain,
    children: [
      { name: 'Chat', href: '/dashboard/ai-coach', icon: Brain },
      { name: 'Generate Plan', href: '/dashboard/ai-coach/plan', icon: Target },
      { name: 'Generate Quiz', href: '/dashboard/ai-coach/quiz', icon: Trophy },
      { name: 'Explain Concept', href: '/dashboard/ai-coach/explain', icon: BookOpen },
      { name: 'Flashcards', href: '/dashboard/ai-coach/flashcards', icon: FileText },
    ],
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

const hostNavigation: NavItem[] = [
  {
    name: 'Host Dashboard',
    href: '/host',
    icon: BarChart3,
  },
  {
    name: 'Content Management',
    href: '/host/content',
    icon: FileText,
    children: [
      { name: 'All Content', href: '/host/content', icon: FileText },
      { name: 'Create Note', href: '/host/content/create?type=NOTE', icon: Edit3 },
      { name: 'Upload Video', href: '/host/content/create?type=VIDEO', icon: Video },
      { name: 'Upload Handwritten', href: '/host/content/create?type=HANDWRITTEN_NOTE', icon: Edit3 },
      { name: 'Bulk Import', href: '/host/content/import', icon: PlusCircle },
    ],
  },
  {
    name: 'Quiz Builder',
    href: '/host/quizzes',
    icon: Trophy,
    children: [
      { name: 'All Quizzes', href: '/host/quizzes', icon: Trophy },
      { name: 'Create Quiz', href: '/host/quizzes/create', icon: PlusCircle },
      { name: 'AI Generate', href: '/host/quizzes/ai-generate', icon: Brain },
      { name: 'Question Bank', href: '/host/quizzes/bank', icon: FileText },
    ],
  },
  {
    name: 'Exam Management',
    href: '/host/exams',
    icon: GraduationCap,
    children: [
      { name: 'All Exams', href: '/host/exams', icon: GraduationCap },
      { name: 'Create Exam', href: '/host/exams/create', icon: PlusCircle },
      { name: 'Categories', href: '/host/exams/categories', icon: LayoutDashboard },
      { name: 'Subjects', href: '/host/exams/subjects', icon: BookOpen },
    ],
  },
  {
    name: 'Analytics',
    href: '/host/analytics',
    icon: BarChart3,
    children: [
      { name: 'Overview', href: '/host/analytics', icon: BarChart3 },
      { name: 'User Engagement', href: '/host/analytics/engagement', icon: Users },
      { name: 'Content Performance', href: '/host/analytics/content', icon: FileText },
      { name: 'Quiz Analytics', href: '/host/analytics/quizzes', icon: Trophy },
    ],
  },
  {
    name: 'User Management',
    href: '/host/users',
    icon: Users,
  },
  {
    name: 'Settings',
    href: '/host/settings',
    icon: Settings,
  },
]

export function Sidebar({ userRole = 'STUDENT', className }: { userRole?: string; className?: string }) {
  const pathname = usePathname()
  const navigation = userRole === 'HOST' || userRole === 'ADMIN' ? hostNavigation : studentNavigation
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (href: string) => {
    setOpenSections((prev) =>
      prev.includes(href) ? prev.filter((h) => h !== href) : [...prev, href]
    )
  }

  const isSectionOpen = (href: string) => openSections.includes(href)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const active = isActive(item.href)
    const open = isSectionOpen(item.href)

    if (hasChildren) {
      return (
        <Collapsible open={open} onOpenChange={(open) => toggleSection(item.href)}>
          <CollapsibleTrigger className={cn(
            'flex w-full items-center justify-between px-3 py-2 text-sm font-medium transition-colors rounded-lg',
            active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent',
            depth > 0 && 'pl-8'
          )}>
            <div className="flex items-center space-x-3">
              {depth > 0 && <ChevronRight className={cn('h-4 w-4 transition-transform', open && 'rotate-90')} />}
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.name}</span>
            </div>
            {item.badge && <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">{item.badge}</span>}
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link
        href={item.href}
        className={cn(
          'flex w-full items-center space-x-3 px-3 py-2 text-sm font-medium transition-colors rounded-lg',
          active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-accent',
          depth > 0 && 'pl-8'
        )}
      >
        {depth > 0 && <span className="w-5" />}
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <span className="truncate">{item.name}</span>
        {item.badge && <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded">{item.badge}</span>}
      </Link>
    )
  }

  return (
    <aside className={cn("fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-200 lg:translate-x-0", className)}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-center border-b px-4">
          <Link href={userRole === 'HOST' || userRole === 'ADMIN' ? '/host' : '/dashboard'} className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">AI Learning Coach</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1" role="navigation" aria-label="Main navigation">
          {navigation.map((item) => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="border-t p-4">
          <Link
            href="/help"
            className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Help & Support</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}