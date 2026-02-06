import { useState, useRef, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectProps {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
    className?: string;
    placeholder?: string;
    value?: string;
    name?: string;
    onChange?: (event: { target: { name?: string; value: string } }) => void;
    onBlur?: (event: { target: { name?: string } }) => void;
    disabled?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ 
        label, 
        error, 
        options, 
        className = '', 
        placeholder = 'Select an option',
        value,
        name,
        onChange,
        onBlur,
        disabled = false,
        ...props 
    }, ref) => {
        const [isOpen, setIsOpen] = useState(false);
        const [internalValue, setInternalValue] = useState(value || '');
        const containerRef = useRef<HTMLDivElement>(null);
        
        useEffect(() => {
            if (value !== undefined) {
                setInternalValue(value);
            }
        }, [value]);

        const selectedOption = options.find((opt) => opt.value === internalValue);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    if (isOpen) {
                        setIsOpen(false);
                        onBlur?.({ target: { name } });
                    }
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [isOpen, onBlur, name]);

        const handleToggle = () => {
            if (!disabled) {
                setIsOpen(!isOpen);
            }
        };

        const handleSelect = (optionValue: string) => {
            setInternalValue(optionValue);
            onChange?.({ target: { name, value: optionValue } });
            setIsOpen(false);
        };

        return (
            <div className={`relative w-full ${className}`} ref={containerRef}>
                {label && (
                    <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-text-secondary transition-colors duration-300">
                        {label}
                    </label>
                )}
                
                <div className="relative">
                    {/* Hidden native select for React Hook Form / Native Forms */}
                    <select
                        ref={ref}
                        name={name}
                        value={value || ''}
                        onChange={(e) => handleSelect(e.target.value)}
                        onBlur={onBlur}
                        className="sr-only"
                        aria-hidden="true"
                        tabIndex={-1}
                        {...props}
                    >
                        <option value="">{placeholder}</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={handleToggle}
                        disabled={disabled}
                        className={`
                            w-full px-4 py-4 pr-12 text-left
                            bg-slate-50 dark:bg-surface/50 backdrop-blur-sm
                            border rounded-xl transition-all duration-300
                            flex items-center justify-between
                            ${error 
                                ? 'border-red-500/50 focus:border-red-500' 
                                : isOpen 
                                    ? 'border-primary-500 shadow-[0_0_15px_-5px_rgba(235,49,54,0.3)]' 
                                    : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                            }
                            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                    >
                        <span className={`truncate ${!selectedOption ? 'text-slate-400 dark:text-text-muted' : 'text-slate-900 dark:text-white'}`}>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                        <ChevronDown 
                            className={`w-5 h-5 text-slate-400 dark:text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary-500' : ''}`} 
                        />
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute z-50 w-full mt-2 bg-white dark:bg-surface border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                            >
                                <div className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
                                    {options.length > 0 ? (
                                        options.map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleSelect(option.value)}
                                                className={`
                                                    w-full px-4 py-3 flex items-center justify-between
                                                    text-sm transition-colors duration-200
                                                    ${option.value === internalValue 
                                                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-semibold' 
                                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                                                    }
                                                `}
                                            >
                                                <span>{option.label}</span>
                                                {option.value === internalValue && (
                                                    <Check className="w-4 h-4 text-primary-500" />
                                                )}
                                            </button>
                                        ))
                                    ) : (
                                        <div className="px-4 py-3 text-sm text-slate-400 dark:text-text-muted italic">
                                            No options available
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
