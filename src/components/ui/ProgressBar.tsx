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
        <div className="w-full mb-8">
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary-600 dark:text-primary-500 uppercase tracking-[0.2em]">
                            Step {currentStep}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20" />
                        <span className="text-[10px] font-black text-slate-400 dark:text-secondary-500 uppercase tracking-[0.2em] transition-all">
                            {currentStep === 1 && "Profile"}
                            {currentStep === 2 && "Specialization"}
                            {currentStep === 3 && role !== 'staff' && "Secure Seat"}
                            {currentStep === 3 && role === 'staff' && "Review"}
                            {currentStep === 4 && "Confirmation"}
                        </span>
                    </div>

                    {seatsLeft !== undefined && (
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 dark:bg-red-500/5 rounded-full border border-red-100 dark:border-red-500/10">
                            <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[9px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest whitespace-nowrap">
                                {seatsLeft} Slots Remaining
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between group">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                        {currentStep === 1 && "Join the Program"}
                        {currentStep === 2 && "Select Your Domain"}
                        {currentStep === 3 && "Secure Your Enrollment"}
                        {currentStep === 4 && "Welcome Aboard!"}
                    </h3>
                    <span className="text-[10px] font-black text-slate-400 dark:text-secondary-600 uppercase tracking-widest">
                        {Math.round(progress)}%
                    </span>
                </div>
            </div>

            {/* Bar Container */}
            <div className="h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-primary-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.2)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />
                </motion.div>
            </div>
        </div>
    );
};

export default ProgressBar;
