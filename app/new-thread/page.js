'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '@/components/Sidebar/index';
import { clientApi } from '@/lib/clientApi';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Cookies from 'js-cookie';

function NewThreadForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isSubmitting, setSubmittingState] = useState(false);
    const [forumUser, setForumUser] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    // Check authentication and get initial title from query params
    useEffect(() => {
        const token = Cookies.get('forumUserToken');
        if (!token) {
            router.push('/login');
            return;
        }

        // Set initial title from query params
        const titleParam = searchParams.get('title');
        if (titleParam) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                title: titleParam,
            }));
        }

        // In a production app, you should validate the token and fetch user data
        // For this forum app, we'll extract the user ID from the JWT token or make an API call
        // For now, using a temporary approach - ideally call an API to validate token and get user
        setForumUser({ id: token }); // Using token as placeholder - the API will validate it
    }, [searchParams, router]);

    const onChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmittingState(true);

        if (!forumUser?.id) {
            toast.error('You must be logged in to create a thread.');
            setSubmittingState(false);
            return;
        }

        try {
            const data = await clientApi.threads.create(
                formData.title,
                formData.body,
                forumUser?.id
            );
            
            console.log('Thread created:', data);
            setSubmittingState(false);
            
            if (data?.id) {
                toast.success('Thread successfully created!');
                router.push(`/thread/${data.id}`);
            } else if (data?.message) {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error creating thread:', error);
            setSubmittingState(false);
            toast.error(error.message || 'An error occurred while creating the thread.');
        }
    };

    return (
        <div className="flex flex-row w-full">
            <div className="flex flex-col lg:w-full items-center justify-center mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Post a new thread
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            action="POST"
                            onSubmit={onSubmit}
                        >
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Title
                                </label>
                                <input
                                    onChange={onChange}
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    id="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Thread title"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="body"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Body
                                </label>
                                <textarea
                                    onChange={onChange}
                                    name="body"
                                    id="body"
                                    rows="7"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Thread body"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting}
                                className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-700"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit thread'}
                            </button>
                        </form>
                    </div>
                </div>

                <Link href="/" className="btn btn-outline btn-neutral btn-wide mt-5">
                    Back to the forums
                </Link>
            </div>
        </div>
    );
}

export default function NewThreadPage() {
    return (
        <div className="flex flex-no-wrap">
            <Sidebar data={null} />
            <Suspense fallback={<div className="w-full p-6">Loading...</div>}>
                <NewThreadForm />
            </Suspense>
        </div>
    );
}
