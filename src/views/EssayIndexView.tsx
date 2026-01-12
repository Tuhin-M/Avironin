"use client";

import { useState, useEffect } from "react";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import { AvEssayCard } from "@/components/content/AvContentComponents";
import { categories } from "@/content/config/navigation";
import Link from "next/link";
import { getPublishedPosts, Post } from "@/lib/supabase/db";
import { format } from "date-fns";

/**
 * EssayIndexView Component
 * 
 * Displays an archive of intelligence essays fetched from Supabase.
 */
export default function EssayIndexView() {
    const [essays, setEssays] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchEssays() {
            setIsLoading(true);
            const posts = await getPublishedPosts();
            setEssays(posts);
            setIsLoading(false);
        }
        fetchEssays();
    }, []);

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return format(new Date(dateString), "MMM dd, yyyy").toUpperCase();
    };

    return (
        <div className="pt-20">
            <AvSection variant="hex" className="pb-16">
                <AvContainer>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-azure/20 pb-12">
                        <div className="max-w-2xl">
                            <h1 className="mb-4">Intelligence Archive</h1>
                            <p className="text-xl text-gray-600">Deep dives into the mechanics of the next generation.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.href}
                                    href={cat.href}
                                    className="px-4 py-2 bg-white border border-gray-200 rounded text-xs font-black uppercase tracking-widest hover:border-azure hover:text-azure transition-all"
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </AvContainer>
            </AvSection>

            <AvSection className="bg-white pt-0">
                <AvContainer>
                    {isLoading ? (
                        <div className="py-16 text-center text-gray-500">Loading intelligence...</div>
                    ) : essays.length === 0 ? (
                        <div className="py-16 text-center text-gray-500">No essays published yet.</div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {essays.map((essay) => (
                                <AvEssayCard
                                    key={essay.id}
                                    title={essay.title}
                                    summary={essay.summary}
                                    category={essay.category}
                                    author={{ name: essay.author?.name || "Avironin Research", avatar: essay.author?.avatar_url || "" }}
                                    date={formatDate(essay.created_at)}
                                    readTime={essay.read_time || 5}
                                    href={`/essays/${essay.slug}`}
                                    imageUrl={essay.image_url || ""}
                                />
                            ))}
                        </div>
                    )}
                </AvContainer>
            </AvSection>
        </div>
    );
}
