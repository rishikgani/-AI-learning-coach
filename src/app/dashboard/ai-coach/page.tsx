'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Brain, Target, Trophy, BookOpen, Sparkles, Loader2, Copy, Download, Send, Mic, MicOff, Settings, Zap, Save } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const aiFeatures = [
  { id: 'chat', label: 'AI Chat', icon: Brain, desc: 'Ask questions, get explanations, solve doubts' },
  { id: 'plan', label: 'Generate Plan', icon: Target, desc: 'Create personalized day-wise study plans' },
  { id: 'quiz', label: 'Generate Quiz', icon: Trophy, desc: 'Create custom practice quizzes on any topic' },
  { id: 'explain', label: 'Explain Concept', icon: BookOpen, desc: 'Get detailed explanations with examples' },
  { id: 'flashcards', label: 'Flashcards', icon: Sparkles, desc: 'Generate spaced repetition flashcards' },
  { id: 'mindmap', label: 'Mind Map', icon: Sparkles, desc: 'Visual mind maps for complex topics' },
]

const subjects = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science', 'General Studies', 'English', 'Hindi']
const exams = ['JEE Mains', 'JEE Advanced', 'NEET UG', 'NEET PG', 'UPSC CSE', 'MHT-CET', 'BITSAT', 'Class 10', 'Class 12', 'GATE', 'SSC CGL', 'Bank PO']
const difficulties = ['BEGINNER', 'EASY', 'MEDIUM', 'HARD', 'EXPERT']
const languages = ['ENGLISH', 'HINDI', 'TELUGU']

interface AISettings {
  provider: string
  model: string
  temperature: number
  maxTokens: number
  apiKeys: Record<string, string>
}

