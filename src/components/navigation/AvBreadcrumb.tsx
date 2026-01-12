"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import AvContainer from '../layout/AvContainer';

const AvBreadcrumb = () => {
    const pathname = usePathname();
    const paths = pathname.split('/').filter(Boolean);

    if (paths.length === 0) return null;

    return (
        <nav className="py-4 border-b border-gray-100 bg-white/50">
            <AvContainer>
                <ol className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                    <li className="flex items-center">
                        <Link href="/" className="hover:text-azure transition-colors">
                            <Home size={12} className="mr-1" />
                        </Link>
                    </li>
                    {paths.map((path, index) => {
                        const href = `/${paths.slice(0, index + 1).join('/')}`;
                        const isLast = index === paths.length - 1;

                        return (
                            <li key={path} className="flex items-center">
                                <ChevronRight size={10} className="mx-2 text-gray-300" />
                                {isLast ? (
                                    <span className="text-charcoal">{path.replace(/-/g, ' ')}</span>
                                ) : (
                                    <Link href={href} className="hover:text-azure transition-colors">
                                        {path.replace(/-/g, ' ')}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </AvContainer>
        </nav>
    );
};

export default AvBreadcrumb;
