import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { createAdminClient } from '@/lib/supabase/admin';
import { loginSchema } from '@/features/auth/schemas';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
      async authorize(credentials) {
        if (!credentials) return null;
        const result = loginSchema.safeParse(credentials);
        if (!result.success) return null;
        const supabase = createAdminClient();
        const { data, error } = await supabase.auth.signInWithPassword({ email: result.data.email, password: result.data.password });
        if (error || !data.user) return null;
        const { data: profile } = await supabase.from('komputeks_users').select('*').eq('id', data.user.id).single();
        return { id: data.user.id, email: data.user.email ?? '', name: profile?.full_name || data.user.email, role: profile?.role || 'user', image: profile?.avatar_url };
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const supabase = createAdminClient();
        const { data: existing } = await supabase.from('komputeks_users').select('id').eq('email', user.email!).single();
        if (!existing) {
          await supabase.from('komputeks_users').insert({ id: crypto.randomUUID(), email: user.email!, full_name: user.name || null, avatar_url: user.image || null, role: 'user' });
        } else {
          await supabase.from('komputeks_users').update({ avatar_url: user.image || null, updated_at: new Date().toISOString() }).eq('id', existing.id);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const supabase = createAdminClient();
        const { data: profile } = await supabase.from('komputeks_users').select('role').eq('email', user.email!).single();
        token.role = profile?.role || 'user';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).role = token.role;
        (session.user as Record<string, unknown>).id = token.id;
      }
      return session;
    },
  },
  pages: { signIn: '/login', signOut: '/', error: '/login', verifyRequest: '/login' },
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  secret: process.env.NEXTAUTH_SECRET,
};
