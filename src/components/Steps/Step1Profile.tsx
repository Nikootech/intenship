import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, Building2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';
import Card from '../ui/Card';
import { studentProfileSchema, StudentProfileFormData } from '@/lib/validation';
import { StudentProfile, QUALIFICATIONS } from '@/types/enrollment';

interface Step1ProfileProps {
    onNext: (data: StudentProfile) => void;
    initialData?: StudentProfile;
}

const Step1Profile: React.FC<Step1ProfileProps> = ({ onNext, initialData }) => {
    const [resumeFile, setResumeFile] = useState<File | null>(
        initialData?.resumeFile || null
    );

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<StudentProfileFormData>({
        resolver: zodResolver(studentProfileSchema),
        defaultValues: {
            role: initialData?.role || 'student',
            name: initialData?.name || '',
            email: initialData?.email || '',
            phone: initialData?.phone || '',
            qualification: initialData?.qualification || '',
            college: initialData?.college || '',
        },
    });

    const onSubmit = (data: StudentProfileFormData) => {
        const sanitizedData = {
            ...data,
            name: DOMPurify.sanitize(data.name).trim(),
            college: data.college ? DOMPurify.sanitize(data.college).trim() : undefined,
            email: data.email ? DOMPurify.sanitize(data.email).trim() : undefined,
            phone: DOMPurify.sanitize(data.phone || '').trim(),
        };

        onNext({
            ...sanitizedData,
            resumeFile: data.resumeFile || undefined,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl mx-auto"
        >
            <div className="text-center mb-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex p-3 bg-primary-100 dark:bg-primary-500/20 rounded-2xl mb-4 border border-primary-200 dark:border-primary-500/20 shadow-glow"
                >
                    <User className="w-8 h-8 text-primary-600 dark:text-primary-500" />
                </motion.div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Student Profile</h2>
                <p className="text-slate-600 dark:text-secondary-400">
                    Enter your details to generate your internship application.
                </p>
            </div>

            <Card className="border-t-4 border-t-primary-500">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <Input
                        {...register('name')}
                        label="Full Name"
                        placeholder="e.g. Rahul Sharma"
                        icon={<User size={18} />}
                        error={errors.name?.message}
                        maxLength={100}
                    />

                    <Input
                        {...register('email')}
                        label="Email Address"
                        type="email"
                        placeholder="name@example.com"
                        icon={<Mail size={18} />}
                        error={errors.email?.message}
                    />

                    <Input
                        {...register('phone')}
                        label="Phone Number"
                        type="tel"
                        placeholder="9876543210"
                        icon={<Phone size={18} />}
                        error={errors.phone?.message}
                        maxLength={10}
                        showCounter
                        onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            target.value = target.value.replace(/\D/g, '');
                        }}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <Select
                            {...register('qualification')}
                            label="Qualification"
                            options={QUALIFICATIONS.map((q) => ({ value: q, label: q }))}
                            error={errors.qualification?.message}
                        />

                        <Select
                            {...register('role')}
                            label="Applying As"
                            options={[
                                { value: 'student', label: 'Student Intern' },
                                { value: 'staff', label: 'Staff Member' },
                            ]}
                            error={errors.role?.message}
                        />
                    </div>

                    <Input
                        {...register('college')}
                        label="College/University"
                        placeholder="Your institution name"
                        icon={<Building2 size={18} />}
                        error={errors.college?.message}
                        maxLength={200}
                    />

                    <div>
                        <label className="block mb-3 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-text-secondary">
                            Upload Resume
                        </label>
                        <FileUpload
                            onFileSelect={(file) => {
                                setResumeFile(file);
                                setValue('resumeFile', file || undefined);
                            }}
                            currentFile={resumeFile}
                        />
                        {errors.resumeFile && (
                            <p className="mt-2 text-xs text-red-400 font-medium">
                                {errors.resumeFile.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        isLoading={isSubmitting}
                        className="w-full sm:w-auto px-12"
                    >
                        Continue to Domain Selection
                    </Button>
                </form>
            </Card>
        </motion.div>
    );
};

export default Step1Profile;
