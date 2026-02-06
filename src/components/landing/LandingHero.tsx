import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Terminal, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

const ParticlesBackground = lazy(() => import('../ui/ParticlesBackground'));

const LandingHero: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative pt-20 pb-20 overflow-hidden bg-white dark:bg-[#050202] min-h-[90vh] flex items-center">
            {/* Dynamic Particles Background */}
            <Suspense fallback={null}>
                <ParticlesBackground />
            </Suspense>

            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] bg-primary-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative container mx-auto px-4 z-10 flex flex-col items-center text-center">
                
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-surface/80 border border-primary-500/30 backdrop-blur-md mb-8 text-primary-600 dark:text-primary-400 font-medium text-sm">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        New Batch Starting Soon
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
                        Launch Your <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-300 to-primary-500 animate-gradient bg-[length:200%_auto] pb-2">
                            Tech Career
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-secondary-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        A <span className="text-slate-900 dark:text-white font-semibold">15-day intensive internship program</span> designed to transform students into industry-ready professionals.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() => navigate('/enroll')}
                            className="w-full sm:w-auto min-w-[200px] h-14 text-lg shadow-glow hover:shadow-glow/80 active:scale-95 transition-all"
                        >
                            Start Application <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="w-full sm:w-auto min-w-[200px] h-14 text-lg border-surface hover:bg-surface/50"
                            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            How It Works
                        </Button>
                    </div>
                </motion.div>

                {/* Floating Icons */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.3, scale: 1 }} 
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute top-[15%] left-[10%] p-4 bg-slate-100 dark:bg-surface/50 rounded-2xl border border-slate-200 dark:border-white/5 rotate-[-12deg]"
                    >
                        <Code className="w-8 h-8 text-primary-500" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.3, scale: 1 }} 
                        transition={{ delay: 0.7, duration: 1 }}
                        className="absolute bottom-[20%] right-[10%] p-4 bg-slate-100 dark:bg-surface/50 rounded-2xl border border-slate-200 dark:border-white/5 rotate-[12deg]"
                    >
                        <Terminal className="w-8 h-8 text-primary-600 dark:text-primary-300" />
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 0.3, scale: 1 }} 
                        transition={{ delay: 0.9, duration: 1 }}
                        className="absolute top-[30%] right-[20%] p-3 bg-slate-100 dark:bg-surface/50 rounded-xl border border-slate-200 dark:border-white/5 rotate-[-6deg]"
                    >
                        <Cpu className="w-6 h-6 text-slate-900 dark:text-white" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LandingHero;
