/**
 * AvContainer Component
 * 
 * Provides responsive horizontal spacing and maximum width constraints.
 */
import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const AvContainer = ({
    children,
    className,
    size = 'lg'
}: {
    children: ReactNode;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}) => {
    const sizes = {
        sm: 'max-w-3xl',
        md: 'max-w-5xl',
        lg: 'max-w-7xl',
        xl: 'max-w-[1440px]',
        full: 'max-w-full',
    };

    return (
        <div className={cn("mx-auto px-6 lg:px-12 w-full", sizes[size], className)}>
            {children}
        </div>
    );
};

export default AvContainer;
