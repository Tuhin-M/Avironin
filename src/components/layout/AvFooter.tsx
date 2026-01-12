"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import AvContainer from './AvContainer';
import { navigationLinks, contentTypes } from '@/content/config/navigation';
import { subscribeToNewsletter } from '@/lib/supabase/db';
import { Mail, ArrowRight, Twitter, Linkedin, Github } from 'lucide-react';

const AvFooter = () => {
    const [email, setEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [subscribeMessage, setSubscribeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubscribing(true);
        setSubscribeMessage(null);

        const success = await subscribeToNewsletter(email);
        setIsSubscribing(false);

        if (success) {
            setSubscribeMessage({ type: 'success', text: 'Subscribed!' });
            setEmail('');
        } else {
            setSubscribeMessage({ type: 'error', text: 'Failed to subscribe' });
        }
    };

    return (
        <footer className="bg-gradient-to-b from-charcoal to-slate-900 text-white">
            {/* Main Footer */}
            <div className="py-20 border-b border-white/5">
                <AvContainer>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                        {/* Brand */}
                        <div className="lg:col-span-2 space-y-6">
                            <Link href="/" className="inline-flex items-center space-x-3">
                                <Image 
                                    src="/AvironinLogo.jpg" 
                                    alt="Avironin" 
                                    width={44} 
                                    height={44} 
                                />
                                <div>
                                    <span className="block text-xl font-black tracking-tight">AVIRONIN</span>
                                    <span className="block text-[10px] font-bold text-azure tracking-[0.2em]">THE SIGNAL</span>
                                </div>
                            </Link>
                            <p className="text-gray-400 leading-relaxed max-w-sm">
                                Strategic intelligence for founders, builders, and technologists. 
                                Knowledge for execution, not consumption.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex items-center space-x-4">
                                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-azure/20 hover:text-azure transition-all">
                                    <Twitter size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-azure/20 hover:text-azure transition-all">
                                    <Linkedin size={18} />
                                </a>
                                <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-azure/20 hover:text-azure transition-all">
                                    <Github size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-azure">Navigate</h4>
                            <ul className="space-y-3">
                                {navigationLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center group">
                                            <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Content Types */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-azure">Content</h4>
                            <ul className="space-y-3">
                                {contentTypes.map((type) => (
                                    <li key={type.href}>
                                        <Link href={type.href} className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center group">
                                            <ArrowRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            {type.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-azure">Newsletter</h4>
                            <p className="text-gray-400 text-sm mb-4">
                                Subscribe to &ldquo;The Signal&rdquo; for weekly strategic intelligence.
                            </p>
                            <form onSubmit={handleSubscribe} className="space-y-3">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm outline-none focus:border-azure focus:bg-white/10 transition-all"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubscribing}
                                    className="w-full bg-azure text-white py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-azure/90 transition-colors disabled:opacity-50 flex items-center justify-center"
                                >
                                    {isSubscribing ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        'Subscribe'
                                    )}
                                </button>
                                {subscribeMessage && (
                                    <p className={`text-xs ${subscribeMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                        {subscribeMessage.text}
                                    </p>
                                )}
                            </form>
                        </div>
                    </div>
                </AvContainer>
            </div>

            {/* Bottom Bar */}
            <div className="py-6">
                <AvContainer>
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-xs font-medium">
                            © {new Date().getFullYear()} Avironin. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-6">
                            <Link href="/privacy" className="text-gray-500 hover:text-white text-xs font-medium transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="text-gray-500 hover:text-white text-xs font-medium transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </AvContainer>
            </div>
        </footer>
    );
};

export default AvFooter;
