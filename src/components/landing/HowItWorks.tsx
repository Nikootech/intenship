import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Briefcase, CreditCard, CheckCircle2 } from 'lucide-react';

const steps = [
    {
        id: 1,
        title: "Create Profile",
        description: "Enter your basic details and upload your resume to get started.",
        icon: UserCircle,
    },
    {
        id: 2,
        title: "Select Domain",
        description: "Choose from Web Development, Python, or other specialized tracks.",
        icon: Briefcase,
    },
    {
        id: 3,
        title: "Staff Account",
        description: "Secure your seat with a small commitment fee via Razorpay. (Skipped for Staff)",
        icon: CreditCard,
    },
    {
        id: 4,
        title: "Get Onboarded",
        description: "Receive your internship offer letter and join the community.",
        icon: CheckCircle2,
    }
];

const HowItWorks: React.FC = () => {
    return (
        <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-surface/30 relative overflow-hidden">
             {/* Background Elements */}
             <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-sm"
                    >
                        <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent font-bold text-sm tracking-wide uppercase">
                            Simple Process
                        </span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6"
                    >
                        Your Path to <span className="text-primary-600 dark:text-primary-500">Success</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-600 dark:text-secondary-400 text-lg max-w-2xl mx-auto"
                    >
                        We've streamlined the journey to get you started on your career path in just minutes.
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[80px] left-[10%] right-[10%] h-[2px] bg-slate-200 dark:bg-white/5 z-0">
                        <motion.div 
                            initial={{ scaleX: 0, originX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-transparent via-primary-500/50 to-transparent w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative z-10 flex flex-col items-center text-center group"
                            >
                                <div className="relative mb-8">
                                    {/* Icon Container */}
                                    <div className="w-20 h-20 rounded-[24px] bg-white dark:bg-[#0F0F0F] border border-slate-200 dark:border-white/10 group-hover:border-primary-500/50 flex items-center justify-center relative z-10 transition-all duration-500 group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] group-hover:-translate-y-2">
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent dark:from-white/5 dark:to-transparent rounded-[24px]" />
                                        <step.icon className="w-8 h-8 text-slate-700 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" />
                                    </div>
                                    
                                    {/* Number Badge */}
                                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-xl bg-white dark:bg-surface border border-slate-200 dark:border-white/10 flex items-center justify-center font-black text-xs text-slate-400 dark:text-secondary-500 group-hover:text-primary-600 dark:group-hover:text-primary-500 group-hover:border-primary-500/30 transition-colors duration-300 shadow-xl z-20">
                                        0{step.id}
                                    </div>
                                    
                                    {/* Glow effect behind */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                                </div>
                                
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                    {step.title}
                                </h3>
                                <p className="text-slate-600 dark:text-secondary-500 text-sm leading-relaxed px-2">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
