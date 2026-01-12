"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AvContainer from '../layout/AvContainer';
import AvNavigation from '../navigation/AvNavigation';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AvHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
            isScrolled 
                ? "bg-white/80 backdrop-blur-xl py-3 shadow-lg shadow-black/5 border-b border-gray-100/50" 
                : "bg-gradient-to-b from-white/90 to-transparent py-6"
        )}>
            <AvContainer>
                <div className="flex items-center justify-between">
                    <Link href="/" className="group flex items-center">
                        <div className="bg-white rounded-lg p-2 shadow-sm">
                            <Image 
                                src="/AvironinLogoBig.jpg" 
                                alt="Avironin" 
                                width={isScrolled ? 120 : 140} 
                                height={isScrolled ? 40 : 45} 
                                className="object-contain" // basic contain, width controlled by prop
                                style={{ width: 'auto', height: 'auto' }} // Fix aspect ratio warning
                                priority
                            />
                        </div>
                    </Link>

                    <AvNavigation />

                    <div className="flex items-center space-x-4 md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-charcoal hover:text-azure transition-colors rounded-lg hover:bg-azure/10"
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </AvContainer>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 top-[72px] bg-white/95 backdrop-blur-xl z-50 transform transition-all duration-500 md:hidden",
                isMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
            )}>
                <AvContainer className="py-12">
                    <AvNavigation isMobile onClose={() => setIsMenuOpen(false)} />
                </AvContainer>
            </div>
        </header>
    );
};

export default AvHeader;
