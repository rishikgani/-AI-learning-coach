'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
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
import { Brain, Mail, Lock, User, Bell, Palette, Globe, Save, Loader2, CheckCircle2, AlertCircle, Zap } from 'lucide-react'
import { cn, LANGUAGE_FLAGS, LANGUAGE_NAMES, getLanguageFlag, getLanguageName } from '@/lib/utils'
import { toast } from 'sonner'
import { settingsSchema, type SettingsInput } from '@/lib/validations'

const classOptions = [
  'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  'B.Tech 1st Year', 'B.Tech 2nd Year', 'B.Tech 3rd Year', 'B.Tech 4th Year',
  'MBBS 1st Year', 'MBBS 2nd Year', 'MBBS 3rd Year', 'MBBS 4th Year',
  'Graduate', 'Post Graduate', 'Working Professional', 'Other'
]

const boardOptions = ['CBSE', 'ICSE', 'State Board', 'IB', 'IGCSE', 'Other']
const streamOptions = ['Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts/Humanities', 'Vocational']
const specializationOptions = [
  'CSE', 'CSE AI&ML', 'AIDS', 'CD', 'EEE', 'ECE', 'Mechanical', 'Civil',
  'Chemical', 'Biotechnology', 'Aerospace', 'Other'
]

const languageOptions = ['ENGLISH', 'HINDI', 'TELUGU'] as const

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('profile')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  // TODO: Fetch actual user data from API and populate form

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

      // Update session with new name if changed
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
        <p className="text-muted-foreground mt-1">Manage your profile, preferences, and account settings</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <Palette className="h-4 w-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
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
              <CardDescription>Update your personal information</CardDescription>
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

                <h4 className="text-lg font-medium">Academic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentClass">Current Class/Year</Label>
                    <Select {...register('currentClass')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="board">Board</Label>
                    <Select {...register('board')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select board" />
                      </SelectTrigger>
                      <SelectContent>
                        {boardOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stream">Stream</Label>
                    <Select {...register('stream')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stream" />
                      </SelectTrigger>
                      <SelectContent>
                        {streamOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Select {...register('specialization')}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        {specializationOptions.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
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
                Study Preferences
              </CardTitle>
              <CardDescription>Configure how you want to learn</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label>Preferred Languages</Label>
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => {
                          const current = watch('preferredLanguages', ['ENGLISH'])
                          if (current.includes(lang)) {
                            setValue('preferredLanguages', current.filter((l) => l !== lang))
                          } else {
                            setValue('preferredLanguages', [...current, lang])
                          }
                        }}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-all',
                          watch('preferredLanguages', ['ENGLISH']).includes(lang)
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <span>{getLanguageFlag(lang)}</span>
                        <span>{getLanguageName(lang)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dailyStudyTime">Daily Study Goal</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="dailyStudyTime"
                      type="range"
                      min="15"
                      max="480"
                      step="15"
                      {...register('dailyStudyTime', { valueAsNumber: true })}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-24 text-right">{watch('dailyStudyTime', 60)} min</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Recommended: 60-120 minutes for consistent progress</p>
                </div>

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
              <CardDescription>Configure your AI API keys (synced across devices)</CardDescription>
            </CardHeader>
            <CardContent>
              <AISettingsForm />
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
                    { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a weekly summary of your progress' },
                  ] as const).map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                      <Input
                        type="checkbox"
                        {...register(item.key as keyof SettingsInput)}
                        className="h-5 w-5"
                      />
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

        <TabsContent value="account" className="space-y-6 mt-6">
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data. This cannot be undone.</p>
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

// AI Settings Form Component
function AISettingsForm() {
  const [settings, setSettings] = useState({
    defaultProvider: '',
    defaultModel: '',
    geminiApiKey: '',
    groqApiKey: '',
    openrouterApiKey: '',
    openaiApiKey: '',
    anthropicApiKey: '',
    togetherApiKey: '',
    huggingfaceApiKey: '',
    defaultTemperature: 0.7,
    defaultMaxTokens: 4096,
    enableAI: true,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)

  const providers = [
    { id: 'gemini', name: 'Google Gemini', models: ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-pro'], free: true },
    { id: 'groq', name: 'Groq', models: ['llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'gemma2-9b-it'], free: true },
    { id: 'openrouter', name: 'OpenRouter', models: ['meta-llama/llama-3.1-405b-instruct:free', 'meta-llama/llama-3.1-70b-instruct:free', 'google/gemma-2-9b-it:free', 'mistralai/mistral-7b-instruct:free'], free: true },
    { id: 'openai', name: 'OpenAI', models: ['gpt-4o-mini', 'gpt-4o'], free: false },
    { id: 'anthropic', name: 'Anthropic', models: ['claude-3-haiku-20240307', 'claude-3-5-sonnet-20241022'], free: false },
    { id: 'together', name: 'Together AI', models: ['meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'], free: true },
    { id: 'huggingface', name: 'Hugging Face', models: ['meta-llama/Meta-Llama-3.1-70B-Instruct'], free: true },
  ]

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/user/ai-settings')
      if (response.ok) {
        const data = await response.json()
        if (data.config) {
          setSettings(prev => ({ ...prev, ...data.config }))
        }
      }
    } catch (error) {
      console.error('Failed to load AI settings:', error)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/ai-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast.success('AI settings saved successfully!')
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save settings')
      }
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestConnection = async () => {
    setTestResult('Testing...')
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feature: 'CHAT',
          input: {
            messages: [
              { role: 'system', content: 'You are a test assistant.' },
              { role: 'user', content: 'Say "Connection successful!"' },
            ],
          },
          provider: settings.defaultProvider,
          model: settings.defaultModel,
          apiKeys: {
            google: settings.geminiApiKey,
            groq: settings.groqApiKey,
            openrouter: settings.openrouterApiKey,
            openai: settings.openaiApiKey,
            anthropic: settings.anthropicApiKey,
            together: settings.togetherApiKey,
            huggingface: settings.huggingfaceApiKey,
          },
        }),
      })

      const data = await response.json()
      if (response.ok) {
        setTestResult(`✓ Connected! Response: ${data.result?.content?.substring(0, 100)}...`)
      } else {
        setTestResult(`✗ Failed: ${data.error}`)
      }
    } catch (error) {
      setTestResult(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId)
    if (provider) {
      setSettings(prev => ({ ...prev, defaultProvider: providerId, defaultModel: provider.models[0] }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Default Provider</Label>
        <Select value={settings.defaultProvider} onValueChange={handleProviderChange}>
          <SelectTrigger><SelectValue placeholder="Select provider" /></SelectTrigger>
          <SelectContent>
            {providers.map(p => <SelectItem key={p.id} value={p.id}>{p.name} {p.free && '(Free Tier)'}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Default Model</Label>
        <Select value={settings.defaultModel} onValueChange={(v) => setSettings(prev => ({ ...prev, defaultModel: v }))}>
          <SelectTrigger><SelectValue placeholder="Select model" /></SelectTrigger>
          <SelectContent>
            {providers.find(p => p.id === settings.defaultProvider)?.models.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Temperature</Label>
        <div className="flex items-center gap-4">
          <Input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.defaultTemperature}
            onChange={(e) => setSettings(prev => ({ ...prev, defaultTemperature: parseFloat(e.target.value) }))}
            className="flex-1"
          />
          <span className="text-sm font-medium w-10">{settings.defaultTemperature.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Max Tokens</Label>
        <Input
          type="number"
          value={settings.defaultMaxTokens}
          onChange={(e) => setSettings(prev => ({ ...prev, defaultMaxTokens: parseInt(e.target.value) }))}
          min="100"
          max="8000"
          step="100"
        />
      </div>

      <Separator className="my-4" />

      <h4 className="font-medium">API Keys</h4>
      <p className="text-sm text-muted-foreground">
        Enter your API keys below. Keys are encrypted and synced across your devices.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {providers.map((provider) => (
          <div key={provider.id} className="p-4 border rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{provider.name}</span>
              {provider.free && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Free Tier</span>}
            </div>
            <Input
              type="password"
              placeholder={`Enter ${provider.name} API Key`}
              value={settings[`${provider.id}ApiKey` as keyof typeof settings] as string || ''}
              onChange={(e) => setSettings(prev => ({ ...prev, [`${provider.id}ApiKey`]: e.target.value }))}
              className="text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get your key from the {provider.name} dashboard
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button onClick={handleSave} disabled={isLoading} className="gap-2">
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Settings
        </Button>
        <Button variant="outline" onClick={handleTestConnection} className="gap-2">
          <Zap className="h-4 w-4" />
          Test Connection
        </Button>
      </div>

      {testResult && (
        <p className={testResult.startsWith('✓') ? 'text-green-600' : 'text-red-600'}>{testResult}</p>
      )}
    </div>
  )
}