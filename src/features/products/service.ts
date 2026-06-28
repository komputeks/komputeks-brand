import { createAdminClient } from '@/lib/supabase/admin';
import type { Product, Testimonial, FAQ, BlogPost } from './types';

export async function getProducts(): Promise<Product[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('komputeks_products')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('komputeks_products')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('komputeks_testimonials')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getFAQs(): Promise<FAQ[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('komputeks_faqs')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getBlogPosts(publishedOnly = true): Promise<BlogPost[]> {
  const supabase = createAdminClient();
  let query = supabase
    .from('komputeks_blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (publishedOnly) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return data;
}