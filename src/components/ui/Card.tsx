import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    hoverEffect?: boolean;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, hoverEffect = false, className = '', ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={`
                glass-card rounded-2xl p-6 sm:p-8 
                ${hoverEffect ? 'hover:border-primary-500/30 hover:shadow-glow transition-all duration-300' : ''}
                ${className}
            `}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
