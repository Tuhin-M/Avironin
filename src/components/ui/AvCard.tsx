/**
 * AvCard Component
 * 
 * A versatile card component for displaying content in a contained format.
 * Used for essays, research papers, and featured content.
 * 
 * @component
 * @example
 * ```tsx
 * <AvCard 
 *   title="Essay Title"
 *   description="Essay description here"
 *   category="TECHNOLOGY"
 *   href="/essays/slug"
 * />
 * ```
 */

import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvCardProps {
    title: string;
    description: string;
    category?: 'STRATEGY' | 'TECHNOLOGY' | 'AI_SYSTEMS' | 'FRAMEWORKS' | 'RESEARCH' | 'STARTUP-STRATEGY' | 'TECHNOLOGY-ENGINEERING' | 'AI-FUTURE-SYSTEMS';
    href: string;
    imageUrl?: string;
    readTime?: number;
    date?: string;
    className?: string;
    isFeatured?: boolean;
}

const AvCard = ({
    title,
    description,
    category,
    href,
    imageUrl,
    readTime,
    date,
    className = '',
    isFeatured = false,
}: AvCardProps) => {
    const categoryColors: Record<string, string> = {
        'STRATEGY': 'bg-blue-100 text-blue-800',
        'TECHNOLOGY': 'bg-purple-100 text-purple-800',
        'AI_SYSTEMS': 'bg-green-100 text-green-800',
        'FRAMEWORKS': 'bg-yellow-100 text-yellow-800',
        'RESEARCH': 'bg-red-100 text-red-800',
        'STARTUP-STRATEGY': 'bg-blue-100 text-blue-800',
        'TECHNOLOGY-ENGINEERING': 'bg-purple-100 text-purple-800',
        'AI-FUTURE-SYSTEMS': 'bg-green-100 text-green-800',
    };

    return (
        <article className={cn(
            "group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg",
            isFeatured ? "border-2 border-azure" : "",
            className
        )}>
            <Link href={href} className="block h-full">
                {imageUrl && (
                    <div className="aspect-[16/9] overflow-hidden bg-gray-100">
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                        {category && (
                            <span className={cn(
                                "inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
                                categoryColors[category] || "bg-gray-100 text-gray-800"
                            )}>
                                {category.replace('-', ' ')}
                            </span>
                        )}

                        {(readTime || date) && (
                            <div className="flex items-center space-x-3 text-[12px] font-medium text-gray-500">
                                {readTime && (
                                    <span className="flex items-center">
                                        <span className="mr-1">⏱️</span> {readTime}m
                                    </span>
                                )}
                                {date && (
                                    <span className="flex items-center">
                                        <span className="mr-1">📅</span> {date}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-charcoal group-hover:text-azure transition-colors line-clamp-2">
                        {title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {description}
                    </p>

                    <div className="mt-auto flex items-center text-azure font-bold text-sm uppercase tracking-tight">
                        Read Essay
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default AvCard;
