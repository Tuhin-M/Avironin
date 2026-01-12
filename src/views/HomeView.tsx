import Link from "next/link";
import Image from "next/image";
import AvContainer from "@/components/layout/AvContainer";
import AvSection from "@/components/layout/AvSection";
import AvButton from "@/components/ui/AvButton";
import FeaturedPosts from "@/components/content/FeaturedPosts";
import { ArrowRight, BookOpen, FileText, Newspaper, Sparkles, Zap, Target } from "lucide-react";

/**
 * HomeView Component
 * 
 * The main landing page for Avironin.org.
 */
export default function HomeView() {
    return (
        <>
            {/* Hero Section - Modern Gradient */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-charcoal to-slate-800">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-20 w-96 h-96 bg-azure/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-coral/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-azure/5 rounded-full blur-3xl" />
                </div>
                
                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                <AvContainer className="relative z-10">
                    <div className="max-w-5xl">
                        <div className="inline-flex items-center space-x-2 bg-azure/20 backdrop-blur-sm border border-azure/30 text-azure px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Sparkles size={16} />
                            <span>Strategic Intelligence Platform</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.95] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                            Build the Future<br />
                            <span className="bg-gradient-to-r from-azure via-cyan-400 to-azure bg-clip-text text-transparent">
                                With Clarity.
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-700 delay-200">
                            Deep strategic intelligence for founders, builders, and technologists defining the next generation of companies. Essays, blogs, and white papers that cut through the noise.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-700 delay-300">
                            <Link href="/essays">
                                <AvButton size="xl" className="px-10 uppercase tracking-widest font-black bg-azure hover:bg-azure/90 text-white shadow-lg shadow-azure/30 hover:shadow-azure/50 transition-all">
                                    <BookOpen size={20} className="mr-2" />
                                    Read Essays
                                </AvButton>
                            </Link>
                            <Link href="/blogs">
                                <AvButton size="xl" variant="outline" className="px-10 uppercase tracking-widest font-black border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                                    <Newspaper size={20} className="mr-2" />
                                    Browse Blogs
                                </AvButton>
                            </Link>
                            <Link href="/whitepapers">
                                <AvButton size="xl" variant="outline" className="px-10 uppercase tracking-widest font-black border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all">
                                    <FileText size={20} className="mr-2" />
                                    White Papers
                                </AvButton>
                            </Link>
                        </div>
                    </div>
                </AvContainer>
                
                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
                        <div className="w-1 h-2 bg-white/50 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Content Types Section */}
            <AvSection className="bg-white py-24">
                <AvContainer>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Zap size={14} />
                            <span>Content Hub</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-charcoal mb-4">
                            Intelligence for Every Stage
                        </h2>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                            From quick insights to deep research, we provide the strategic clarity you need.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Essays Card */}
                        <Link href="/essays" className="group">
                            <div className="relative bg-gradient-to-br from-azure/5 to-azure/10 border border-azure/20 rounded-2xl p-8 h-full hover:border-azure/40 hover:shadow-xl hover:shadow-azure/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-azure/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BookOpen className="text-azure" size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-charcoal mb-3 group-hover:text-azure transition-colors">Essays</h3>
                                <p className="text-gray-600 mb-6">
                                    Deep strategic analysis on technology, business models, and market dynamics. Long-form intelligence for serious founders.
                                </p>
                                <div className="flex items-center text-azure font-bold text-sm uppercase tracking-widest">
                                    Explore Essays <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        {/* Blogs Card */}
                        <Link href="/blogs" className="group">
                            <div className="relative bg-gradient-to-br from-coral/5 to-coral/10 border border-coral/20 rounded-2xl p-8 h-full hover:border-coral/40 hover:shadow-xl hover:shadow-coral/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-coral/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Newspaper className="text-coral" size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-charcoal mb-3 group-hover:text-coral transition-colors">Blogs</h3>
                                <p className="text-gray-600 mb-6">
                                    Quick insights, industry updates, and tactical advice. Timely perspectives on what matters now.
                                </p>
                                <div className="flex items-center text-coral font-bold text-sm uppercase tracking-widest">
                                    Read Blogs <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>

                        {/* White Papers Card */}
                        <Link href="/whitepapers" className="group">
                            <div className="relative bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20 rounded-2xl p-8 h-full hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <FileText className="text-purple-600" size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-charcoal mb-3 group-hover:text-purple-600 transition-colors">White Papers</h3>
                                <p className="text-gray-600 mb-6">
                                    Comprehensive research reports and frameworks. Data-driven analysis for strategic decision making.
                                </p>
                                <div className="flex items-center text-purple-600 font-bold text-sm uppercase tracking-widest">
                                    View Papers <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </AvContainer>
            </AvSection>

            {/* Philosophy Section - Modernized */}
            <AvSection className="bg-gradient-to-b from-offwhite to-white py-24">
                <AvContainer>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                                <Target size={14} />
                                <span>Our Philosophy</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-charcoal leading-tight">
                                The Signal<br />
                                <span className="text-azure">in the Noise.</span>
                            </h2>
                            <div className="space-y-6 text-gray-600">
                                <p className="text-xl leading-relaxed">
                                    Startups die from a lack of clarity, not a lack of effort. In an era of exponential technological change, the founders who win are those who understand systems before they scale them.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    We don&apos;t chase hype cycles. We analyze the fundamental shifts in technology—from AI agents to decentralized systems—and map their impact on business models and value creation.
                                </p>
                            </div>
                            <blockquote className="border-l-4 border-azure pl-6 py-2">
                                <p className="text-xl font-bold text-charcoal italic">
                                    &ldquo;This is not content for consumption. This is intelligence for execution.&rdquo;
                                </p>
                            </blockquote>
                        </div>
                        
                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-azure/5 to-azure/20 rounded-3xl flex items-center justify-center p-12 border border-azure/20">
                                <Image 
                                    src="/AvironinLogo.svg" 
                                    alt="Avironin" 
                                    width={200} 
                                    height={200}
                                    className="opacity-90"
                                />
                            </div>
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-coral/20 rounded-2xl blur-xl" />
                            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-azure/20 rounded-2xl blur-xl" />
                        </div>
                    </div>
                </AvContainer>
            </AvSection>

            {/* Featured Content - Essays */}
            <AvSection className="bg-white py-24">
                <AvContainer>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-azure/10 text-azure px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                                <BookOpen size={14} />
                                <span>Featured Essays</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-charcoal">Recent Intelligence</h2>
                            <p className="text-gray-500 mt-2">The latest deep dives into technical business strategy.</p>
                        </div>
                        <Link href="/essays" className="inline-flex items-center space-x-2 text-azure font-bold uppercase tracking-widest text-sm hover:underline group">
                            <span>View All Essays</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <FeaturedPosts />
                </AvContainer>
            </AvSection>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-charcoal via-slate-800 to-charcoal py-24">
                <AvContainer>
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                            Ready to Build with Clarity?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join thousands of founders who rely on Avironin for strategic intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/essays">
                                <AvButton size="xl" className="px-12 uppercase tracking-widest font-black bg-azure hover:bg-azure/90 text-white">
                                    Start Reading
                                </AvButton>
                            </Link>
                            <Link href="/contact">
                                <AvButton size="xl" variant="outline" className="px-12 uppercase tracking-widest font-black border-white/30 text-white hover:bg-white/10">
                                    Contact Us
                                </AvButton>
                            </Link>
                        </div>
                    </div>
                </AvContainer>
            </section>
        </>
    );
}
