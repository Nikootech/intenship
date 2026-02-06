import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Code, Database, Zap, Info, CheckCircle2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { InternshipDomain, INTERNSHIP_DOMAINS } from '@/types/enrollment';

interface Step2DomainProps {
    onNext: (domains: InternshipDomain[]) => Promise<void> | void;
    onBack: () => void;
    initialData?: InternshipDomain | null;
    role?: 'student' | 'staff';
}

const iconMap = {
    Palette: Palette,
    Code: Code,
    Database: Database,
    Zap: Zap,
};

const Step2Domain: React.FC<Step2DomainProps> = ({
    onNext,
    onBack,
    initialData,
    role = 'student',
}) => {
    const isStaff = role === 'staff';
    const [selectedDomains, setSelectedDomains] = useState<InternshipDomain[]>(
        initialData ? [initialData] : []
    );

    const toggleDomain = (domain: InternshipDomain) => {
        if (selectedDomains.some(d => d.id === domain.id)) {
            setSelectedDomains(selectedDomains.filter(d => d.id !== domain.id));
        } else {
            setSelectedDomains([...selectedDomains, domain]);
        }
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContinue = async () => {
        if (selectedDomains.length === 0) {
            import('react-hot-toast').then(({ default: toast }) => {
                toast.error('Please select at least one course to proceed');
            });
            return;
        }

        setIsSubmitting(true);
        try {
            await onNext(selectedDomains);
        } catch (error) {
            console.error("Submission failed", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const totalPrice = selectedDomains.reduce((sum, d) => sum + d.price, 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-5xl mx-auto"
        >
            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex p-3 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4 border border-primary-200 dark:border-primary-500/20 shadow-glow"
                >
                    <Zap className="w-8 h-8 text-primary-600 dark:text-primary-500" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                    {isStaff ? 'Course Assignment' : 'Choose Your Specialization'}
                </h2>
                <p className="text-slate-600 dark:text-secondary-400 text-lg font-medium">
                    Select the domains you want to master. 
                    <span className="text-primary-600 dark:text-primary-400 font-bold ml-1">
                        {isStaff ? 'Staff access granted.' : 'Add multiple for a comprehensive portfolio.'}
                    </span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {INTERNSHIP_DOMAINS.map((domain, index) => {
                    const Icon = iconMap[domain.icon as keyof typeof iconMap];
                    const isSelected = selectedDomains.some(d => d.id === domain.id);

                    return (
                        <motion.div
                            key={domain.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group h-full"
                        >
                            <Card
                                onClick={() => toggleDomain(domain)}
                                className={`h-full cursor-pointer transition-all duration-500 relative overflow-hidden group/card ${
                                    isSelected 
                                    ? 'border-2 border-primary-600 shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)] ring-4 ring-primary-500/5' 
                                    : 'border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:shadow-xl shadow-sm bg-white/50 dark:bg-transparent'
                                }`}
                            >
                                {/* Selection Checkmark */}
                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute top-4 right-4 text-primary-500"
                                        >
                                            <CheckCircle2 className="w-6 h-6 fill-primary-500/20" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="flex items-start gap-6 mb-8">
                                    <div className={`p-4 rounded-2xl transition-all duration-500 shrink-0 ${isSelected ? 'bg-primary-600 text-white' : 'bg-slate-50 dark:bg-white/5 text-slate-400 group-hover/card:text-primary-500 group-hover/card:bg-primary-50'}`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="mb-2.5">
                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-md ${isSelected ? 'bg-primary-500 text-white' : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-secondary-500 border border-slate-200 dark:border-white/10'}`}>
                                                {domain.duration}
                                            </span>
                                        </div>
                                        <h3 className={`text-xl font-black tracking-tight mb-2 ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-text-primary'}`}>
                                            {domain.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-secondary-500 font-medium leading-relaxed">
                                            {domain.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 gap-3">
                                        {domain.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 dark:text-secondary-400">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary-500 shadow-[0_0_8px_rgba(220,38,38,0.4)]' : 'bg-slate-300 dark:bg-white/10'}`} />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-2">
                                        {domain.subcourses?.map((sc, idx) => (
                                            <span 
                                                key={idx} 
                                                className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border ${isSelected ? 'bg-primary-500/10 border-primary-500/20 text-primary-700 dark:text-white' : 'bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-400 dark:text-secondary-500'}`}
                                            >
                                                {sc}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex items-end justify-between">
                                    <div className="text-xs font-medium text-slate-500 dark:text-secondary-500">
                                        Total Fee
                                    </div>
                                    <div className={`text-3xl font-black tracking-tight ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                                        {isStaff ? 'FREE' : `₹${domain.price}`}
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            {/* Bottom Bar */}
             <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 dark:bg-background/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 z-40 sm:static sm:bg-transparent sm:border-0 sm:p-0">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center gap-4">
                    {selectedDomains.length > 0 ? (
                        <div className="flex-1 w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 bg-slate-50 dark:bg-surface/80 border border-slate-200 dark:border-primary-500/20 px-6 py-3 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Info className="w-5 h-5 text-primary-600 dark:text-primary-500" />
                                <span className="text-sm font-medium text-slate-600 dark:text-secondary-400">
                                    {selectedDomains.length} {selectedDomains.length === 1 ? 'Course' : 'Courses'} Selected
                                </span>
                            </div>
                            <div className="text-xl font-black text-slate-900 dark:text-white">
                                {isStaff ? '₹0' : `₹${totalPrice}`}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1" />
                    )}

                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button
                            variant="secondary"
                            onClick={onBack}
                            className="flex-1 sm:flex-none"
                        >
                            Back
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleContinue}
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                            className="flex-1 sm:flex-none"
                        >
                            {isStaff ? 'Confirm Assignment' : 'Proceed to Payment'}
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Spacer for fixed bottom bar on mobile */}
            <div className="h-24 sm:h-0" />
        </motion.div>
    );
};

export default Step2Domain;
