import Sidebar from '@/components/Sidebar/index';
import { getCurrentUser } from '@/lib/auth';
import { forumsApi } from '@/lib/forumsApi';
import HomeContent from './HomeContent';

export const metadata = {
    title: 'Knowledge Base',
    description: 'A comprehensive knowledge base for documentation and articles',
};

export default async function HomePage({ searchParams }) {
    const page = searchParams?.page || 1;
    const forumUser = await getCurrentUser();

    // Fetch articles and comments
    let articles = [];
    let comments = [];
    let nextArticleCursor = null;

    try {
        const [articlesResponse, commentsResponse] = await Promise.all([
            forumsApi.articles.fetchAll(page),
            forumsApi.comments.fetchAll(),
        ]);

        articles = articlesResponse.data?.threads || [];
        comments = commentsResponse.data?.posts || [];
        nextArticleCursor = articlesResponse.data?.nextThreadCursor || null;
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return (
        <div className="flex flex-no-wrap">
            <Sidebar data={forumUser} />
            <div className="w-full" id="main-content" role="main">
                <HomeContent 
                    forumUser={forumUser} 
                    initialArticles={articles}
                    comments={comments}
                    currentPage={parseInt(page, 10)}
                    nextArticleCursor={nextArticleCursor}
                />
            </div>
        </div>
    );
}
