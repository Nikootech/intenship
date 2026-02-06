import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Bot, Shield, Smartphone, PenTool } from 'lucide-react';

const domains = [
    {
        icon: Globe,
        title: "Web Development",
        desc: "Master React, Node.js, and Modern UI/UX",
        color: "text-cyan-400"
    },
    {
        icon: Bot,
        title: "AI & Machine Learning",
        desc: "Build Neural Networks and AI Models",
        color: "text-purple-400"
    },
    {
        icon: Server,
        title: "Data Science",
        desc: "Analyze big data and derive insights",
        color: "text-emerald-400"
    },
    {
        icon: Shield,
        title: "Cyber Security",
        desc: "Ethical hacking and network defense",
        color: "text-red-400"
    },
    {
        icon: Smartphone,
        title: "App Development",
        desc: "Build Flutter and React Native apps",
        color: "text-blue-400"
    },
    {
        icon: PenTool,
        title: "UI/UX Design",
        desc: "Design stunning interfaces and experiences",
        color: "text-pink-400"
    }
];

const Domains: React.FC = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#050202] relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-background to-background pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary-600 dark:text-primary-500 font-bold tracking-widest uppercase text-xs mb-2 block">Available Tracks</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                        Choose Your Domain
                    </h2>
                    <p className="text-slate-600 dark:text-secondary-400 max-w-2xl mx-auto">
                        We offer specialized internship tracks in the most high-demand fields of technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {domains.map((domain, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-slate-50 dark:bg-surface/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 p-6 rounded-2xl hover:border-primary-500/30 hover:bg-slate-100 dark:hover:bg-surface transition-all group cursor-default"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-xl bg-slate-200 dark:bg-white/5 ${domain.color} group-hover:scale-110 transition-transform`}>
                                    <domain.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/20 group-hover:text-primary-600 dark:group-hover:text-primary-500 transition-colors">Track {idx + 1}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                {domain.title}
                            </h3>
                            <p className="text-slate-500 dark:text-secondary-500 text-sm font-medium">
                                {domain.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Domains;
