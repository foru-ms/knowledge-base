import Sidebar from '@/components/Sidebar/index';
import { getCurrentUser } from '@/lib/auth';
import { forumsApi } from '@/lib/forumsApi';
import { notFound } from 'next/navigation';
import ThreadContent from './ThreadContent';

export async function generateMetadata({ params }) {
    const { id } = params;
    
    try {
        const { data } = await forumsApi.threads.fetchById(id);
        return {
            title: `${data?.title || 'Thread'} - Knowledge Base (KB)`,
        };
    } catch (error) {
        return {
            title: 'Thread - Knowledge Base (KB)',
        };
    }
}

export default async function ThreadPage({ params }) {
    const { id } = params;
    const forumUser = await getCurrentUser();
    
    // Fetch thread data
    let threadData = null;
    try {
        const { data } = await forumsApi.threads.fetchById(id);
        threadData = data;
    } catch (error) {
        console.error('Error fetching thread:', error);
        notFound();
    }
    
    // Fetch all data in parallel
    let threadPosts = [];
    let recentThreads = [];
    let recentPosts = [];

    try {
        const [threadPostsResponse, recentThreadsResponse, recentPostsResponse] = await Promise.all([
            forumsApi.threads.fetchPosts(id),
            forumsApi.threads.fetchAll(),
            forumsApi.posts.fetchAll(),
        ]);

        threadPosts = threadPostsResponse.data?.posts || [];
        recentThreads = recentThreadsResponse.data?.threads || [];
        recentPosts = recentPostsResponse.data?.posts || [];
    } catch (error) {
        console.error('Error fetching thread data:', error);
    }

    return (
        <div className="flex flex-no-wrap">
            <Sidebar data={forumUser} />
            <div className="w-full">
                <ThreadContent 
                    forumUser={forumUser}
                    threadData={threadData}
                    threadPosts={threadPosts}
                    recentThreads={recentThreads}
                    recentPosts={recentPosts}
                    threadId={id}
                />
            </div>
        </div>
    );
}
