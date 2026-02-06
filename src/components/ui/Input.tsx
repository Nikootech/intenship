import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    maxLength?: number;
    showCounter?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error,
            icon,
            maxLength,
            showCounter = false,
            className = '',
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [currentLength, setCurrentLength] = useState(
            value ? String(value).length : 0
        );

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setCurrentLength(e.target.value.length);
            if (onChange) {
                onChange(e);
            }
        };

        return (
            <div className="relative w-full group">
                {label && (
                    <label 
                        className={`block mb-2 text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isFocused ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-text-secondary'}`}
                    >
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 z-10 ${isFocused ? 'text-primary-600 dark:text-primary-500' : 'text-slate-400 dark:text-text-secondary'}`}>
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={props.id || props.name}
                        value={value}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        maxLength={maxLength}
                        aria-invalid={!!error}
                        aria-disabled={props.disabled}
                        className={`
                            w-full px-4 py-4 ${icon ? 'pl-12' : ''} 
                            bg-slate-50 dark:bg-surface/50 backdrop-blur-sm
                            border rounded-xl
                            ${error 
                                ? 'border-red-500/50 focus:border-red-500' 
                                : isFocused 
                                    ? 'border-primary-500 shadow-[0_0_15px_-5px_rgba(235,49,54,0.3)]' 
                                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                            }
                            text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-text-muted
                            focus:outline-none focus:bg-white dark:focus:bg-surface
                            transition-all duration-300
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${className}
                        `}
                        {...props}
                    />
                </div>

                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="text-xs text-red-400 flex items-center gap-1.5 font-medium"
                        >
                            <span className="flex-shrink-0 w-1 h-1 rounded-full bg-red-400" /> {error}
                        </motion.p>
                    )}
                </AnimatePresence>

                {showCounter && maxLength && (
                    <div className="mt-1 text-right text-[10px] text-text-muted font-medium">
                        {currentLength} <span className="text-text-secondary">/ {maxLength}</span>
                    </div>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
