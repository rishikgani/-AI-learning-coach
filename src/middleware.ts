import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Host/Admin only routes
    if (path.startsWith('/host') && !['HOST', 'ADMIN'].includes((token?.role as string) || '')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Student only routes (optional - host can also access)
    if (path.startsWith('/dashboard') && !['STUDENT', 'HOST', 'ADMIN'].includes((token?.role as string) || '')) {
      return NextResponse.redirect(new URL('/host', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        // Public routes
        if (
          path === '/' ||
          path.startsWith('/auth/') ||
          path.startsWith('/api/auth/') ||
          path.startsWith('/exams/') ||
          path.startsWith('/_next/') ||
          path.startsWith('/favicon.ico')
        ) {
          return true
        }

        // Protected routes require authentication
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public/).*)',
  ],
}