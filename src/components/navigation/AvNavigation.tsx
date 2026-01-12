"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { navigationLinks } from '@/content/config/navigation';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AvNavigation = ({ isMobile = false, onClose }: { isMobile?: boolean; onClose?: () => void }) => {
    const pathname = usePathname();

    return (
        <nav className={cn(
            isMobile ? "flex flex-col space-y-6" : "hidden md:flex items-center space-x-10"
        )}>
            {navigationLinks.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                        "text-sm font-bold tracking-widest uppercase transition-colors hover:text-azure",
                        pathname === link.href ? "text-azure" : "text-charcoal",
                        isMobile ? "text-2xl py-2 border-b border-gray-100 w-full" : ""
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
};

export default AvNavigation;
