import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import EnrollmentPage from './pages/EnrollmentPage';
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                 <Toaster
                    position="top-center"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#1e293b',
                            color: '#fff',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: '500',
                        },
                        success: {
                            iconTheme: {
                                primary: '#0ea5e9',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/enroll" element={<EnrollmentPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
