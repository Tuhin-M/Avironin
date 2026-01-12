import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * AvBadge Component
 * 
 * Reusable badge for categories, tags, and status indicators.
 */
const AvBadge = ({
    children,
    variant = 'neutral',
    className
}: {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' | 'accent';
    className?: string;
}) => {
    const variants = {
        primary: 'bg-azure/10 text-azure',
        secondary: 'bg-coral/10 text-coral',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        error: 'bg-red-100 text-red-700',
        neutral: 'bg-gray-100 text-gray-700',
        accent: 'bg-purple-100 text-purple-700',
    };

    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold tracking-tight uppercase",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};

export default AvBadge;
