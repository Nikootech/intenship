import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

const FinalCTA: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-white dark:bg-[#050202]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-900/10 dark:bg-primary-900/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <div className="max-w-4xl mx-auto bg-slate-50 dark:bg-surface/50 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -z-10" />
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-8">
                        <Sparkles className="w-4 h-4" />
                        Limited Seats Available
                    </div>
                    
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        Ready to Start Your <br />
                        <span className="text-primary-600 dark:text-primary-500">Journey?</span>
                    </h2>
                    
                    <p className="text-xl text-slate-600 dark:text-secondary-400 mb-10 max-w-2xl mx-auto font-medium">
                        Don't miss this opportunity to add real-world experience to your profile. Join 5000+ students who have already upskilled with us.
                    </p>

                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => navigate('/enroll')}
                        className="min-w-[240px] h-16 text-xl shadow-glow animate-pulse-slow hover:animate-none hover:scale-105 transition-all"
                    >
                        Enroll Now <ArrowRight className="ml-2 w-6 h-6" />
                    </Button>

                    <p className="mt-6 text-xs text-slate-400 dark:text-secondary-500 font-medium opacity-60">
                        * No credit card required for registration step
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FinalCTA;
