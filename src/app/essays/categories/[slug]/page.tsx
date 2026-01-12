"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import { getPostsByCategory, Post } from "@/lib/supabase/db";
import { format } from "date-fns";
import Link from "next/link";
import { BookOpen, Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react";

const categoryInfo: Record<string, { title: string; description: string }> = {
  'startup-strategy': {
    title: 'Startup Strategy',
    description: 'Strategic intelligence for early-stage founders and scaling businesses.'
  },
  'technology-engineering': {
    title: 'Technology Engineering',
    description: 'Deep dives into technical architecture, engineering practices, and system design.'
  },
  'ai-future-systems': {
    title: 'AI & Future Systems',
    description: 'Analysis of artificial intelligence, autonomous systems, and emerging technologies.'
  },
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [posts, setPosts] = useState<Post[]>([]);
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
      // Filter for essays only
      const essays = data.filter(p => p.content_type === 'essay');
      setPosts(essays);
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
      <section className="bg-gradient-to-br from-azure/10 via-white to-azure/5 pt-32 pb-16">
        <AvContainer>
          <Link href="/essays" className="inline-flex items-center text-azure font-medium mb-6 hover:underline">
            <ArrowLeft size={16} className="mr-2" /> All Essays
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-azure/20 text-azure px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <BookOpen size={14} />
              <span>Category</span>
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

      {/* Posts Grid */}
      <AvSection className="bg-white py-16">
        <AvContainer>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-500 text-lg">No essays found in this category.</p>
              <Link href="/essays" className="text-azure font-medium hover:underline mt-4 inline-block">
                Browse all essays →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.id} href={`/essays/${post.slug}`} className="group">
                  <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-azure/30 transition-all duration-300 h-full">
                    {post.image_url && (
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(post.created_at)}
                        </span>
                        {post.read_time && (
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {post.read_time} min
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-charcoal mb-3 group-hover:text-azure transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.summary}
                      </p>
                      <div className="flex items-center text-azure font-bold text-sm uppercase tracking-widest">
                        Read Essay <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
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
