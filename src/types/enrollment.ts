export type InternshipDomainTitle =
    | 'Frontend Development'
    | 'Backend & Database';

export interface InternshipDomain {
    id: string;
    title: InternshipDomainTitle;
    subtitle: string;
    description: string;
    icon: string;
    features: string[];
    price: number;
    duration: string;
    subcourses?: string[];
    recommended?: boolean;
}

export const QUALIFICATIONS = [
    'High School (10th)',
    'Higher Secondary (12th)',
    'Diploma',
    'B.Tech / B.E.',
    'B.Sc / BCA',
    'M.Tech / M.E.',
    'M.Sc / MCA',
    'Other',
] as const;

export type Qualification = (typeof QUALIFICATIONS)[number];

export interface StudentProfile {
    role: 'student' | 'staff'; // Added Role
    name: string;
    email?: string;
    phone: string;
    qualification: string;
    college?: string;
    resumeFile?: File;
}

export interface PaymentDetails {
    orderId: string;
    paymentId: string;
    signature: string;
    amount?: number;
}

export interface EnrollmentData {
    profile: StudentProfile;
    domains: InternshipDomain[];
    payment: PaymentDetails | null;
}

// Supabase Database Types
export type Enrollment = {
    id: string;
    enrollment_id: string;
    role: 'student' | 'staff';
    name: string;
    email: string | null;
    phone: string | null;
    qualification: string | null;
    college: string | null;
    resume_filename: string | null;
    resume_url: string | null;
    domain: string; // Keep as string for DB, will be comma-separated or JSON
    domains: string[]; // Add actual array for frontend use if needed, but the DB schema might be strict
    razorpay_order_id: string | null;
    razorpay_payment_id: string | null;
    amount: number;
    status: 'pending' | 'paid' | 'verified' | 'rejected' | 'waiting_approval' | 'approved';
    approved_by?: string | null;
    approved_at?: string | null;
    meeting_link?: string | null;
    meeting_date?: string | null;
    meeting_time?: string | null;
    created_at: string;
    updated_at: string;
};

export type Domain = {
    name: string;
    description: string;
    price: number;
    seats_available: number;
};


export const INTERNSHIP_DOMAINS: InternshipDomain[] = [
    {
        id: 'frontend',
        title: 'Frontend Development',
        subtitle: 'Professional Web UI Training',
        description: 'Master the art of building modern, responsive user interfaces using the latest web technologies.',
        icon: 'Code',
        price: 2500,
        duration: '15 Days Live Training',
        recommended: true,
        features: [
            '100% Practical & Project Based',
            'Modern UI/UX Principles',
            'React & Tailwind Integration',
            'Lifetime Content Access',
            'Industry Level Code Review',
        ],
        subcourses: [
            'HTML5 & Semantic Web',
            'Modern CSS & Tailwind',
            'Interactive JavaScript',
            'Responsive Layouts',
            'UI Components',
        ],
    },
    {
        id: 'backend',
        title: 'Backend & Database',
        subtitle: 'Server-Side & Data Systems',
        description: 'Build robust, scalable server-side applications and master complex database management systems.',
        icon: 'Database',
        price: 3500,
        duration: '15 Days Live Training',
        features: [
            'Live Server Deployment',
            'Database Architecture',
            'API Security Basics',
            'Performance Optimization',
            'Node.js & SQL Mastery',
        ],
        subcourses: [
            'Node.js Fundamentals',
            'Express Framework',
            'PostgreSQL & SQL',
            'Restful API Design',
            'Data Security',
        ],
    },
];
