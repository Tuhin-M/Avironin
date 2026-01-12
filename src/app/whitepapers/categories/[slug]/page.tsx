"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import { getPostsByCategory, PostSummary } from "@/lib/supabase/db";
import { format } from "date-fns";
import Link from "next/link";
import { FileText, Clock, Calendar, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";

const categoryInfo: Record<string, { title: string; description: string }> = {
  'startup-strategy': {
    title: 'Startup Strategy',
    description: 'Comprehensive research on strategic planning and business development.'
  },
  'technology-engineering': {
    title: 'Technology Engineering',
    description: 'In-depth analysis of technical architectures and engineering best practices.'
  },
  'ai-future-systems': {
    title: 'AI & Future Systems',
    description: 'Research reports on artificial intelligence and emerging technologies.'
  },
};

export default function WhitepaperCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryMap: Record<string, string> = {
    'startup-strategy': 'STARTUP_STRATEGY',
    'technology-engineering': 'TECHNOLOGY',
    'ai-future-systems': 'AI_SYSTEMS',
  };

  useEffect(() => {
    async function fetchPosts() {
      setIsLoading(true);
      const categoryCode = categoryMap[slug] || slug.toUpperCase().replace('-', '_');
      const data = await getPostsByCategory(categoryCode);
      // Filter for whitepapers only
      const papers = data.filter(p => p.content_type === 'whitepaper');
      setPosts(papers);
      setIsLoading(false);
    }
    fetchPosts();
  }, [slug]);

  const info = categoryInfo[slug] || { title: slug, description: '' };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-500/10 via-white to-purple-500/5 pt-32 pb-16">
        <AvContainer>
          <Link href="/whitepapers" className="inline-flex items-center text-purple-600 font-medium mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-2" /> All White Papers
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <FileText size={14} />
              <span>White Paper Category</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-charcoal mb-6 leading-tight">
              {info.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {info.description}
            </p>
          </div>
        </AvContainer>
      </section>

      {/* Papers List */}
      <AvSection className="bg-white py-16">
        <AvContainer>
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-48 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">No white papers found in this category.</p>
              <Link href="/whitepapers" className="text-purple-600 font-medium hover:underline mt-4 inline-block">
                Browse all white papers →
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/whitepapers/${post.slug}`} className="group block">
                  <article className="bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/20 rounded-2xl p-8 hover:shadow-xl hover:border-purple-500/40 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="w-20 h-20 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FileText className="text-purple-600" size={32} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {formatDate(post.created_at)}
                          </span>
                          {post.read_time && (
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {post.read_time} min read
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-charcoal mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">
                          {post.summary}
                        </p>
                      </div>
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
