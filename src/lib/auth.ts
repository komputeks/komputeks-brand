/* type-only import removed — authOptions inferred */
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { createServerClient } from './supabase/server'
import { z } from 'zod'

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '').split(',').map(e => e.trim()).filter(Boolean)
}

function isAdminEmail(email: string): boolean {
  return getAdminEmails().includes(email.toLowerCase())
}

export const authOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID!, clientSecret: process.env.GOOGLE_CLIENT_SECRET! }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const email = credentials.email.toLowerCase()
        if (isAdminEmail(email) && process.env.ADMIN_PASSWORD) {
          if (credentials.password === process.env.ADMIN_PASSWORD) {
            return { id: `admin-${email}`, email, name: email, role: 'admin' }
          }
        }
        const supabase = createServerClient()
        const { data, error } = await supabase.auth.signInWithPassword({ email: credentials.email, password: credentials.password })
        if (error || !data.user || !data.session) return null
        const role = (data.user.user_metadata?.role as string) || 'user'
        return { id: data.user.id, email: data.user.email!, name: (data.user.user_metadata?.name as string) || data.user.email!, image: data.user.user_metadata?.image as string | undefined, role }
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user, account, profile }: any) {
      if (user) { token.id = user.id; token.role = user.role }
      if (account?.provider === 'google' && profile?.email) {
        const supabase = createServerClient()
        const role = isAdminEmail(profile.email.toLowerCase()) ? 'admin' : 'user'
        const { data: existingList } = await supabase.auth.admin.listUsers()
        const existing = existingList?.users?.find(u => u.email === profile.email)
        if (existing) { token.id = existing.id; token.role = (existing.user_metadata?.role as string) || role }
        else {
          const { data: created } = await supabase.auth.admin.createUser({ email: profile.email, password: crypto.randomUUID(), email_confirm: true, user_metadata: { name: profile.name || profile.email, image: profile.image, role } })
          if (created.user) { token.id = created.user.id; token.role = role }
        }
      }
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      if (session.user) { session.user.id = token.id as string; session.user.role = token.role as string }
      return session
    },
  },
  pages: { signIn: '/login', error: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
}