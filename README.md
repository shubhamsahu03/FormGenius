# 🧠 FormGenius

FormGenius is an intelligent form builder platform built with Next.js and TypeScript that enables users to create, manage, and analyze forms with ease. It supports authentication via Kinde, real-time UI with shadcn/ui, Prisma for ORM, and PostgreSQL for database operations. The app integrates Google Gemini API to generate form templates using AI.

## 🌟 Features

- 🔐 Authentication using [Kinde](https://kinde.com)
- 🧱 Create & manage forms with name, description, and AI assistance
- 🧠 Gemini API integration for AI-powered form generation
- 📊 Form analytics and response insights
- 🔄 Real-time UI experience with React & TailwindCSS (shadcn/ui)
- 🗃️ PostgreSQL via Prisma ORM
- ☁️ Fully deployable on [Vercel](https://vercel.com)

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Auth**: Kinde Auth
- **UI**: shadcn/ui, TailwindCSS, Lucide Icons
- **ORM**: Prisma
- **Database**: PostgreSQL (Neon.tech or PlanetScale recommended)
- **AI**: Gemini API (Google PaLM2)
- **State Management**: React Hook Form + Zod
- **Deployment**: Vercel

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/formgenius.git
cd formgenius
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a .env file and add the following:
```bash
# Kinde Auth
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_secret
KINDE_ISSUER_URL=https://your-kinde-subdomain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

# Prisma & DB
DATABASE_URL=your_postgres_url
DIRECT_DATABASE_URL=your_direct_postgres_url

# Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
### 4. Initialize the database
```bash
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```
