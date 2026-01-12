/**
 * AvSection Component
 * 
 * Provides consistent vertical spacing for page sections.
 * Supports background variants and hexagonal pattern.
 */
import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AvSection = ({
    children,
    className,
    id,
    variant = 'none',
    hasPadding = true,
}: {
    children: ReactNode;
    className?: string;
    id?: string;
    variant?: 'none' | 'offwhite' | 'hex' | 'charcoal';
    hasPadding?: boolean;
}) => {
    const variants = {
        none: '',
        offwhite: 'bg-offwhite',
        hex: 'bg-offwhite hex-bg',
        charcoal: 'bg-charcoal text-white',
    };

    return (
        <section
            id={id}
            className={cn(
                hasPadding ? "py-16 md:py-24 lg:py-32" : "",
                variants[variant],
                className
            )}
        >
            {children}
        </section>
    );
};

export default AvSection;
