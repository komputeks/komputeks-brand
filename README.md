# Komputeks Brand Website

> **For People Building Anyway**

[![Live Site](https://img.shields.io/badge/Live-komputeks--brand.vercel.app-amber?style=flat-square)](https://komputeks-brand.vercel.app)
[![GitHub deployments](https://img.shields.io/github/deployments/komputeks/komputeks-brand/production?style=flat-square&label=Production)](https://github.com/komputeks/komputeks-brand/deployments)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06b6d4?style=flat-square)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%7C%20DB%20%7C%20Storage-3ecf8e?style=flat-square)](https://supabase.com)

The official brand website for Komputeks — the world's most trusted ecosystem for people building with limited resources. Not hobbyists. Not poor people. People with more determination than resources.

---

## 🔗 Live

**Production**: [komputeks-brand.vercel.app](https://komputeks-brand.vercel.app)

**Demo Account**: `demo@komputeks.com` / `password123` (admin role)

---

## 🏗 Architecture

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 15 (App Router) | Server Components, streaming, PPR |
| Language | TypeScript 5.x (strict) | Type safety, zero `any` |
| Styling | Tailwind CSS v4 | Utility-first, CSS-based config |
| Database | Supabase (Postgres) | Free tier, RLS, real-time |
| Auth | Supabase Auth | Email + Google OAuth, free |
| Validation | Zod | Client + server schemas |
| Deployment | Vercel | GitHub-connected, auto-deploy on push |
| Source | GitHub | CI/CD, deployments visible |

---

## ✨ Features

### Marketing Pages
- 🏠 **Landing** — Hero ("For People Building Anyway"), products grid, three pillars, gains, testimonials, email capture CTA
- 📦 **Products** — All 18 Komputeks products with category filtering and live status badges
- 📖 **About** — Founder story, monopoly positioning, competitive stance, core insight
- 📝 **Contact** — Validated form with Supabase persistence
- ❓ **FAQ** — Accordion-style answers (7 seeded)
- 📄 **Privacy Policy** & **Terms of Service**

### Auth & Dashboards
- 🔐 **Login / Signup / Reset** — Email + password, Google OAuth
- 👤 **User Dashboard** — Profile, member info, quick links
- 🛡️ **Admin Dashboard** — Product CRUD, contact management, subscriber list

### Developer Experience
- 🌙 **Theme** — Dark / Light / System toggle (dark default)
- 📱 **PWA** — manifest.json, service worker, offline fallback, app icons
- 🔍 **SEO** — sitemap.xml, robots.txt, JSON-LD (Organization), per-page meta/OG/Twitter
- 📚 **Docs** — User Manual, Changelog, Roadmap
- 🏥 **Health** — `/api/health` endpoint

---

## 🗄 Database Schema

| Table | Purpose | Seeded |
|-------|---------|--------|
| `komputeks_products` | Products with status, category, URLs | 18 rows |
| `komputeks_testimonials` | User testimonials | 3 rows |
| `komputeks_faqs` | FAQ entries | 7 rows |
| `komputeks_subscribers` | Email subscribers | — |
| `komputeks_contacts` | Contact form submissions | — |
| `komputeks_blog_posts` | Blog posts (published/draft) | — |
| `komputeks_users` | User profiles with roles | 1 admin |

All tables have Row Level Security (RLS) policies.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/komputeks/komputeks-brand.git
cd komputeks-brand
npm install
cp .env.example .env.local
# Fill in your env vars
npm run dev
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ | Supabase service role key |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | ⚪ | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | ⚪ | Google OAuth client secret |

---

## 🚢 Deploy

### One-Click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/komputeks/komputeks-brand)

### Manual (Vercel CLI)

```bash
npm i -g vercel
vercel --prod
```

### Other Platforms

This is a standard Next.js app — deploy to [Netlify](https://netlify.com), [Cloudflare Pages](https://pages.cloudflare.com), or any Node.js host.

---

## 🧠 Architectural Decisions

1. **Next.js App Router** over Pages Router — Server Components, streaming, better DX
2. **Supabase Auth** over NextAuth — tighter integration, free tier friendly
3. **Tailwind CSS v4** — CSS-based config, no `tailwind.config.ts` needed
4. **Dark mode default** — matches brand identity (gritty, real, determined)
5. **Amber/gold accent** — represents value, leverage, determination
6. **Zod validation** — shared schemas on client and server
7. **Feature-based modules** — each feature owns components, schemas, types, services
8. **Server Components by default** — Client Components only for interactivity
9. **No `useEffect` data fetching** — fetch on server, mutate with actions/API routes
10. **vercel.json without secrets** — env vars set via Vercel dashboard/API, never committed

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (marketing)/        # landing, about, products, contact, faq, docs, legal
│   ├── (auth)/             # login, signup, reset
│   ├── (dashboard)/        # user dashboard
│   ├── admin/              # admin CMS
│   └── api/                # REST API routes
├── components/
│   ├── ui/                 # button, input, card, badge, skeleton
│   └── shared/             # navbar, footer, theme toggle/provider
├── features/
│   ├── products/           # components, schemas, types, service
│   ├── auth/               # schemas
│   ├── contacts/           # components, schemas
│   ├── subscribers/        # components, schemas
│   └── ...
└── lib/
    ├── supabase/           # client, server, admin
    ├── utils.ts
    └── env.ts
```

---

## 📋 Manual Follow-Up

- [ ] Configure **Google OAuth** in Supabase Dashboard → Authentication → Providers → Google (Client ID + Secret + callback URL: `https://twixlfsszkfpmvhuqkih.supabase.co/auth/v1/callback`)

---

## License

MIT

---

**Built with determination. Building anyway.**