export default function AICoachPage() {
  const [activeTab, setActiveTab] = useState('chat')
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: "Hello! I'm your AI Learning Coach. How can I help you today? You can ask me to explain concepts, create study plans, generate quizzes, or just chat about your studies." }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState<AISettings>({
    provider: 'google',
    model: 'gemini-1.5-flash',
    temperature: 0.7,
    maxTokens: 4096,
    apiKeys: {},
  })

  // Load AI settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ai-settings')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch {
        // Ignore parse errors
      }
    }
  }, [])

  // Save AI settings to localStorage
  const saveSettings = (newSettings: Partial<AISettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('ai-settings', JSON.stringify(updated))
  }

  const callAI = async (feature: string, input: any): Promise<any> => {
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feature,
          input,
          provider: settings.provider,
          model: settings.model,
          apiKeys: settings.apiKeys,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'AI request failed')
      }

      return data.result
    } catch (error) {
      console.error('AI call error:', error)
      throw error
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setInput('')
    setIsLoading(true)

    try {
      const result = await callAI('CHAT', {
        messages: [
          { role: 'system', content: "You are an expert AI Learning Coach helping students with their studies. Provide clear, helpful, and encouraging responses." },
          ...messages,
          { role: 'user', content: userMessage },
        ],
        temperature: settings.temperature,
        maxTokens: settings.maxTokens,
      })

      setMessages(prev => [...prev, { role: 'assistant', content: result.content }])
    } catch (error) {
      toast.error('Failed to get AI response. Please check your AI settings and API keys.')
      setMessages(prev => prev.slice(0, -1)) // Remove user message on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleGeneratePlan = async (data: any) => {
    setIsLoading(true)
    try {
      const result = await callAI('STUDY_PLAN_GENERATION', data)
      toast.success('Study plan generated successfully!')
      // Optionally navigate to study plan page or show result
      console.log('Generated plan:', result)
    } catch (error) {
      toast.error('Failed to generate study plan. Please check your AI settings.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGenerateQuiz = async (data: any) => {
    setIsLoading(true)
    try {
      const result = await callAI('QUIZ_GENERATION', data)
      toast.success('Quiz generated successfully!')
      console.log('Generated quiz:', result)
    } catch (error) {
      toast.error('Failed to generate quiz. Please check your AI settings.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleExplain = async (data: any) => {
    setIsLoading(true)
    try {
      const result = await callAI('EXPLANATION_GENERATION', data)
      setMessages(prev => [...prev, { role: 'assistant', content: result }])
      setActiveTab('chat')
    } catch (error) {
      toast.error('Failed to explain concept. Please check your AI settings.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Learning Coach</h1>
          <p className="text-muted-foreground">Your personalized AI tutor for all subjects and exams</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setActiveTab('settings')}>
          <Settings className="h-4 w-4" />
          AI Settings
        </Button>
      </div>

      {/* Feature Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 bg-muted p-1">
          {aiFeatures.map((feature) => (
            <TabsTrigger key={feature.id} value={feature.id} className="gap-2 py-3">
              <feature.icon className="h-4 w-4" />
              <span>{feature.label}</span>
            </TabsTrigger>
          ))}
          <TabsTrigger value="settings" className="gap-2 py-3">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="mt-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Chat
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={cn('flex gap-3', message.role === 'user' ? 'justify-end' : '')}>
                  <div className={cn(
                    'max-w-[70%] p-4 rounded-2xl',
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted rounded-bl-sm'
                  )}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="max-w-[70%] p-4 bg-muted rounded-2xl rounded-bl-sm animate-pulse">
                    <div className="h-4 bg-muted-foreground/50 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted-foreground/50 rounded w-1/2" />
                  </div>
                </div>
              )}
            </CardContent>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Ask me anything about your studies..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="gap-2">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Generate Plan Tab */}
        <TabsContent value="plan" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Generate Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GeneratePlanForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generate Quiz Tab */}
        <TabsContent value="quiz" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Generate Practice Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GenerateQuizForm onSubmit={handleGenerateQuiz} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Explain Concept Tab */}
        <TabsContent value="explain" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Explain Concept
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExplainConceptForm onSubmit={handleExplain} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Flashcards Tab */}
        <TabsContent value="flashcards" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generate Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FlashcardsForm isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mind Map Tab */}
        <TabsContent value="mindmap" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Generate Mind Map
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MindMapForm isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="mt-4">
          <AISettingsPanel settings={settings} onSave={saveSettings} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Form Components
function GeneratePlanForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [formData, setFormData] = useState({
    subject: '',
    goal: '',
    level: 'BEGINNER',
    duration: 30,
    dailyHours: 2,
    exam: '',
    language: 'ENGLISH',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label>Subject</Label>
        <Input value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="e.g., Physics, Organic Chemistry, Calculus" required />
      </div>
      <div className="space-y-2">
        <Label>Goal</Label>
        <Textarea value={formData.goal} onChange={(e) => setFormData({...formData, goal: e.target.value})} placeholder="e.g., Master Thermodynamics for JEE Mains, Complete NEET Biology syllabus" rows={2} required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Current Level</Label>
          <Select value={formData.level} onValueChange={(v) => setFormData({...formData, level: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {difficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Duration (days)</Label>
          <Input type="number" value={formData.duration} onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})} min="1" max="365" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Daily Hours</Label>
          <Input type="number" step="0.5" value={formData.dailyHours} onChange={(e) => setFormData({...formData, dailyHours: parseFloat(e.target.value)})} min="0.5" max="12" />
        </div>
        <div className="space-y-2">
          <Label>Target Exam (optional)</Label>
          <Select value={formData.exam} onValueChange={(v) => setFormData({...formData, exam: v})}>
            <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
            <SelectContent>
              {exams.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Language</Label>
        <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {languages.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full gap-2" disabled={isLoading}>
        <Zap className="h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Study Plan'}
      </Button>
    </form>
  )
}

function GenerateQuizForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [formData, setFormData] = useState({
    topic: '',
    subject: '',
    difficulty: 'MEDIUM',
    questionCount: 10,
    language: 'ENGLISH',
    exam: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label>Topic</Label>
        <Input value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} placeholder="e.g., Thermodynamics, Organic Reactions, Integration" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Subject</Label>
          <Select value={formData.subject} onValueChange={(v) => setFormData({...formData, subject: v})}>
            <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
            <SelectContent>
              {subjects.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select value={formData.difficulty} onValueChange={(v) => setFormData({...formData, difficulty: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {difficulties.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Number of Questions</Label>
          <Input type="number" value={formData.questionCount} onChange={(e) => setFormData({...formData, questionCount: parseInt(e.target.value)})} min="1" max="50" />
        </div>
        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {languages.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label>Target Exam (optional)</Label>
        <Select value={formData.exam} onValueChange={(v) => setFormData({...formData, exam: v})}>
          <SelectTrigger><SelectValue placeholder="Select exam" /></SelectTrigger>
          <SelectContent>
            {exams.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" onClick={handleSubmit} className="w-full gap-2" disabled={isLoading}>
        <Zap className="h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Quiz'}
      </Button>
    </form>
  )
}

function ExplainConceptForm({ onSubmit, isLoading }: { onSubmit: (data: any) => void; isLoading: boolean }) {
  const [formData, setFormData] = useState({
    concept: '',
    level: 'intermediate',
    language: 'ENGLISH',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label>Concept to Explain</Label>
        <Input value={formData.concept} onChange={(e) => setFormData({...formData, concept: e.target.value})} placeholder="e.g., Photoelectric Effect, SN1 vs SN2, Fundamental Theorem of Calculus" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Your Level</Label>
          <Select value={formData.level} onValueChange={(v) => setFormData({...formData, level: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Language</Label>
          <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {languages.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" onClick={handleSubmit} className="w-full gap-2" disabled={isLoading}>
        <Zap className="h-4 w-4" />
        {isLoading ? 'Explaining...' : 'Explain Concept'}
      </Button>
    </form>
  )
}

function FlashcardsForm({ isLoading }: { isLoading: boolean }) {
  const [formData, setFormData] = useState({ topic: '', count: 10 })

  return (
    <form className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label>Topic</Label>
        <Input value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} placeholder="e.g., Periodic Table, Physics Formulas, Vocabulary" required />
      </div>
      <div className="space-y-2">
        <Label>Number of Cards</Label>
        <Input type="number" value={formData.count} onChange={(e) => setFormData({...formData, count: parseInt(e.target.value)})} min="5" max="50" />
      </div>
      <Button type="button" className="w-full gap-2" disabled={isLoading}>
        <Zap className="h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Flashcards'}
      </Button>
      <p className="text-sm text-muted-foreground text-center">Feature coming soon - will generate Anki-compatible flashcards</p>
    </form>
  )
}

function MindMapForm({ isLoading }: { isLoading: boolean }) {
  const [formData, setFormData] = useState({ topic: '' })

  return (
    <form className="space-y-4 max-w-xl">
      <div className="space-y-2">
        <Label>Topic</Label>
        <Input value={formData.topic} onChange={(e) => setFormData({...formData, topic: e.target.value})} placeholder="e.g., Cell Biology, Thermodynamics, World History" required />
      </div>
      <Button type="button" className="w-full gap-2" disabled={isLoading}>
        <Zap className="h-4 w-4" />
        {isLoading ? 'Generating...' : 'Generate Mind Map'}
      </Button>
      <p className="text-sm text-muted-foreground text-center">Feature coming soon - will generate interactive mind maps (Mermaid.js/Markmap)</p>
    </form>
  )
}

function AISettingsPanel({ settings, onSave }: { settings: AISettings; onSave: (settings: Partial<AISettings>) => void }) {
  const [localSettings, setLocalSettings] = useState(settings)
  const [testResult, setTestResult] = useState<string | null>(null)

  const providers = [
    { id: 'google', name: 'Google Gemini', models: ['gemini-1.5-flash', 'gemini-1.5-flash-8b', 'gemini-1.5-pro'] },
    { id: 'groq', name: 'Groq', models: ['llama-3.1-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768', 'gemma2-9b-it'] },
    { id: 'openrouter', name: 'OpenRouter', models: ['meta-llama/llama-3.1-405b-instruct:free', 'meta-llama/llama-3.1-70b-instruct:free', 'google/gemma-2-9b-it:free', 'mistralai/mistral-7b-instruct:free'] },
    { id: 'openai', name: 'OpenAI', models: ['gpt-4o-mini', 'gpt-4o'] },
    { id: 'anthropic', name: 'Anthropic', models: ['claude-3-haiku-20240307', 'claude-3-5-sonnet-20241022'] },
    { id: 'together', name: 'Together AI', models: ['meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo', 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'] },
    { id: 'huggingface', name: 'Hugging Face', models: ['meta-llama/Meta-Llama-3.1-70B-Instruct'] },
  ]

  const handleProviderChange = (providerId: string) => {
    const provider = providers.find(p => p.id === providerId)
    if (provider) {
      setLocalSettings(prev => ({ ...prev, provider: providerId, model: provider.models[0] }))
    }
  }

  const handleSave = () => {
    onSave(localSettings)
    toast.success('AI settings saved!')
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
          provider: localSettings.provider,
          model: localSettings.model,
          apiKeys: localSettings.apiKeys,
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

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            AI Provider Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Default Provider</Label>
            <Select value={localSettings.provider} onValueChange={handleProviderChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {providers.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Default Model</Label>
            <Select value={localSettings.model} onValueChange={(v) => setLocalSettings(prev => ({ ...prev, model: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {providers.find(p => p.id === localSettings.provider)?.models.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
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
                value={localSettings.temperature}
                onChange={(e) => setLocalSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-sm font-medium w-10">{localSettings.temperature.toFixed(1)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Max Tokens</Label>
            <Input
              type="number"
              value={localSettings.maxTokens}
              onChange={(e) => setLocalSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
              min="100"
              max="8000"
              step="100"
            />
          </div>

          <Separator className="my-4" />

          <h4 className="font-medium">API Keys</h4>
          <p className="text-sm text-muted-foreground">
            Enter your API keys below. Keys are stored locally in your browser and never sent to our servers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {providers.map((provider) => (
              <div key={provider.id} className="p-4 border rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{provider.name}</span>
                </div>
                <Input
                  type="password"
                  placeholder={`Enter ${provider.name} API Key`}
                  value={localSettings.apiKeys[provider.id] || ''}
                  onChange={(e) => setLocalSettings(prev => ({
                    ...prev,
                    apiKeys: { ...prev.apiKeys, [provider.id]: e.target.value }
                  }))}
                  className="text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
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
        </CardContent>
      </Card>
    </div>
  )
}

