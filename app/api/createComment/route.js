import { NextResponse } from 'next/server';
import { knowledgeBaseApi, ApiError } from '@/lib/forumsApi';
import { validatePost } from '@/lib/validation';

export async function POST(request) {
    try {
        const { body, articleId, userId } = await request.json();

        // Validate IDs (all are UUID strings)
        if (!userId || typeof userId !== 'string' || userId.trim().length === 0) {
            return NextResponse.json(
                { 
                    error: 'Validation failed',
                    message: 'Valid User ID is required',
                },
                { status: 400 }
            );
        }

        if (!articleId || typeof articleId !== 'string' || articleId.trim().length === 0) {
            return NextResponse.json(
                { 
                    error: 'Validation failed',
                    message: 'Valid Article ID is required',
                },
                { status: 400 }
            );
        }

        // Validate comment data
        const validation = validatePost(body);
        if (!validation.isValid) {
            return NextResponse.json(
                { 
                    error: 'Validation failed',
                    message: validation.errors.join(', '),
                },
                { status: 400 }
            );
        }

        const { data, status } = await knowledgeBaseApi.comments.create(
            validation.sanitized.body,
            articleId,
            userId
        );
        return NextResponse.json(data, { status });
    } catch (error) {
        if (error instanceof ApiError) {
            return NextResponse.json(
                { 
                    error: error.message,
                    ...error.data 
                },
                { status: error.status }
            );
        }
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
