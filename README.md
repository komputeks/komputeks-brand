# Komputeks Brand Website

> For People Building Anyway

The official brand website for Komputeks — the world's most trusted ecosystem for people building with limited resources.

## Architecture

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (Postgres, Auth, Storage)
- **Validation**: Zod
- **Deployment**: Vercel
- **Source Control**: GitHub

## Features

- 🏠 Landing page with hero, products, pillars, testimonials, email capture
- 📦 Products showcase with category filtering and status badges
- 📖 About page with founder story and monopoly positioning
- 📝 Contact form with validation and Supabase persistence
- ❓ FAQ page with accordion-style answers
- 🔐 Authentication (email/password + Google OAuth via Supabase)
- 👤 User dashboard with profile
- 🛡️ Admin dashboard for content management (products, contacts, subscribers)
- 🌙 Dark/light/system theme toggle
- 📱 PWA support (manifest, service worker, offline page)
- 🔍 SEO optimization (sitemap, robots.txt, JSON-LD, meta tags)
- 📄 Privacy Policy and Terms of Service
- 📚 Documentation (User Manual, Changelog, Roadmap)

## Database Schema

| Table | Purpose |
|-------|---------|
| `komputeks_products` | All Komputeks products with status, category, URLs |
| `komputeks_testimonials` | User testimonials |
| `komputeks_faqs` | Frequently asked questions |
| `komputeks_subscribers` | Email subscribers |
| `komputeks_contacts` | Contact form submissions |
| `komputeks_blog_posts` | Blog posts (published/draft) |
| `komputeks_users` | User profiles with roles (admin/user) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Clone the repo
git clone https://github.com/komputeks/komputeks-brand.git
cd komputeks-brand

# Install dependencies
npm install

# Copy env vars
cp .env.example .env.local

# Run dev server
npm run dev
```

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Demo Account

- **Email**: demo@komputeks.com
- **Password**: password123
- **Role**: Admin

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/komputeks/komputeks-brand)

## Architectural Decisions

1. **Next.js App Router** over Pages Router for Server Components and better performance
2. **Supabase Auth** over NextAuth for tighter integration and free tier compatibility
3. **Tailwind CSS v4** for modern utility-first styling with CSS-based configuration
4. **Dark mode default** to match the brand identity (gritty, real, determined)
5. **Amber/gold accent** color to represent value, leverage, and determination
6. **Zod validation** on both client and server for type safety
7. **Feature-based modules** for scalability and maintainability
8. **Server Components by default** with Client Components only for interactivity

## License

MIT

---

Built with determination. Building anyway.
