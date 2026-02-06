import { useState, Suspense, lazy } from 'react';
import Header from '../components/Header';
import { StepSkeleton } from '../components/ui/Skeleton';
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = lazy(() => import('../components/AdminDashboard'));
const AdminLogin = lazy(() => import('../components/AdminLogin'));

export default function AdminPage() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleAdminLogin = ({ email, password }: { email: string; password: string }) => {
        // Mock authentication logic
        const adminEmail = 'admin@mindmesh.com';
        const adminPassword = 'admin123';

        if (email === adminEmail && password === adminPassword) {
            setIsAdminAuthenticated(true);
            toast.success('Access Granted. Welcome back, Admin.');
        } else {
            toast.error('Invalid credentials. Access Denied.');
        }
    };

    if (!isAdminAuthenticated) {
        return (
            <div className="min-h-screen bg-secondary-50">
                <Header />
                <Suspense fallback={<StepSkeleton />}>
                    <AdminLogin
                        onLogin={(credentials) => handleAdminLogin(credentials)}
                        onBack={() => navigate('/')}
                    />
                </Suspense>
                <Toaster position="top-center" />
            </div>
        );
    }

    return (
        <Suspense fallback={<StepSkeleton />}>
            <AdminDashboard onBack={() => {
                navigate('/');
                setIsAdminAuthenticated(false);
            }} />
        </Suspense>
    );
}
