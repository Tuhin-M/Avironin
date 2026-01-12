"use client";

import { useState, useEffect } from "react";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import { getPublishedPosts, Post } from "@/lib/supabase/db";
import { format } from "date-fns";
import Link from "next/link";
import { FileText, Clock, Calendar, ArrowRight, Download, Search, BookOpen } from "lucide-react";

/**
 * WhitePapersIndexView Component
 * 
 * Displays all published white papers.
 */
export default function WhitePapersIndexView() {
    const [papers, setPapers] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchPapers() {
            setIsLoading(true);
            // TODO: When content_type is added to posts table, filter by 'whitepaper'
            const allPosts = await getPublishedPosts();
            // For now, show all posts as papers (in production, filter by content_type)
            setPapers(allPosts);
            setIsLoading(false);
        }
        fetchPapers();
    }, []);

    const filteredPapers = papers.filter(paper =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        return format(new Date(dateString), "MMM dd, yyyy");
    };

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-500/10 via-white to-purple-500/5 pt-32 pb-16">
                <AvContainer>
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <FileText size={14} />
                            <span>White Papers</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-charcoal mb-6 leading-tight">
                            In-Depth Research &<br />
                            <span className="text-purple-600">Strategic Frameworks</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Comprehensive research reports and data-driven analysis for strategic decision making in technology and business.
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
                                placeholder="Search white papers..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                            />
                        </div>
                    </div>

                    {/* Papers List */}
                    {isLoading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
                            ))}
                        </div>
                    ) : filteredPapers.length === 0 ? (
                        <div className="text-center py-20">
                            <FileText className="mx-auto text-gray-300 mb-4" size={64} />
                            <p className="text-gray-500 text-lg">No white papers found.</p>
                            <p className="text-gray-400 mt-2">Check back soon for new research!</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredPapers.map((paper) => (
                                <Link key={paper.id} href={`/whitepapers/${paper.slug}`} className="group block">
                                    <article className="bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/20 rounded-2xl p-8 hover:shadow-xl hover:border-purple-500/40 transition-all duration-300">
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                                            {/* Icon */}
                                            <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                                <FileText className="text-purple-600" size={32} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                    <span className="inline-flex items-center px-3 py-1 bg-purple-500/10 text-purple-600 rounded-full text-xs font-bold uppercase">
                                                        {paper.category.replace('_', ' ')}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <Calendar size={14} className="mr-1" />
                                                        {formatDate(paper.created_at)}
                                                    </span>
                                                    {paper.read_time && (
                                                        <span className="flex items-center">
                                                            <Clock size={14} className="mr-1" />
                                                            {paper.read_time} min read
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="text-2xl font-bold text-charcoal mb-2 group-hover:text-purple-600 transition-colors">
                                                    {paper.title}
                                                </h3>
                                                <p className="text-gray-600 line-clamp-2">
                                                    {paper.summary}
                                                </p>
                                            </div>

                                            {/* Action */}
                                            <div className="flex items-center space-x-4 flex-shrink-0">
                                                <span className="inline-flex items-center text-purple-600 font-bold text-sm uppercase tracking-widest">
                                                    <BookOpen size={16} className="mr-2" />
                                                    Read Paper
                                                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                                </span>
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
