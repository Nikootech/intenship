import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProgressBar from '../components/ui/ProgressBar';
import { StepSkeleton } from '../components/ui/Skeleton';
import { useMultiStep } from '../hooks/useMultiStep';
import { EnrollmentData, StudentProfile, InternshipDomain, PaymentDetails } from '../types/enrollment';
import { generateEnrollmentId, createEnrollment, uploadResume, supabase } from '../lib/db';
import { useNavigate } from 'react-router-dom';

// Lazy load steps for performance
const Step1Profile = lazy(() => import('../components/Steps/Step1Profile'));
const Step2Domain = lazy(() => import('../components/Steps/Step2Domain'));
const Step3Payment = lazy(() => import('../components/Steps/Step3Payment'));
const Step4Success = lazy(() => import('../components/Steps/Step4Success'));

// Component to handle chunk load errors
class LazyImportWithErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        if (error.name === 'ChunkLoadError' || error.message?.includes('Failed to fetch dynamically imported module') || error.message?.includes('Importing a module script failed')) {
            return { hasError: true };
        }
        return { hasError: false };
    }

    componentDidCatch(error: any) {
        if (error.name === 'ChunkLoadError' || error.message?.includes('Failed to fetch dynamically imported module') || error.message?.includes('Importing a module script failed')) {
            console.log('Chunk load error detected, reloading page...');
            window.location.reload();
        }
    }

    render() {
        if (this.state.hasError) {
            return <StepSkeleton />;
        }
        return this.props.children;
    }
}

