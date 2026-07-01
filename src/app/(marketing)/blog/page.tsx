import type { Metadata } from 'next';
import { getBlogPosts } from '@/features/products/service';
import { BlogListClient } from './blog-list-client';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Practical insights on building with constraints. No fluff.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts(true);
  return <BlogListClient posts={posts} />;
}