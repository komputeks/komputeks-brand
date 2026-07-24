export interface Project {
  id: string; slug: string; title: string; tagline: string; description: string; content: string;
  category: string; tags: string | null; live_url: string | null; repo_url: string | null;
  image_url: string | null; status: string; sort_order: number; featured: boolean;
  created_at: string; updated_at: string;
}

export interface Service {
  id: string; slug: string; title: string; tagline: string; description: string; content: string;
  category: string; tags: string | null; icon: string | null; sort_order: number;
  created_at: string; updated_at: string;
}

export interface BlogPost {
  id: string; slug: string; title: string; excerpt: string; content: string;
  category: string; tags: string | null; author: string; image_url: string | null;
  reading_time: number; published_at: string; created_at: string; updated_at: string;
}

export interface Subscriber { id: string; email: string; source: string; created_at: string }
export interface Contact { id: string; name: string; email: string; subject: string; message: string; read: boolean; created_at: string }

export interface SearchResult {
  type: 'project' | 'service' | 'blog'; slug: string; title: string;
  description: string; category: string; href: string;
}

export interface User {
  id: string; email: string; name: string | null; role: string;
  image: string | null; provider: string; created_at: string; updated_at: string;
}