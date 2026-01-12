/**
 * AvModal Component
 * 
 * A reusable modal dialog component with an overlay.
 * Handles closing on escape or clicking outside.
 * 
 * @component
 */

import { ReactNode, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
}

const AvModal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className
}: AvModalProps) => {
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-full m-4 h-full',
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className={cn(
                "relative w-full bg-white rounded-xl shadow-2xl overflow-hidden transition-all transform animate-in fade-in zoom-in duration-200",
                sizeClasses[size],
                className
            )}>
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    {title ? (
                        <h3 className="text-xl font-bold text-charcoal">{title}</h3>
                    ) : <div />}
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-azure hover:bg-azure/5 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AvModal;
