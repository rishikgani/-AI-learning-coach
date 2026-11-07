'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Sidebar } from '@/components/layout/sidebar'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!session || !['HOST', 'ADMIN'].includes((session.user as any).role)) {
    redirect('/dashboard')
  }

  const userRole = (session.user as any).role

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar userRole={userRole} className={cn('lg:translate-x-0', sidebarOpen && 'translate-x-0')} />

      <Button
        variant="ghost"
        size="icon"
        className="fixed top-20 left-4 z-50 lg:hidden"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        <X className="h-5 w-5" />
      </Button>

      <div className="lg:pl-64 min-h-screen">
        <Header />
        <main className="p-4 lg:p-6 pt-0">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}