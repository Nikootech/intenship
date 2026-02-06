import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 bg-white/10 dark:bg-white/5 border border-white/10 text-white hover:border-primary-500/50"
            aria-label="Toggle Theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
                className="absolute"
            >
                <Moon className="w-5 h-5" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? -180 : 0, scale: theme === 'dark' ? 0 : 1 }}
            >
                <Sun className="w-5 h-5 text-amber-400" />
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
