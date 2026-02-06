import { SelectHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = '', ...props }, ref) => {
        return (
            <div className="relative w-full">
                {label && (
                    <label className="block mb-2 text-sm font-semibold text-slate-600 dark:text-text-secondary">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        className={`
              w-full px-4 py-4 pr-12
              bg-slate-50 dark:bg-surface
              border border-slate-200 dark:border-border rounded-xl
              ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'}
              text-slate-900 dark:text-white
              focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500
              appearance-none cursor-pointer
              transition-all duration-300
              ${className}
            `}
                        {...props}
                    >
                        <option value="" className="text-secondary-400">
                            Select an option
                        </option>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                className="text-secondary-900"
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-secondary-400 pointer-events-none"
                        size={20}
                    />
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-400 flex items-center gap-1"
                    >
                        <span>⚠</span> {error}
                    </motion.p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
