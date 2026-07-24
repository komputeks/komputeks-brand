import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none';

  const variants = {
    primary: 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white shadow-lg hover:shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-white/5 text-white/70 hover:text-white',
    danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 hover:border-red-500/40',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    md: 'h-10 px-5 py-2.5 text-sm rounded-xl',
    lg: 'h-12 px-6 py-3 text-base rounded-xl',
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}