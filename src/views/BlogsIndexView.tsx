"use client";

import { useState, useEffect } from "react";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import { getPublishedPosts, Post } from "@/lib/supabase/db";
import { format } from "date-fns";
import Link from "next/link";
import { Newspaper, Clock, Calendar, ArrowRight, Search, Filter } from "lucide-react";

/**
 * BlogsIndexView Component
 * 
 * Displays all published blog posts.
 */
export default function BlogsIndexView() {
    const [blogs, setBlogs] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchBlogs() {
            setIsLoading(true);
            // TODO: When content_type is added to posts table, filter by 'blog'
            const allPosts = await getPublishedPosts();
            // For now, show all posts as blogs (in production, filter by content_type)
            setBlogs(allPosts);
            setIsLoading(false);
        }
        fetchBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return format(new Date(dateString), "MMM dd, yyyy");
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-coral/10 via-white to-coral/5 pt-32 pb-16">
                <AvContainer>
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-coral/20 text-coral px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Newspaper size={14} />
                            <span>Blog</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-charcoal mb-6 leading-tight">
                            Quick Insights &<br />
                            <span className="text-coral">Industry Updates</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Timely perspectives on technology, startups, and market dynamics. Actionable insights for busy founders.
                        </p>
                    </div>
                </AvContainer>
            </section>

            {/* Search & Content */}
            <AvSection className="bg-white py-16">
                <AvContainer>
                    {/* Search Bar */}
                    <div className="max-w-xl mb-12">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search blog posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent text-lg"
                            />
                        </div>
                    </div>

                    {/* Blog Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-20">
                            <Newspaper className="mx-auto text-gray-300 mb-4" size={64} />
                            <p className="text-gray-500 text-lg">No blog posts found.</p>
                            <p className="text-gray-400 mt-2">Check back soon for new content!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog) => (
                                <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                                    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-coral/30 transition-all duration-300">
                                        {blog.image_url && (
                                            <div className="aspect-video bg-gray-100 overflow-hidden">
                                                <img
                                                    src={blog.image_url}
                                                    alt={blog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                                <span className="flex items-center">
                                                    <Calendar size={14} className="mr-1" />
                                                    {formatDate(blog.created_at)}
                                                </span>
                                                {blog.read_time && (
                                                    <span className="flex items-center">
                                                        <Clock size={14} className="mr-1" />
                                                        {blog.read_time} min
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-coral transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 line-clamp-3 mb-4">
                                                {blog.summary}
                                            </p>
                                            <div className="flex items-center text-coral font-bold text-sm uppercase tracking-widest">
                                                Read More <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    )}
                </AvContainer>
            </AvSection>
        </>
    );
}
