import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import MindMeshLogo from '../ui/MindMeshLogo';

const CertificateSection: React.FC = () => {
    return (
        <section className="py-24 bg-slate-50 dark:bg-surface/30 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: Text */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 text-primary-600 dark:text-primary-400 font-bold uppercase tracking-widest text-xs mb-6">
                            <Award className="w-4 h-4" />
                            <span>Authorized Certification</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                            Earn a Recognized <br />
                            <span className="text-primary-600 dark:text-primary-500">Dual-Certification</span>
                        </h2>
                        <p className="text-slate-600 dark:text-secondary-400 text-lg mb-8 leading-relaxed font-medium">
                            Upon successful completion of the internship, receive a prestigious certificate validated by <strong>MindMesh Work Hub, IIT Patna</strong>. Boost your resume with an industry-recognized credential.
                        </p>
                        
                        <div className="space-y-4">
                            {[
                                "Verified by IIT Patna Foundation",
                                "Unique Credential ID for LinkedIn",
                                "Lifetime Validity"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary-600/10 dark:bg-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-500">
                                        <ShieldCheck className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-slate-700 dark:text-white font-semibold">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Certificate visual */}
                    <div className="relative perspective-1000">
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-primary-600/10 dark:bg-primary-500/20 blur-[100px] rounded-full transform rotate-12" />

                        <motion.div 
                            initial={{ opacity: 0, rotateY: 30, scale: 0.9 }}
                            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 50 }}
                            className="relative bg-white text-black p-2 sm:p-4 rounded-[20px] shadow-2xl overflow-hidden w-full max-w-4xl mx-auto transform hover:scale-[1.02] transition-transform duration-500"
                        >
                            {/* Certificate Border Design */}
                            <div className="border-[3px] border-[#1e3a8a] h-full rounded-[15px] p-6 sm:p-8 relative overflow-hidden flex flex-col items-center text-center">
                                
                                {/* Corner Decorations */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-[#1e3a8a] rounded-tl-[12px]" />
                                <div className="absolute top-0 right-0 w-16 h-16 border-t-[3px] border-r-[3px] border-[#1e3a8a] rounded-tr-[12px]" />
                                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-[3px] border-l-[3px] border-[#1e3a8a] rounded-bl-[12px]" />
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-[#1e3a8a] rounded-br-[12px]" />

                                {/* Logos */}
                                <div className="flex justify-between items-center w-full mb-6 px-4">
                                     <div className="flex flex-col items-center">
                                        {/* Placeholder for Vishlesan Logo */}
                                        <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white font-bold text-[8px] text-center mb-1">
                                            IIT<br/>PATNA
                                        </div>
                                        <span className="text-[8px] font-bold text-[#1e3a8a] uppercase tracking-wide">MindMesh Work Hub</span>
                                    </div>

                                    {/* MindMesh Logo (Replaced Masai) */}                                    
                                    <div className="flex items-center">
                                        <MindMeshLogo variant="dark" className="h-10 md:h-12 w-auto object-contain" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-serif text-gray-500 mb-2">Detailed Certificate of Internship</h3>
                                <div className="w-12 h-0.5 bg-gray-300 mb-4" />

                                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-3">THIS IS TO CERTIFY THAT</p>
                                
                                <h2 className="text-2xl sm:text-4xl font-black text-[#1e3a8a] mb-4 font-serif uppercase tracking-wide">
                                    Student Name
                                </h2>

                                <p className="text-gray-600 text-sm max-w-sm mx-auto mb-1">
                                    has successfully completed the 15-day intensive internship program in
                                </p>
                                <p className="text-lg font-bold text-black mb-1">Full Stack Web Development</p>
                                <p className="text-xs text-gray-500 mb-6">
                                    offered by Mind Mesh in collaboration with MindMesh Work Hub, IIT Patna.
                                </p>

                                {/* Signature Block */}
                                <div className="grid grid-cols-2 gap-12 w-full mt-auto px-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-32 h-10 border-b border-gray-400 mb-2" />
                                        <p className="font-bold text-xs text-black">Deepika</p>
                                        <p className="text-[9px] text-gray-500">CEO, MindMesh Work Hub</p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                         <div className="w-32 h-10 border-b border-gray-400 mb-2" />
                                        <p className="font-bold text-xs text-black">Program Director</p>
                                        <p className="text-[9px] text-gray-500">Mind Mesh Academy</p>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CertificateSection;
