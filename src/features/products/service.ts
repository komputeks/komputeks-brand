import { createAdminClient } from '@/lib/supabase/admin';
import type { Product, Service, BlogPost, Testimonial, FAQ } from './types';

export async function getProducts(): Promise<Product[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_products').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_products').select('*').eq('slug', slug).single();
  if (error) return null;
  return data;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_products').select('*').eq('category', category).order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getServices(): Promise<Service[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_services').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_services').select('*').eq('slug', slug).single();
  if (error) return null;
  return data;
}

export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  const supabase = createAdminClient();
  let query = supabase.from('komputeks_blog_posts').select('*').order('created_at', { ascending: false });
  if (publishedOnly) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_blog_posts').select('*').eq('slug', slug).eq('published', true).single();
  if (error) return null;
  return data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_testimonials').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('komputeks_faqs').select('*').order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function searchAll(query: string): Promise<{ products: Product[]; services: Service[]; posts: BlogPost[] }> {
  const supabase = createAdminClient();
  const term = `%${query}%`;
  const [pRes, sRes, bRes] = await Promise.all([
    supabase.from('komputeks_products').select('*').or(`name.ilike.${term},tagline.ilike.${term},description.ilike.${term}`).limit(10),
    supabase.from('komputeks_services').select('*').or(`title.ilike.${term},excerpt.ilike.${term}`).limit(10),
    supabase.from('komputeks_blog_posts').select('*').eq('published', true).or(`title.ilike.${term},excerpt.ilike.${term}`).limit(10),
  ]);
  return {
    products: pRes.data || [],
    services: sRes.data || [],
    posts: bRes.data || [],
  };
}