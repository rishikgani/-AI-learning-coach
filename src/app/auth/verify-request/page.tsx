'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Suspense } from 'react'

function VerifyRequestContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  // Check if we came from register (success) or from signin with unverified email
  const fromRegister = searchParams.get('registered') === 'true'

  useEffect(() => {
    if (fromRegister) {
      setStatus('success')
      setMessage('Account created! Please check your email and click the verification link.')
    } else {
      setStatus('success')
      setMessage('A verification email has been sent to ' + email + '. Please check your inbox.')
    }
  }, [fromRegister, email])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-purple-500/5 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center space-x-2 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
            <Brain className="h-7 w-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">AI Learning Coach</span>
        </Link>

        <Card className="shadow-xl">
          <CardHeader>
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              {email && <span className="text-sm text-muted-foreground">Sent to: <strong>{email}</strong></span>}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg text-left space-y-3">
              <p className="text-sm"><strong>What happens next:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-2 pl-4 list-disc">
                <li>Open your email inbox</li>
                <li>Look for an email from AI Learning Coach</li>
                <li>Click the verification link</li>
                <li>Return here and sign in</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/auth/login">
                <Button className="w-full" size="lg">
                  <Mail className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full">
                  <Loader2 className="mr-2 h-4 w-4" />
                  Resend Email
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check spam folder or{' '}
              <Link href="/auth/register" className="text-primary hover:underline">
                register again
              </Link>
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-sm text-muted-foreground">
          Already verified?{' '}
          <Link href="/auth/login" className="text-primary font-medium hover:underline">
            Sign in now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function VerifyRequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyRequestContent />
    </Suspense>
  )
}