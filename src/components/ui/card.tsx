import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900',
        hover && 'transition-shadow hover:shadow-lg hover:shadow-brand-500/5',
        className
      )}
    >
      {children}
    </div>
  );
}