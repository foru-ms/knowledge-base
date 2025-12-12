import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { getCurrentUser } from '@/lib/auth';
import Sidebar from '@/components/Sidebar/index';
import NewThreadForm from './NewThreadForm';

export const metadata = {
    title: 'New Thread - Demo Foru.ms',
    description: 'Create a new forum thread',
};

export default async function NewThreadPage({ searchParams }) {
    // Authenticate server-side to prevent race conditions with cookies
    const forumUser = await getCurrentUser();
    
    if (!forumUser) {
        redirect('/login');
    }

    const initialTitle = searchParams?.title || '';

    return (
        <div className="flex flex-no-wrap">
            <Sidebar data={forumUser} />
            <Suspense fallback={<div className="w-full p-6">Loading...</div>}>
                <NewThreadForm forumUser={forumUser} initialTitle={initialTitle} />
            </Suspense>
        </div>
    );
}