export default function EnrollmentPage() {
    const { currentStep, nextStep, prevStep } = useMultiStep(4);
    const navigate = useNavigate();

    // Dynamic Meeting Logic
    const getNextMeetingDetails = () => {
        const now = new Date();
        const nextDate = new Date();

        if (now.getHours() >= 10) {
            nextDate.setDate(now.getDate() + 1);
        }

        const dateString = nextDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return {
            date: dateString,
            time: '10:00 AM (IST)',
            link: 'https://meet.google.com/abc-defg-hij',
        };
    };

    const meetingData = getNextMeetingDetails();
    const [enrollmentData, setEnrollmentData] = useState<EnrollmentData>({
        profile: {} as StudentProfile,
        domains: [],
        payment: null,
    });
    const [enrollmentId, setEnrollmentId] = useState<string>('');

    // Handle Step 1: Profile submission
    const handleProfileSubmit = (profile: StudentProfile) => {
        setEnrollmentData((prev) => ({ ...prev, profile }));
        nextStep();
    };

    // Handle Step 2: Domain selection
    const handleDomainSubmit = async (domains: InternshipDomain[]) => {
        setEnrollmentData((prev) => ({ ...prev, domains }));

        // If Role is Staff, skip payment and submit immediately
        if (enrollmentData.profile.role === 'staff') {
            try {
                const newEnrollmentId = generateEnrollmentId();
                setEnrollmentId(newEnrollmentId);

                // Upload resume if provided
                let resumeUrl: string | undefined;
                if (enrollmentData.profile.resumeFile) {
                    const { url } = await uploadResume(
                        enrollmentData.profile.resumeFile,
                        newEnrollmentId
                    );
                    resumeUrl = url;
                }

                await createEnrollment({
                    enrollment_id: newEnrollmentId,
                    role: 'staff',
                    name: enrollmentData.profile.name,
                    email: enrollmentData.profile.email,
                    phone: enrollmentData.profile.phone,
                    qualification: enrollmentData.profile.qualification,
                    college: enrollmentData.profile.college,
                    resume_url: resumeUrl,
                    domain: domains.map(d => d.title).join(', '),
                    amount: 0,
                    status: 'waiting_approval',
                });

                toast.success('Application submitted successfully!');
            } catch (error: any) {
                console.error('Staff enrollment error details:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code
                });
                toast.error(`Failed to submit application: ${error.message || 'Unknown error'}`);
                return; // Don't advance
            }
        }

        nextStep();
    };

    // Handle Step 3: Payment completion
    const handlePaymentSubmit = async (payment: PaymentDetails) => {
        try {
            // Generate enrollment ID
            const newEnrollmentId = generateEnrollmentId();
            setEnrollmentId(newEnrollmentId);

            // Upload resume if provided
            let resumeUrl: string | undefined;
            if (enrollmentData.profile.resumeFile) {
                const { url } = await uploadResume(
                    enrollmentData.profile.resumeFile,
                    newEnrollmentId
                );
                resumeUrl = url;
            }

            // Create enrollment record
            const totalAmount = enrollmentData.domains.reduce((sum, d) => sum + d.price, 0);
            await createEnrollment({
                enrollment_id: newEnrollmentId,
                role: 'student',
                name: enrollmentData.profile.name,
                email: enrollmentData.profile.email,
                phone: enrollmentData.profile.phone,
                qualification: enrollmentData.profile.qualification,
                college: enrollmentData.profile.college,
                resume_url: resumeUrl,
                domain: enrollmentData.domains.map(d => d.title).join(', '),
                razorpay_order_id: payment.orderId,
                razorpay_payment_id: payment.paymentId,
                razorpay_signature: payment.signature,
                amount: totalAmount,
                status: 'completed',
            });

            // Trigger Notification (SMS/WhatsApp)
            try {
                await supabase.functions.invoke('send-notification', {
                    body: {
                        phone: enrollmentData.profile.phone,
                        name: enrollmentData.profile.name,
                        meetingDetails: {
                            date: 'Coming Monday', // Standard start date
                            time: '10:00 AM',
                            link: 'https://meet.google.com/abc-defg-hij', // Default link
                        },
                        type: 'enrollment_confirmation'
                    }
                });
            } catch (e) {
                console.error("Notification trigger failed", e);
            }

            setEnrollmentData((prev) => ({ ...prev, payment }));
            toast.success('Enrollment completed successfully!');
            nextStep();
        } catch (error: any) {
            console.error('Enrollment error details:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
            toast.error(`Failed to complete enrollment: ${error.message || 'Unknown error'}`);
        }
    };

    // Scroll to top on step change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    // Detect offline status
    useEffect(() => {
        const handleOffline = () => {
            toast.error('You are offline. Please check your internet connection.');
        };

        const handleOnline = () => {
            toast.success('Connection restored!');
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#050202] text-slate-900 dark:text-white font-sans transition-colors duration-300">
             {/* Header */}
             <Header />
            
            {/* Hero Section */}
            <AnimatePresence>
                {currentStep === 1 && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Hero />
                    </motion.div>
                )}
            </AnimatePresence>

            <main id="enrollment-form" className="container mx-auto px-4 py-8 pb-16 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Sidebar / Progress (Desktop: Sticky Left, Mobile: Top) */}
                    {currentStep < (enrollmentData.profile.role === 'staff' ? 3 : 4) && (
                        <div className="lg:w-1/3 lg:flex-shrink-0">
                            <div className="lg:sticky lg:top-24">
                                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-surface/40 backdrop-blur-md border border-slate-200 dark:border-white/5">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Application Progress</h3>
                                    <p className="text-slate-600 dark:text-secondary-400 text-sm mb-6">Complete the steps below to secure your internship.</p>
                                    
                                    <ProgressBar
                                        currentStep={currentStep}
                                        totalSteps={enrollmentData.profile.role === 'staff' ? 3 : 4}
                                        seatsLeft={8}
                                        role={enrollmentData.profile.role}
                                    />
                                    
                                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/5 hidden lg:block">
                                        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-secondary-500">
                                            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                                            <span>Applications closing soon</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Form Content */}
                    <div className={`flex-1 ${currentStep < (enrollmentData.profile.role === 'staff' ? 3 : 4) ? '' : 'w-full'}`}>
                        <AnimatePresence mode="wait">
                            <Suspense fallback={<StepSkeleton />}>
                                <LazyImportWithErrorBoundary>
                                    {currentStep === 1 && (
                                        <Step1Profile
                                            key="step1"
                                            onNext={handleProfileSubmit}
                                            initialData={enrollmentData.profile}
                                        />
                                    )}

                                    {currentStep === 2 && (
                                        <Step2Domain
                                            key="step2"
                                            onNext={handleDomainSubmit}
                                            onBack={prevStep}
                                            initialData={enrollmentData.domains[0] || null}
                                            role={enrollmentData.profile.role}
                                        />
                                    )}

                                    {currentStep === 3 && enrollmentData.profile.role !== 'staff' && (
                                        <Step3Payment
                                            key="step3"
                                            onNext={handlePaymentSubmit}
                                            onBack={prevStep}
                                            profile={enrollmentData.profile}
                                            domains={enrollmentData.domains}
                                        />
                                    )}

                                    {(currentStep === 4 || (currentStep === 3 && enrollmentData.profile.role === 'staff')) && (
                                        <Step4Success
                                            key="step4"
                                            enrollmentId={enrollmentId}
                                            studentName={enrollmentData.profile.name}
                                            domain={enrollmentData.domains.map(d => d.title).join(', ')}
                                            role={enrollmentData.profile.role}
                                            meetingData={meetingData}
                                        />
                                    )}
                                </LazyImportWithErrorBoundary>
                            </Suspense>
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 dark:border-border py-8 bg-slate-50 dark:bg-surface transition-colors duration-300">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500 dark:text-secondary-500 text-sm font-medium">
                        © 2026 Mind Mesh Internship Program. All rights reserved.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
                        <button
                            onClick={() => navigate('/admin')}
                            className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                        >
                            Admin Access
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
