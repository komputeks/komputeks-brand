'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Product } from '../types';
import { ExternalLink, HardDrive, Cloud, MessageSquare, FileSpreadsheet, Shield, Lightbulb, Code, Search, Mail, Calendar, ShoppingBag, Newspaper, Briefcase, Bot, Globe, Database, Video, Image, Smartphone } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'hard-drive': HardDrive,
  'cloud': Cloud,
  'message-square': MessageSquare,
  'file-spreadsheet': FileSpreadsheet,
  'shield': Shield,
  'lightbulb': Lightbulb,
  'code': Code,
  'search': Search,
  'mail': Mail,
  'calendar': Calendar,
  'shopping-bag': ShoppingBag,
  'newspaper': Newspaper,
  'briefcase': Briefcase,
  'bot': Bot,
  'globe': Globe,
  'database': Database,
  'video': Video,
  'image': Image,
  'smartphone': Smartphone,
};

const statusConfig = {
  'working': { variant: 'success' as const, label: 'Live' },
  'partly-working': { variant: 'warning' as const, label: 'Beta' },
  'started': { variant: 'info' as const, label: 'In Progress' },
  'not-started': { variant: 'default' as const, label: 'Coming Soon' },
};

export function ProductCard({ product }: { product: Product }) {
  const Icon = iconMap[product.icon] || Code;
  const status = statusConfig[product.status];

  return (
    <Card hover className="flex flex-col justify-between">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 dark:bg-brand-900/30">
            <Icon className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{product.name}</h3>
        <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">{product.tagline}</p>
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{product.description}</p>
      </div>
      {product.url && (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300"
        >
          Visit <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
    </Card>
  );
}