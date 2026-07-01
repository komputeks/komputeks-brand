import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/features/products/service';
import { BLOG_CATEGORIES, getCategorySlug, type BlogPost } from '@/features/products/types';
import { BlogDetailClient } from './blog-detail-client';

interface Props { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts(true);
  return posts.map(post => {
    const cat = assignCategory(post);
    return { category: getCategorySlug(BLOG_CATEGORIES, cat), slug: post.slug };
  });
}

function assignCategory(post: BlogPost): string {
  const t = (post.title + ' ' + post.excerpt).toLowerCase();
  if (t.includes('founder') || t.includes('monopoly') || t.includes('obscurity')) return 'Founder Story';
  if (t.includes('ecosystem') || t.includes('own more') || t.includes('leverage company')) return 'Building';
  if (t.includes('software') || t.includes('technology') || t.includes('ai')) return 'Technology';
  return 'Philosophy';
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts(true);
  const enriched = allPosts.map(p => ({ ...p, _cat: assignCategory(p) }));
  const cat = assignCategory(post);
  const catSlug = getCategorySlug(BLOG_CATEGORIES, cat);

  const currentIndex = enriched.findIndex(p => p.slug === slug);
  const prev = currentIndex > 0 ? enriched[currentIndex - 1] : null;
  const next = currentIndex < enriched.length - 1 ? enriched[currentIndex + 1] : null;
  const related = enriched.filter(p => p.slug !== slug && p._cat === cat).slice(0, 3);

  return <BlogDetailClient post={post} category={cat} categorySlug={catSlug} prev={prev} next={next} related={related} />;
}