import React from 'react';
import { ShieldCheck, Award, Users, Lock } from 'lucide-react';

const Trust: React.FC = () => {
    return (
        <section className="py-20 bg-slate-50 dark:bg-surface/20 border-y border-slate-200 dark:border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                     <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-primary-500/10 rounded-full text-primary-500">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1">100%</h4>
                        <p className="text-slate-600 dark:text-secondary-500 text-sm font-medium">Verified Certificates</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-blue-500/10 rounded-full text-blue-500">
                            <Users className="w-8 h-8" />
                        </div>
                        <h4 className="text-3xl font-black text-white mb-1">5000+</h4>
                        <p className="text-secondary-500 text-sm font-medium">Students Enrolled</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-purple-500/10 rounded-full text-purple-500">
                            <Award className="w-8 h-8" />
                        </div>
                        <h4 className="text-3xl font-black text-white mb-1">4.8/5</h4>
                        <p className="text-secondary-500 text-sm font-medium">Student Rating</p>
                    </div>

                    <div className="flex flex-col items-center text-center">
                        <div className="mb-4 p-3 bg-green-500/10 rounded-full text-green-500">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h4 className="text-3xl font-black text-white mb-1">Secure</h4>
                        <p className="text-secondary-500 text-sm font-medium">Razorpay Payments</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Trust;
