import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(1, 'Description is required'),
  url: z.string().url().nullable().optional(),
  status: z.enum(['working', 'partly-working', 'started', 'not-started']),
  category: z.string().min(1, 'Category is required'),
  icon: z.string().min(1),
  sort_order: z.number().int().min(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  content: z.string().min(1, 'Content is required'),
  avatar_url: z.string().url().nullable().optional(),
  sort_order: z.number().int().min(0),
});

export const faqSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(1, 'Answer is required'),
  sort_order: z.number().int().min(0),
});

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  published: z.boolean().default(false),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(1, 'Name is required'),
});