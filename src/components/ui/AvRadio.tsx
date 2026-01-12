/**
 * AvRadio Component
 */
import { InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvRadioProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const AvRadio = ({
    className,
    label,
    id,
    ...props
}: AvRadioProps) => {
    const radioId = id || `radio-${Math.random().toString(36).substring(2, 11)}`;

    return (
        <div className="flex items-center space-x-3">
            <input
                type="radio"
                id={radioId}
                className={cn(
                    "h-4 w-4 border-gray-300 text-azure focus:ring-azure cursor-pointer",
                    className
                )}
                {...props}
            />
            <label htmlFor={radioId} className="text-sm font-medium text-charcoal cursor-pointer">
                {label}
            </label>
        </div>
    );
};

export default AvRadio;
