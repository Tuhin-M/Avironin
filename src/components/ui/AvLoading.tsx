import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * AvLoading Component
 * 
 * Reusable loading spinner.
 */
const AvLoading = ({
    size = 'md',
    className,
    label
}: {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    label?: string;
}) => {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
        xl: 'w-16 h-16 border-4',
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            <Loader2 className={cn("animate-spin text-azure", sizes[size])} />
            {label && <p className="text-sm font-medium text-gray-500">{label}</p>}
        </div>
    );
};

export default AvLoading;
