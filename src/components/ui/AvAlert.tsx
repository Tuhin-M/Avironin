import { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * AvAlert Component
 * 
 * Reusable alert for feedback and notifications.
 */
const AvAlert = ({
    children,
    variant = 'info',
    title,
    onClose,
    className
}: {
    children: ReactNode;
    variant?: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    onClose?: () => void;
    className?: string;
}) => {
    const variants = {
        info: { bg: 'bg-blue-50', text: 'text-blue-800', icon: Info, iconColor: 'text-blue-400' },
        success: { bg: 'bg-green-50', text: 'text-green-800', icon: CheckCircle2, iconColor: 'text-green-400' },
        warning: { bg: 'bg-yellow-50', text: 'text-yellow-800', icon: AlertCircle, iconColor: 'text-yellow-400' },
        error: { bg: 'bg-red-50', text: 'text-red-800', icon: AlertCircle, iconColor: 'text-red-400' },
    };

    const { bg, text, icon: Icon, iconColor } = variants[variant];

    return (
        <div className={cn("rounded-lg p-4 flex gap-3", bg, text, className)}>
            <Icon className={cn("shrink-0 w-5 h-5", iconColor)} />
            <div className="flex-1">
                {title && <h4 className="font-bold text-sm mb-1">{title}</h4>}
                <div className="text-sm opacity-90">{children}</div>
            </div>
            {onClose && (
                <button onClick={onClose} className="shrink-0 p-1 hover:bg-black/5 rounded">
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};

export default AvAlert;
