import { NextResponse } from 'next/server';
import connectDb from '@/lib/db';
import { Blog } from '@/models/blogSchema';




export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query.trim()) {
        return NextResponse.json([]);
    }

    try {
        await connectDb();
        const results = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
            ],
        }).lean();

        return NextResponse.json(
            results.map((result) => ({
                id: (result._id as { toString: () => string })?.toString(),
                title: result.title,
                content: result.content,
                url: `/blogs/${result.slug}`,
                category: result.category,
            }))
        );
    } catch (error) {
        console.error('Search error:', error);
        return NextResponse.json([], { status: 500 });
    }
}