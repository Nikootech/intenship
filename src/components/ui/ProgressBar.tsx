import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    seatsLeft?: number;
    role?: 'student' | 'staff';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, seatsLeft, role }) => {
    // Determine progress percentage
    const progress = Math.min((currentStep / totalSteps) * 100, 100);

    return (
        <div className="w-full max-w-2xl mx-auto mb-8">
            <div className="flex justify-between items-end mb-3">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-primary-600 dark:text-primary-500 uppercase tracking-widest mb-1">
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span className="text-slate-900 dark:text-white font-bold text-lg">
                        {currentStep === 1 && "Personal Details"}
                        {currentStep === 2 && "Select Domain"}
                        {currentStep === 3 && role !== 'staff' && "Secure Seat"}
                        {currentStep === 3 && role === 'staff' && "Review"}
                        {currentStep === 4 && "Confirmation"}
                    </span>
                </div>
                
                {seatsLeft !== undefined && (
                     <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-background/50 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">
                            Only <span className="text-slate-900 dark:text-white font-bold">{seatsLeft} seats</span> left
                        </span>
                    </div>
                )}
            </div>

            {/* Bar Container */}
            <div className="h-2 bg-slate-200 dark:bg-text-muted/10 rounded-full overflow-hidden relative">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full box-shadow-glow"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                >
                    {/* Shimmer on bar */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine" />
                </motion.div>
            </div>
        </div>
    );
};

export default ProgressBar;
