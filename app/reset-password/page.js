'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { clientApi } from '@/lib/clientApi';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [submittingState, setSubmittingState] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        token: '',
    });

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setFormData((prev) => ({ ...prev, token: tokenParam }));
        }
    }, [searchParams]);

    const onChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmittingState(true);

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            setSubmittingState(false);
            return;
        }

        try {
            const data = await clientApi.auth.resetPassword(
                formData.email,
                formData.password,
                formData.token
            );

            if (data?.message) {
                toast.success(data.message || 'Password reset successful!');
                router.push('/login');
            }
            setSubmittingState(false);
        } catch (error) {
            console.error('Error resetting password:', error);
            setSubmittingState(false);
            toast.error(error.message || 'An error occurred while resetting password.');
        }
    };

    return (
        <div className="flex flex-row w-full">
            <Sidebar data={null} />
            <div className="flex flex-col lg:w-full items-center justify-center mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h3 className="mb-5 text-gray-900 font-medium text-xl">Reset Password</h3>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={onChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="token"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Reset Token
                                </label>
                                <input
                                    type="text"
                                    name="token"
                                    id="token"
                                    value={formData.token}
                                    onChange={onChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your reset token"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={onChange}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-gray-800 text-sm text-white rounded hover:bg-gray-600 transition duration-150 ease-in-out py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
                                disabled={submittingState}
                                aria-busy={submittingState}
                            >
                                {submittingState ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
