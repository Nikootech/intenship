import Header from '../components/Header';
import LandingHero from '../components/landing/LandingHero';
import HowItWorks from '../components/landing/HowItWorks';
import Domains from '../components/landing/Domains';
import Trust from '../components/landing/Trust';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import TechStack from '../components/landing/TechStack';
import CertificateSection from '../components/landing/CertificateSection';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050202] text-slate-900 dark:text-white font-sans selection:bg-primary-500/30">
            <Header />
            <main>
                <LandingHero />
                <Trust />
                <TechStack />
                <HowItWorks />
                <Domains />
                <CertificateSection />
                <FAQ />
                <FinalCTA />
            </main>
            
            <footer className="border-t border-slate-200 dark:border-white/5 py-12 bg-slate-50 dark:bg-black">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-slate-500 dark:text-secondary-500 text-sm font-medium mb-4">
                        © 2026 Mind Mesh Internship Program. All rights reserved.
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="#" className="text-slate-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-slate-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-white text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-slate-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-white text-sm transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
