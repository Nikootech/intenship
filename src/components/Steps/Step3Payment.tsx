import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, CheckCircle2, Lock } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { loadRazorpay, createRazorpayOrder, openRazorpayCheckout, RazorpayResponse } from '@/lib/razorpay';
import { StudentProfile, InternshipDomain, PaymentDetails } from '@/types/enrollment';
import toast from 'react-hot-toast';

interface Step3PaymentProps {
    onNext: (payment: PaymentDetails) => void;
    onBack: () => void;
    profile: StudentProfile;
    domains: InternshipDomain[];
}

const Step3Payment: React.FC<Step3PaymentProps> = ({
    onNext,
    onBack,
    profile,
    domains,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);
    const totalAmount = domains.reduce((sum, d) => sum + d.price, 0);

    useEffect(() => {
        loadRazorpay().then((loaded) => {
            setRazorpayLoaded(loaded);
            if (!loaded) {
                toast.error('Failed to load payment gateway. Please refresh.', { duration: 5000 });
            }
        });
    }, []);

    const handlePayment = async () => {
        if (!razorpayLoaded) {
            toast.error('Gateway initializing... Please try again in a moment.');
            return;
        }

        if (totalAmount <= 0) {
            toast.error('Invalid amount.');
            return;
        }

        setIsLoading(true);

        try {
            const receipt = `ENRL-${Date.now()}`;
            const order = await createRazorpayOrder(totalAmount, receipt);

            openRazorpayCheckout(
                order,
                {
                    name: profile.name,
                    email: profile.email,
                    phone: profile.phone,
                },
                (response: RazorpayResponse) => {
                    const paymentDetails: PaymentDetails = {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    };
                    toast.success('Payment Verified! Welcome aboard.');
                    onNext(paymentDetails);
                },
                () => {
                    setIsLoading(false);
                    toast.error('Payment cancelled by user');
                }
            );
        } catch (error) {
            console.error('Payment error:', error);
            toast.error('Could not initialize payment. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-4xl mx-auto"
        >
            <div className="text-center mb-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex p-3 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4 border border-primary-200 dark:border-primary-500/20 shadow-glow"
                >
                    <CreditCard className="w-8 h-8 text-primary-600 dark:text-primary-500" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Final Step</h2>
                <p className="text-slate-600 dark:text-secondary-400 font-medium">
                    Secure your internship seat with a secure payment.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="space-y-6">
                    <Card className="h-full border-t-4 border-t-primary-500">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest border-b border-slate-200 dark:border-white/5 pb-4">Order Summary</h3>
                        
                        <div className="space-y-4 mb-6">
                            {domains.map(d => (
                                <div key={d.id} className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">{d.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-secondary-500">{d.subtitle}</p>
                                    </div>
                                    <p className="font-bold text-primary-600 dark:text-primary-400">₹{d.price}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center py-4 border-y border-slate-200 dark:border-white/10 mb-6">
                            <span className="text-slate-600 dark:text-secondary-400 font-medium">Total Amount</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white">₹{totalAmount}</span>
                        </div>

                        <div className="bg-slate-50 dark:bg-surface/50 rounded-lg p-4 mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-500 dark:text-secondary-500">Student</span>
                                <span className="text-slate-900 dark:text-white font-medium text-right">{profile.name}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-secondary-500">Email</span>
                                <span className="text-slate-900 dark:text-white font-medium text-right break-all ml-4">{profile.email}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Secure Checkout */}
                <div className="space-y-6">
                    <Card className="bg-gradient-to-b from-surface to-background relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6 text-green-400 bg-green-400/10 p-3 rounded-lg border border-green-400/20">
                                <Lock className="w-5 h-5" />
                                <span className="text-sm font-bold uppercase tracking-wider">256-Bit SSL Secured</span>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-secondary-400">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500" />
                                    <span>Instant access to Learning Dashboard</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-secondary-400">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500" />
                                    <span>Official Offer Letter</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-secondary-400">
                                    <CheckCircle2 className="w-4 h-4 text-primary-500" />
                                    <span>Lifetime Access to Content</span>
                                </div>
                            </div>

                            <Button 
                                variant="glow" 
                                size="md" 
                                className="w-full shadow-xl"
                                onClick={handlePayment}
                                isLoading={isLoading}
                                disabled={!razorpayLoaded}
                            >
                                <Lock className="w-5 h-5 mr-3" />
                                {isLoading ? 'Processing...' : `Pay ₹${totalAmount} Now`}
                            </Button>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-secondary-500 mb-2">Trusted by 5000+ Students</p>
                                <div className="flex justify-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                                    {/* Placeholder for payment icons if needed, using text for now or Lucide */}
                                    <div className="flex gap-4 justify-center">
                                        <div className="flex flex-col items-center">
                                            <CreditCard className="w-6 h-6 mb-1"/>
                                            <span className="text-[9px] uppercase">Cards</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <Shield className="w-6 h-6 mb-1"/>
                                            <span className="text-[9px] uppercase">UPI</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Button 
                        variant="ghost" 
                        size="md" 
                        onClick={onBack}
                        disabled={isLoading}
                        className="w-full text-slate-500 dark:text-secondary-500 hover:text-slate-900 dark:hover:text-white"
                    >
                        ← Back to Course Selection
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default Step3Payment;
