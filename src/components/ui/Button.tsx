import { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            disabled,
            className = '',
            children,
            ...props
        },
        ref
    ) => {
        // Changed rounded-xl to rounded-full for the organic MindSpring feel
        const baseStyles =
            'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-500/20 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide relative overflow-hidden group';

        const variantStyles = {
            primary:
                'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 border-t border-white/20',
            glow: 
                'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow hover:shadow-glow-strong border-t border-white/30',
            secondary:
                'bg-slate-100 dark:bg-surface hover:bg-slate-200 dark:hover:bg-surface/80 text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-lg',
            outline:
                'bg-transparent border-2 border-primary-500/50 text-primary-600 dark:text-white hover:bg-primary-500/10 hover:border-primary-500',
            ghost: 'bg-transparent text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5',
        };

        const sizeStyles = {
            sm: 'px-5 py-2 text-[10px] gap-2',
            md: 'px-8 py-3 text-xs gap-2',
            lg: 'px-10 py-4 text-sm gap-3',
        };

        return (
            <motion.div
                whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
                whileTap={{ scale: disabled || isLoading ? 1 : 0.95 }}
                className={`inline-block w-full sm:w-auto ${disabled ? 'cursor-not-allowed' : ''}`}
            >
                <button
                    ref={ref}
                    className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
                    disabled={disabled || isLoading}
                    aria-busy={isLoading}
                    aria-disabled={disabled || isLoading}
                    {...props}
                >
                    {/* Shine Effect */}
                    {(variant === 'primary' || variant === 'glow') && (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shine" />
                    )}

                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isLoading && <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 18} />}
                        {children}
                    </span>
                </button>
            </motion.div>
        );
    }
);

Button.displayName = 'Button';

export default Button;
