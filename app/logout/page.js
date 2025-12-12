'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        Cookies.remove('forumUserToken');
        router.push('/');
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Logging out...</p>
        </div>
    );
}
