import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MindMeshLogo from './ui/MindMeshLogo';
import ThemeToggle from './ui/ThemeToggle';

const Header: React.FC = () => {
    return (
        <>
            {/* Floating Logo (Top Left) */}
            <div className="fixed top-6 left-6 z-[60] pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto"
                >
                    <Link to="/" className="block hover:scale-105 transition-transform">
                        <MindMeshLogo className="h-10 md:h-12" />
                    </Link>
                </motion.div>
            </div>

            {/* Floating Badge & Toggle (Top Right) */}
            <div className="fixed top-6 right-6 z-[60] flex items-center gap-3 pointer-events-none">
                <div className="pointer-events-auto">
                    <ThemeToggle />
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="pointer-events-auto"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-background/40 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-full shadow-lg">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-white dark:text-gray-200 uppercase tracking-widest leading-none">
                            Admissions Open
                        </span>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Header;
