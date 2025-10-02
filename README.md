# 🌙 LUNA - AI Chat Assistant

> **Your intelligent AI companion powered by Google's Gemini 2.0 Flash**

A modern, feature-rich AI chatbot application built with Next.js 15, React 19, and enhanced with persistent memory, dark mode, and beautiful UI/UX design.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwind-css)

---

## ✨ Features

### 🤖 **Advanced AI Conversations**
- Powered by **Google Gemini 2.0 Flash** (direct API integration)
- Organized responses with bullet points, tables, and markdown formatting
- Context-aware conversations with conversation history

### 🧠 **Persistent Memory**
- LUNA remembers your name, preferences, and personal information across sessions
- User-specific memory stored locally per account
- Privacy-first: your data stays on your device

### 🎨 **Beautiful & Modern UI**
- **Dark/Light Mode** toggle with smooth transitions
- Stunning night sky background with twinkling stars and nebula effects
- Glassmorphism design with backdrop blur effects
- Fully responsive on all devices

### 🔐 **Secure Authentication**
- Google OAuth via NextAuth.js
- JWT-based sessions
- Secure session management

### 💬 **Chat Management**
- Multiple conversation support
- Sidebar with recent chats
- Delete unwanted conversations
- Automatic chat titling based on first message

### ⚡ **Performance**
- Real-time streaming responses
- 30-second timeout with retry logic
- Optimized loading states
- Fast page transitions

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **UI Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Authentication** | NextAuth.js |
| **Database** | Supabase (PostgreSQL) - Optional |
| **AI Model** | Google Gemini 2.0 Flash |
| **Icons** | Lucide React |
| **Markdown** | react-markdown + remark-gfm |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have:
- **Node.js 20+** installed ([Download](https://nodejs.org/))
- A **Google Cloud** account for OAuth and Gemini API
- *(Optional)* A **Supabase** project for database features

---

### 📋 Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/luna-ai-chatbot.git
cd luna-ai-chatbot
```

---

### 🔑 Step 2: Set Up API Keys

#### **2.1 Google OAuth Credentials**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted
6. Select **Web application** as application type
7. Add authorized redirect URI:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-domain.com/api/auth/callback/google`
8. Copy the **Client ID** and **Client Secret**

#### **2.2 Google AI (Gemini) API Key**

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Create API Key**
3. Copy the API key (starts with `AIza...`)

#### **2.3 NextAuth Secret**

Generate a secure random string:

```bash
openssl rand -base64 32
```

#### **2.4 (Optional) Supabase Setup**

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Go to **Settings** → **API**
4. Copy the **Project URL** and **anon/public** key

---

### 📝 Step 3: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google AI (Gemini) API Key
GOOGLE_AI_API_KEY=your_google_ai_api_key_here

# Supabase (Optional - for database features)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

> ⚠️ **Important:** Never commit `.env.local` to GitHub! It's already in `.gitignore`.

---

### 💻 Step 4: Install & Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser 🎉

---

## 📁 Project Structure

```
luna-ai-chatbot/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts          # NextAuth configuration
│   │   └── chat/
│   │       └── route.ts          # Chat API with Gemini integration
│   ├── chat/
│   │   └── page.tsx              # Main chat interface
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
├── components/
│   ├── ChatInput.tsx             # Message input component
│   ├── ChatInterface.tsx         # Main chat UI wrapper
│   ├── LandingPage.tsx           # Landing page with night sky
│   ├── MarkdownRenderer.tsx      # Markdown formatting for AI responses
│   ├── MessageList.tsx           # Message display
│   ├── Providers.tsx             # NextAuth session provider
│   ├── Sidebar.tsx               # Chat history sidebar
│   ├── ThemeProvider.tsx         # Dark/light mode context
│   └── ThemeToggle.tsx           # Theme toggle button
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Client-side Supabase
│   │   └── server.ts             # Server-side Supabase
│   └── types.ts                  # TypeScript type extensions
├── .env.local                    # Environment variables (not in git)
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies
└── README.md                     # You are here!
```

---

## 🧩 How It Works

### **Authentication Flow**
1. User clicks "Start Chatting" on landing page
2. Redirected to Google OAuth consent screen
3. After approval, NextAuth creates a JWT session
4. User lands on `/chat` page

### **Chat Flow**
1. User types a message and hits send
2. Message is added to conversation history
3. Request sent to `/api/chat` with:
   - Current message
   - Conversation history
   - User memory (name, preferences, etc.)
4. Backend calls Google Gemini API with full context
5. AI response streamed back and rendered with markdown
6. Response added to conversation
7. User memory updated if new personal info detected
8. Chat saved to localStorage (and optionally Supabase)

### **Memory System**
- Detects patterns like "My name is...", "I like...", "I'm from..."
- Stores information in localStorage per user
- Includes memory in system prompt for personalized responses
- Persists across browser sessions

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [Vercel](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository
   - Add environment variables in **Environment Variables** section:
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`
     - `NEXTAUTH_SECRET`
     - `NEXTAUTH_URL` (set to your Vercel URL)
     - `GOOGLE_AI_API_KEY`
   - Click **Deploy**

3. **Update Google OAuth:**
   - Add your Vercel URL to authorized redirect URIs:
     - `https://your-app.vercel.app/api/auth/callback/google`

4. **Done!** Your LUNA chatbot is live! 🎉

---

## 🔒 Security

✅ **All API keys are safely stored in environment variables**  
✅ **`.env.local` is git-ignored (never committed)**  
✅ **No hardcoded secrets in the codebase**  
✅ **OAuth for secure authentication**  
✅ **JWT sessions with secure secrets**

Before pushing to GitHub, verify:
```bash
git status
# Should NOT show .env.local
```

---

## 🎨 Customization

### Change AI Model
Edit `app/api/chat/route.ts`:
```typescript
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash-exp', // Change to gemini-pro, etc.
  systemInstruction: systemPrompt
})
```

### Modify Theme Colors
Edit `components/ChatInterface.tsx` and `components/LandingPage.tsx` for gradient colors.

### Adjust Memory Patterns
Edit the memory extraction logic in `app/api/chat/route.ts` (lines 63-105).

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Unauthorized" error** | Check Google OAuth credentials in `.env.local` |
| **AI not responding** | Verify `GOOGLE_AI_API_KEY` is correct |
| **Sign-in redirect loop** | Ensure `NEXTAUTH_URL` matches your domain |
| **Database errors** | Supabase is optional - app works without it |
| **Port 3000 in use** | Next.js will auto-assign port 3001 |

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Google Gemini** for the powerful AI model
- **Vercel** for Next.js and hosting
- **Supabase** for the backend infrastructure
- **NextAuth.js** for authentication
- **Tailwind CSS** for the beautiful styling

---

## 📧 Contact

Questions or feedback? Feel free to open an issue or reach out!

---

<div align="center">
  <strong>Built with 💙 using Next.js and Google Gemini</strong>
  <br/>
  <sub>⭐ Star this repo if you found it helpful!</sub>
</div>
