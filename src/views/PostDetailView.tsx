"use client";

import { useEffect, useState } from "react";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import AvButton from "@/components/ui/AvButton";
import AvBadge from "@/components/ui/AvBadge";
import { AvAuthorCard } from "@/components/content/AvContentComponents";
import Link from "next/link";
import { getPostBySlug, Post } from "@/lib/supabase/db";
import { format } from "date-fns";
import { BookOpen, Newspaper, FileText, ArrowLeft, Clock, Calendar } from "lucide-react";

interface PostDetailViewProps {
  slug: string;
  type: 'essay' | 'blog' | 'whitepaper';
}

const typeConfig = {
  essay: {
    backLink: '/essays',
    backLabel: 'Back to Essays',
    color: 'azure',
    icon: BookOpen,
    label: 'Strategic Intelligence'
  },
  blog: {
    backLink: '/blogs',
    backLabel: 'Back to Blogs',
    color: 'coral',
    icon: Newspaper,
    label: 'Blog Post'
  },
  whitepaper: {
    backLink: '/whitepapers',
    backLabel: 'Back to White Papers',
    color: 'purple-600',
    icon: FileText,
    label: 'White Paper'
  }
};

export default function PostDetailView({ slug, type }: PostDetailViewProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      setIsLoading(true);
      const data = await getPostBySlug(slug);
      setPost(data);
      setIsLoading(false);
    }
    fetchPost();
  }, [slug]);

  const config = typeConfig[type];
  const Icon = config.icon;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className={`w-8 h-8 border-4 border-${config.color} border-t-transparent rounded-full animate-spin`} 
             style={{ borderColor: type === 'whitepaper' ? '#9333EA' : undefined, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!post) {
    return (
      <AvContainer className="py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-500 mb-8">The content you are looking for does not exist.</p>
        <Link href={config.backLink} className={`text-${config.color} font-bold hover:underline`}>
          {config.backLabel}
        </Link>
      </AvContainer>
    );
  }

  return (
    <article className="pt-20">
      {/* Header */}
      <AvSection variant={type === 'whitepaper' ? 'hex' : 'none'} className="pb-24 relative overflow-hidden">
         {/* Background Decoration based on type */}
         <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none transform translate-x-1/2 -translate-y-1/2">
            <Icon size={400} />
         </div>

        <AvContainer size="md" className="relative z-10">
          <div className="space-y-8">
            <Link 
              href={config.backLink} 
              className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] hover:opacity-80 transition-opacity"
              style={{ color: type === 'essay' ? '#0090B8' : type === 'blog' ? '#E56B56' : '#9333EA' }}
            >
              <ArrowLeft size={12} className="mr-2" />
              {config.backLabel}
            </Link>
            
            <div className="space-y-6">
              <AvBadge variant={type === 'essay' ? 'primary' : type === 'blog' ? 'secondary' : 'accent'}>
                {post.category.replace('_', ' ')}
              </AvBadge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-charcoal leading-[1.05]">
                {post.title}
              </h1>
              
              {post.summary && (
                <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-serif italic">
                  {post.summary}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Published</span>
                  <span className="text-sm font-bold text-charcoal">
                    {post.created_at ? format(new Date(post.created_at), 'MMMM dd, yyyy') : '-'}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Icon size={16} className="text-gray-400" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Format</span>
                  <span className="text-sm font-bold text-charcoal">{config.label}</span>
                </div>
              </div>

              {post.read_time && (
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Read Time</span>
                    <span className="text-sm font-bold text-charcoal">{post.read_time} Min</span>
                  </div>
                </div>
              )}

              {/* PDF Download Button for White Papers */}
              {type === 'whitepaper' && post.pdf_url && (
                 <a 
                   href={post.pdf_url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                 >
                   <FileText size={20} />
                   <span>Read White Paper</span>
                 </a>
              )}
            </div>
          </div>
        </AvContainer>
      </AvSection>

      {/* Content */}
      <AvSection className="bg-white pt-0 -mt-12">
        <AvContainer size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 lg:col-start-3 space-y-12">
              {/* Main Text */}
              <div 
                className="prose prose-lg prose-headings:font-black prose-headings:text-charcoal prose-p:text-gray-700 prose-p:font-serif prose-p:leading-relaxed prose-a:text-azure hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Author */}
              <div className="pt-16 border-t border-gray-100">
                <AvAuthorCard 
                  name={post.author?.name || "Avironin Research"} 
                  role={post.author?.role || "Editorial Team"}
                  avatarUrl={post.author?.avatar_url || ""}
                  bio={post.author?.bio || "Strategic insights from the Avironin team."}
                />
              </div>

              {/* CTA */}
              <div className="bg-charcoal text-white p-10 md:p-12 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">Subscribe to {config.label}s</h3>
                  <p className="text-gray-400">Get the latest insights delivered directly to your inbox.</p>
                </div>
                <AvButton variant="primary" size="lg" className="px-8 whitespace-nowrap">
                  Subscribe Now
                </AvButton>
              </div>
            </div>
          </div>
        </AvContainer>
      </AvSection>
    </article>
  );
}
