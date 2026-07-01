export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  url: string | null;
  status: 'working' | 'partly-working' | 'started' | 'not-started';
  category: string;
  icon: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string | null;
  icon_letter: string | null;
  cover_image: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  author_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Subscriber {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'user';
  created_at: string;
  updated_at: string;
}

export const PRODUCT_CATEGORIES: Record<string, string> = {
  'Data': 'data',
  'Storage': 'storage',
  'Commerce': 'commerce',
  'Developer Tools': 'developer-tools',
  'AI & Automation': 'ai',
  'Communication': 'communication',
  'Information': 'information',
  'Media': 'media',
  'Productivity': 'productivity',
  'Infrastructure': 'infrastructure',
  'Content': 'content',
};

export const SERVICE_CATEGORIES: Record<string, string> = {
  'Technology': 'technology',
  'Commerce': 'commerce',
  'Operations': 'operations',
  'Marketing': 'marketing',
  'Education': 'education',
};

export const BLOG_CATEGORIES: Record<string, string> = {
  'Philosophy': 'philosophy',
  'Building': 'building',
  'Technology': 'technology',
  'Founder Story': 'founder-story',
};

export function getCategorySlug(map: Record<string, string>, category: string): string {
  return map[category] || category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function getCategoryFromSlug(map: Record<string, string>, slug: string): string | null {
  for (const [name, s] of Object.entries(map)) {
    if (s === slug) return name;
  }
  return null;
}