import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AvBadge from '../ui/AvBadge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * AvEssayCard
 * 
 * Specialized card for essay listings.
 */
export const AvEssayCard = ({
    title,
    summary,
    category,
    author,
    date,
    readTime,
    href,
    imageUrl,
}: {
    title: string;
    summary: string;
    category: string;
    author: { name: string; avatar?: string };
    date: string;
    readTime: number;
    href: string;
    imageUrl?: string;
}) => {
    return (
        <article className="group grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-gray-100 last:border-0 items-center">
            <div className="md:col-span-8 space-y-4">
                <div className="flex items-center space-x-4">
                    <AvBadge variant="primary">{category.replace('-', ' ')}</AvBadge>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{date} • {readTime} min read</span>
                </div>

                <Link href={href}>
                    <h2 className="text-3xl font-black text-charcoal group-hover:text-azure transition-colors leading-tight">
                        {title}
                    </h2>
                </Link>

                <p className="text-gray-600 leading-relaxed line-clamp-2 max-w-2xl">
                    {summary}
                </p>

                <div className="flex items-center space-x-3 pt-2">
                    {author.avatar && (
                        <img src={author.avatar} alt={author.name} className="w-6 h-6 rounded-full grayscale" />
                    )}
                    <span className="text-xs font-black uppercase tracking-widest text-charcoal">{author.name}</span>
                </div>
            </div>

            {imageUrl && (
                <div className="md:col-span-4 aspect-video overflow-hidden rounded-lg bg-offwhite">
                    <Link href={href}>
                        <img
                            src={imageUrl}
                            alt={title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                        />
                    </Link>
                </div>
            )}
        </article>
    );
};

/**
 * AvAuthorCard
 */
export const AvAuthorCard = ({
    name,
    role,
    bio,
    avatarUrl,
}: {
    name: string;
    role: string;
    bio: string;
    avatarUrl?: string;
}) => {
    return (
        <div className="flex items-start space-x-6 py-12 px-8 bg-offwhite border border-gray-100 rounded-xl">
            <div className="shrink-0">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={name} className="w-full h-full object-cover grayscale" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-2xl">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
            </div>
            <div className="space-y-2">
                <div>
                    <h4 className="text-xl font-black text-charcoal leading-none mb-1">{name}</h4>
                    <span className="text-xs font-black text-azure uppercase tracking-widest">{role}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{bio}</p>
            </div>
        </div>
    );
};
