/**
 * AvTextarea Component
 */
import { ReactNode, TextareaHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const AvTextarea = ({
    className,
    label,
    error,
    helperText,
    id,
    ...props
}: AvTextareaProps) => {
    const textareaId = id || `textarea-${Math.random().toString(36).substring(2, 11)}`;

    return (
        <div className="space-y-2 w-full">
            {label && (
                <label htmlFor={textareaId} className="block text-sm font-medium text-charcoal">
                    {label}
                    {props.required && <span className="text-coral ml-1">*</span>}
                </label>
            )}
            <textarea
                id={textareaId}
                className={cn(
                    "w-full rounded-md border border-gray-300 px-4 py-2 transition-all outline-none focus:border-azure focus:ring-2 focus:ring-azure/20 min-h-[120px] resize-y",
                    error ? "border-red-500 focus:ring-red-500/20" : "",
                    className
                )}
                {...props}
            />
            {(error || helperText) && (
                <p className={cn("text-xs", error ? "text-red-600" : "text-gray-500")}>
                    {error || helperText}
                </p>
            )}
        </div>
    );
};

export default AvTextarea;
