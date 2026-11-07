'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Brain, Mail, Lock, User, Bell, Settings, Save, Loader2, Globe, Users, Shield, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { settingsSchema, type SettingsInput } from '@/lib/validations'

export default function HostSettingsPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('profile')

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SettingsInput>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      currentClass: '',
      board: '',
      stream: '',
      specialization: '',
      preferredLanguages: ['ENGLISH'],
      dailyStudyTime: 60,
      emailNotifications: true,
      pushNotifications: true,
      weeklyDigest: true,
      theme: 'system',
    },
  })

  const onSubmit = async (data: SettingsInput) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save settings')
      }

      if (data.name !== session?.user?.name) {
        await update({ ...session, user: { ...session!.user, name: data.name } })
      }

      toast.success('Settings saved successfully!')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const currentPassword = formData.get('currentPassword') as string
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to change password')
      }

      toast.success('Password changed successfully!')
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your educator profile and platform settings</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Settings className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="h-4 w-4 mr-2" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="account">
            <Lock className="h-4 w-4 mr-2" />
            Account
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your educator profile</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className="pl-10"
                      {...register('name')}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
                      {...register('email')}
                      disabled
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">Email cannot be changed. Contact support if needed.</p>
                </div>

                <Separator className="my-4" />

                <h4 className="text-lg font-medium">Educator Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution/Organization</Label>
                    <Input id="institution" placeholder="e.g., IIT Delhi, Allen Career Institute" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select designation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="professor">Professor</SelectItem>
                        <SelectItem value="lecturer">Lecturer</SelectItem>
                        <SelectItem value="tutor">Tutor</SelectItem>
                        <SelectItem value="content_creator">Content Creator</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subjects">Subjects Taught</Label>
                    <Input id="subjects" placeholder="Physics, Chemistry, Mathematics" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input id="experience" type="number" placeholder="5" min="0" max="50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="w-full p-3 border rounded-lg bg-background"
                    placeholder="Tell students about your teaching philosophy and experience..."
                  />
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button type="submit" className="gap-2" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Platform Preferences
              </CardTitle>
              <CardDescription>Configure your content and platform preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select {...register('theme')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Content Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select default language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ENGLISH">English</SelectItem>
                      <SelectItem value="HINDI">Hindi (हिंदी)</SelectItem>
                      <SelectItem value="TELUGU">Telugu (తెలుగు)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentModeration">Content Moderation</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select moderation level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="auto">Auto-approve my content</SelectItem>
                      <SelectItem value="review">Require review before publishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button type="submit" className="gap-2" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* AI Provider Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Provider Settings
              </CardTitle>
              <CardDescription>Configure AI API keys for content generation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Add your own API keys to use AI features for content generation, quiz creation, and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'gemini', name: 'Google Gemini', free: true },
                    { id: 'groq', name: 'Groq', free: true },
                    { id: 'openrouter', name: 'OpenRouter', free: true },
                    { id: 'openai', name: 'OpenAI', free: false },
                    { id: 'anthropic', name: 'Anthropic', free: false },
                    { id: 'together', name: 'Together AI', free: true },
                    { id: 'huggingface', name: 'HuggingFace', free: true },
                  ].map((provider) => (
                    <div key={provider.id} className="p-4 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{provider.name}</span>
                        {provider.free && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Free Tier</span>}
                      </div>
                      <Input type="password" placeholder={`Enter ${provider.name} API Key`} data-provider={provider.id} className="text-sm" />
                      <p className="text-xs text-muted-foreground mt-1">Get your key from the {provider.name} dashboard</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  {([
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a weekly summary of your content performance' },
                  ] as const).map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Input type="checkbox" {...register(item.key as keyof SettingsInput)} className="h-5 w-5" />
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <h4 className="font-medium">Educator Notifications</h4>
                <div className="space-y-4 mt-4">
                  {[
                    { key: 'contentApproved', label: 'Content Approved', desc: 'When your content is approved' },
                    { key: 'contentRejected', label: 'Content Rejected', desc: 'When your content needs revision' },
                    { key: 'newQuizAttempt', label: 'New Quiz Attempts', desc: 'When students attempt your quizzes' },
                    { key: 'studentFeedback', label: 'Student Feedback', desc: 'When students leave feedback on your content' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t">
                  <Button type="submit" className="gap-2" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Notifications
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>Connect external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Google Drive', desc: 'Import content from Google Drive', icon: '📁', connected: false },
                { name: 'YouTube', desc: 'Link your YouTube channel for video content', icon: '📺', connected: false },
                { name: 'Google Classroom', desc: 'Sync with Google Classroom', icon: '📚', connected: false },
                { name: 'Telegram', desc: 'Send notifications via Telegram bot', icon: '📱', connected: false },
                { name: 'Discord', desc: 'Post updates to Discord server', icon: '💬', connected: false },
                { name: 'Webhooks', desc: 'Custom webhook integrations', icon: '🔗', connected: false },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{integration.icon}</span>
                    <div>
                      <p className="font-medium">{integration.name}</p>
                      <p className="text-sm text-muted-foreground">{integration.desc}</p>
                    </div>
                  </div>
                  <Button variant={integration.connected ? 'outline' : 'default'} size="sm">
                    {integration.connected ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 mt-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Shield className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all content. This cannot be undone.</p>
                  </div>
                  <Button variant="destructive" onClick={() => { if (confirm('Are you sure? This cannot be undone!')) toast.error('Account deletion not implemented yet') }}>
                    Delete Account
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Change Password</h4>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" name="currentPassword" type="password" placeholder="Enter current password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" name="newPassword" type="password" placeholder="Enter new password" required minLength={8} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm new password" required />
                  </div>
                  <Button type="submit" variant="outline" className="gap-2" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                    Change Password
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}