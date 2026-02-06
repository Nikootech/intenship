import React from 'react';
import { motion } from 'framer-motion';

const techs = [
    { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', invert: true },
    { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Pandas', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', invert: true },
    { name: 'Jupyter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original-wordmark.svg', invert: true },
    { name: 'NumPy', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' }, // Using icon
    { name: 'Scikit-learn', url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg' }, // Manual fallback
    { name: 'PyTorch', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'OpenAI', url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg', invert: true }, // Manual fallback
];

const TechStack: React.FC = () => {
    return (
        <section className="py-24 bg-white dark:bg-[#050202] relative overflow-hidden">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                        Tools You'll Master
                    </h2>
                    <p className="text-slate-600 dark:text-secondary-400 max-w-2xl mx-auto text-lg font-medium">
                        Get hands-on experience with the industry standard stack used by top tech companies.
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-80">
                    {techs.map((tech, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            animate={{ y: [0, -10, 0] }}
                            whileHover={{ scale: 1.1, filter: "brightness(1.1)" }}
                            className="bg-slate-50 dark:bg-surface/50 border border-slate-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-center w-32 h-32 md:w-40 md:h-40 backdrop-blur-sm hover:border-primary-500/30 hover:shadow-glow transition-all group"
                        >
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ 
                                    duration: 3 + (idx % 3), 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: idx * 0.2
                                }}
                                className="w-full h-full flex items-center justify-center"
                            >
                                <img 
                                    src={tech.url} 
                                    alt={tech.name} 
                                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 drop-shadow-lg ${tech.invert ? 'dark:filter dark:brightness-0 dark:invert opacity-90' : 'opacity-90 group-hover:opacity-100 group-hover:drop-shadow-glow'}`}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
