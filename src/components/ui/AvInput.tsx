/**
 * AvInput Component
 * 
 * A reusable input component with consistent styling and validation states.
 * Supports various input types and validation feedback.
 * 
 * @component
 * @example
 * ```tsx
 * <AvInput
 *   type="email"
 *   name="email"
 *   placeholder="Enter your email"
 *   error="Invalid email address"
 *   required
 * />
 * ```
 */

import { ReactNode, InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    success?: string;
    helperText?: string;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
}

const AvInput = ({
    className = '',
    label,
    error,
    success,
    helperText,
    leftElement,
    rightElement,
    id,
    ...props
}: AvInputProps) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`;
    const hasError = !!error;
    const hasSuccess = !!success && !hasError;

    return (
        <div className="space-y-2 w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-charcoal"
                >
                    {label}
                    {props.required && <span className="text-coral ml-1">*</span>}
                </label>
            )}

            <div className="relative">
                {leftElement && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftElement}
                    </div>
                )}

                <input
                    id={inputId}
                    className={cn(
                        "w-full rounded-md border px-4 py-2 transition-all outline-none",
                        leftElement ? 'pl-10' : '',
                        rightElement ? 'pr-10' : '',
                        hasError
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500/20'
                            : hasSuccess
                                ? 'border-green-500 focus:ring-2 focus:ring-green-500/20'
                                : 'border-gray-300 focus:border-azure focus:ring-2 focus:ring-azure/20',
                        "disabled:bg-gray-100 disabled:cursor-not-allowed",
                        className
                    )}
                    {...props}
                />

                {rightElement && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {rightElement}
                    </div>
                )}
            </div>

            {(error || success || helperText) && (
                <p className={cn(
                    "text-xs mt-1",
                    error ? 'text-red-600' :
                        success ? 'text-green-600' :
                            'text-gray-500'
                )}>
                    {error || success || helperText}
                </p>
            )}
        </div>
    );
};

export default AvInput;
