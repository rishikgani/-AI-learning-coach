# AI Personalized Learning Coach 🧠📚

> **Free, AI-powered personalized learning platform for all competitive exams in India**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4-green?logo=nextauth)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## 🌟 Features

### 🎯 **For Students**
- **Personalized AI Study Plans** - Generated based on your goals, level, and available time
- **Multi-Language Support** - English, Hindi (हिंदी), Telugu (తెలుగు)
- **Handwritten Notes** - High-quality notes from toppers and educators
- **Video Lectures** - Curated YouTube playlists and educator channels
- **Smart Practice Quizzes** - AI-generated, topic-wise, chapter tests, mock tests, PYQs
- **Progress Tracking** - Streaks, weak topic detection, analytics dashboard
- **AI Coach** - Chat, concept explanations, flashcards, mind maps
- **Completely Free** - No subscription, no hidden costs

### 🏫 **For Educators/Hosts**
- **Content Management** - Create/upload notes, videos, handwritten materials
- **Quiz Builder** - Manual creation + AI generation
- **Exam/Subject Management** - Full hierarchy control
- **Analytics Dashboard** - User engagement, content performance
- **User Management** - View and manage students

### 📚 **Supported Exams**
| Category | Exams |
|----------|-------|
| **Engineering** | JEE Mains, JEE Advanced, MHT-CET, BITSAT, VITEEE, SRMJEEE, COMEDK, WBJEE |
| **Medical** | NEET UG, NEET PG, AIIMS, JIPMER |
| **Competitive** | UPSC CSE, State PSC, SSC CGL, Bank PO, Railway, Defence, CLAT, CAT |
| **Engineering Streams** | CSE, CSE AI&ML, AIDS, CD, EEE, Logic & Algorithms |
| **School** | Class 10, Class 12, NTSE, Olympiads, KVPY |
| **Others** | GATE, ESE, CUET, IPMAT |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-learning-coach.git
cd ai-learning-coach

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npm run postinstall

# Push database schema
npm run db:push

# Seed database with exams, subjects
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Environment Variables

```env
# Database (SQLite - local file)
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (Optional - for magic links)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM="noreply@yourdomain.com"

# AI Provider Keys (Optional - Users can add their own in settings)
GOOGLE_GEMINI_API_KEY=""
GROQ_API_KEY=""
OPENROUTER_API_KEY=""
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""
```

## 💡 AI Integration - Zero Cost!

**The platform works WITHOUT any API keys by default.** Users can:

1. **Bring their own keys** - Add API keys in Settings → AI Configuration
2. **Use free tiers** - Gemini, Groq, OpenRouter offer generous free tiers
3. **Self-host models** - Connect to local Ollama/LM Studio (coming soon)

### Free AI Providers with Generous Tiers:
| Provider | Free Tier | Best For |
|----------|-----------|----------|
| **Google Gemini** | 15 RPM, 1M tokens/day | General purpose, structured output |
| **Groq** | 14,400 req/day, 30K tokens/min | Ultra-fast inference |
| **OpenRouter** | Free models (Llama 3.1, Gemma, Mistral) | Model variety |
| **Together AI** | Free credits on signup | Open-source models |
| **Hugging Face** | Free inference | Open-source models |

## 🏗️ Project Structure

```
ai-learning-coach/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Exam/subject seed data
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/           # API routes
│   │   ├── auth/          # Auth pages (login, register)
│   │   ├── dashboard/     # Student dashboard
│   │   └── host/          # Host/educator dashboard
│   ├── components/
│   │   ├── ui/            # Reusable UI components
│   │   └── layout/        # Header, Sidebar
│   └── lib/
│       ├── auth.ts        # NextAuth configuration
│       ├── ai.ts          # Multi-provider AI service
│       ├── prisma.ts      # Prisma client
│       ├── validations.ts # Zod schemas
│       ├── content.ts     # Content processing utilities
│       └── utils.ts       # Helper functions
├── public/                # Static assets
└── package.json
```

## 🔧 Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (Prisma ORM) - easily migratable to PostgreSQL/MySQL
- **Auth**: NextAuth.js (Google, Email/Password, Magic Links)
- **Styling**: Tailwind CSS + Radix UI
- **AI**: Multi-provider (Gemini, Groq, OpenRouter, OpenAI, Anthropic, Together, HF)
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts (coming soon)
- **Deployment**: Vercel/Netlify (free tier)

## 🌍 Deployment

### Vercel (Recommended - Free)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Output directory: `.next`
4. Add environment variables

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - feel free to use for personal or commercial projects.

## 🙏 Acknowledgments

- **Xpert Champs** - Original internship project brief
- **Next.js team** - Amazing framework
- **Prisma** - Best ORM for TypeScript
- **Radix UI** - Accessible components
- **All free AI providers** - Making AI accessible

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/ai-learning-coach/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-learning-coach/discussions)
- **Email**: support@ailearningcoach.ai

---

**Built with ❤️ for students who can't afford expensive coaching**

*AI Learning Coach - Democratizing Quality Education*