import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

const faqCategories = [
    {
        id: 'overview',
        label: 'Program Overview',
        questions: [
            {
                q: "What is the program duration?",
                a: "The internship is a 15-day intensive program designed to fit into your semester break or free time while delivering maximum value."
            },
            {
                q: "What topics and concepts are covered in the program?",
                a: "We cover Full Stack Web Development (React, Node.js), Python, AI/ML basics, and Deployment with Docker. It's a comprehensive tech stack overview."
            },
            {
                q: "What are the projects I will work on?",
                a: "You'll build a real-world portfolio project, such as an E-commerce Dashboard, AI Chatbot, or Task Management System."
            },
            {
                q: "Will I receive a certificate upon completion?",
                a: "Yes! You will receive a dual-certification from Mind Mesh and MindMesh Work Hub, IIT Patna."
            },
            {
                q: "What is the mode of delivery for the program?",
                a: "The program is delivered online via live interactive sessions and pre-recorded modules for self-paced learning."
            }
        ]
    },
    {
        id: 'eligibility',
        label: 'Eligibility & Admissions',
        questions: [
            {
                q: "Who is eligible to apply?",
                a: "Students from any engineering or science background (B.Tech, BCA, MCA, B.Sc) who are eager to learn can apply."
            },
            {
                q: "Is there an entrance exam?",
                a: "No, admissions are on a first-come, first-served basis. However, we have limited seats per batch."
            }
        ]
    },
    {
        id: 'fees',
        label: 'Fees',
        questions: [
            {
                q: "What is the program fee?",
                a: "The fee varies based on the scholarship and early-bird offers. Please check the enrollment page for the current pricing."
            },
            {
                q: "Is the fee refundable?",
                a: "Registration fees are non-refundable as they are used to reserve your seat and setup your learning environment."
            }
        ]
    },
    {
        id: 'schedule',
        label: 'Class Schedule',
        questions: [
            {
                q: "What are the class timings?",
                a: "Classes are usually held in the evenings (IST) to accommodate college schedules. Recordings are provided if you miss a live class."
            },
            {
                q: "How many hours per day?",
                a: "Expect to dedicate 2-3 hours per day for learning and practical implementation."
            }
        ]
    },
    {
        id: 'support',
        label: 'Student Support',
        questions: [
            {
                q: "Will I get mentor support?",
                a: "Yes, you will have access to a dedicated Discord community and mentors to resolve your doubts."
            }
        ]
    },
    {
        id: 'placement',
        label: 'Placement Assistance',
        questions: [
             {
                q: "Do you provide job guarantees?",
                a: "We provide career guidance, resume reviews, and mock interviews to prepare you for industry roles, but we do not guarantee a job."
            }
        ]
    }
];

const FAQ: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white dark:bg-[#050202] overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
                        FAQs
                    </h2>
                    <p className="text-slate-600 dark:text-secondary-400 text-lg">
                        Common questions about the internship program.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                    
                    {/* Left: Categories (Tabs) */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {faqCategories.map((category, idx) => {
                            const isActive = activeCategory === idx;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => {
                                        setActiveCategory(idx);
                                        setOpenIndex(0); // Reset accordion on category change
                                    }}
                                    className={`
                                        w-full text-left px-6 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group
                                        ${isActive 
                                            ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                                            : 'bg-slate-50 dark:bg-primary-500/5 text-slate-600 dark:text-secondary-400 hover:bg-slate-100 dark:hover:bg-primary-500/10 hover:text-slate-900 dark:hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="relative z-10">{category.label}</span>
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 -z-0"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: Accordion */}
                    <div className="lg:col-span-8 bg-slate-50 dark:bg-surface/30 border border-slate-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 min-h-[500px]">
                         <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                {faqCategories[activeCategory].questions.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="bg-white dark:bg-background/50 border border-slate-100 dark:border-white/5 rounded-2xl overflow-hidden hover:border-primary-500/20 transition-colors"
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                                        >
                                            <span className="font-bold text-slate-900 dark:text-white text-sm sm:text-base pr-4">{faq.q}</span>
                                            <ChevronDown 
                                                className={`w-5 h-5 flex-shrink-0 text-slate-400 dark:text-secondary-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-primary-600 dark:text-primary-500' : ''}`} 
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {openIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-5 pb-5 text-slate-600 dark:text-secondary-400 text-sm leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                                                        {faq.a}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>

                <div className="mt-16 text-center">
                    <p className="text-slate-500 dark:text-secondary-500 flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5 text-primary-600 dark:text-primary-500" />
                        Still have questions? <a href="mailto:support@mindmesh.co.in" className="text-slate-900 dark:text-white hover:underline decoration-primary-500 underline-offset-4 font-semibold">Contact Support</a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
