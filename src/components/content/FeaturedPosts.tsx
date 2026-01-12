"use client";

import { useState, useEffect } from "react";
import AvCard from "@/components/ui/AvCard";
import { getFeaturedPosts, getPublishedPosts, PostSummary } from "@/lib/supabase/db";
import { format } from "date-fns";

/**
 * FeaturedPosts Component
 * 
 * Fetches and displays featured posts from Supabase.
 * Falls back to latest published posts if no featured posts exist.
 */
export default function FeaturedPosts() {
    const [posts, setPosts] = useState<PostSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            setIsLoading(true);
            let fetchedPosts = await getFeaturedPosts(3);
            
            // If no featured posts, fall back to latest published posts
            if (fetchedPosts.length === 0) {
                const allPosts = await getPublishedPosts();
                fetchedPosts = allPosts.slice(0, 3);
            }
            
            setPosts(fetchedPosts);
            setIsLoading(false);
        }
        fetchPosts();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return format(new Date(dateString), "MMM dd, yyyy").toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-xl h-64 animate-pulse" />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No intelligence published yet. Check back soon.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <AvCard
                    key={post.id}
                    title={post.title}
                    description={post.summary}
                    category={post.category as 'STRATEGY' | 'TECHNOLOGY' | 'AI_SYSTEMS' | 'FRAMEWORKS' | 'RESEARCH' | 'STARTUP-STRATEGY' | 'TECHNOLOGY-ENGINEERING' | 'AI-FUTURE-SYSTEMS'}
                    href={`/essays/${post.slug}`}
                    date={formatDate(post.created_at)}
                    readTime={post.read_time || 5}
                />
            ))}
        </div>
    );
}
