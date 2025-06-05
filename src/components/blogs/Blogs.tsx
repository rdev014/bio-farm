import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface Author {
    name: string;
    image: string;
}

interface SEO {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
}

interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: Author;
    featuredImage: string;
    categories: string[];
    tags: string[];
    readTime: number;
    publishedAt: string;
    updatedAt: string;
    status: string;
    seo: SEO;
}

interface BlogProps {
    blogs: BlogPost[];

}
// Format date for display
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

// Calculate time ago
const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const publishDate = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return formatDate(dateString);
};
export default function Blogs({ blogs }: BlogProps) {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            {blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((post) => (
                        <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-green-200 transition-all duration-300 group">
                            <Link href={`/blogs/${post.slug}`}>
                                <div className="relative h-48 overflow-hidden">
                                    <Image
                                        src={post.featuredImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-black/50 backdrop-blur-sm rounded-full">
                                            {post.readTime} min read
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {post.tags.slice(0, 2).map(tag => (
                                            <span
                                                key={tag}
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full  text-green-600 bg-green-50
                                                    }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors leading-tight">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Image
                                                src={post.author.image}
                                                alt={post.author.name}
                                                width={32}
                                                height={32}
                                                className="rounded-full mr-3"
                                            />
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                                                <p className="text-xs text-gray-500">{getTimeAgo(post.publishedAt)}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                                            <span className="text-sm font-medium mr-1">Read More</span>
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            ) : (
                /* No Results Found */
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.077-2.33" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        We couldn&apos;t find any articles matching your search criteria. Try adjusting your filters or search terms.
                    </p>

                </div>
            )}
        </section>
    )
}
