/**
 * AvCheckbox Component
 */
import { InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

const AvCheckbox = ({
    className,
    label,
    id,
    ...props
}: AvCheckboxProps) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 11)}`;

    return (
        <div className="flex items-start space-x-3">
            <input
                type="checkbox"
                id={checkboxId}
                className={cn(
                    "h-5 w-5 rounded border-gray-300 text-azure focus:ring-azure cursor-pointer transition-colors",
                    className
                )}
                {...props}
            />
            <label htmlFor={checkboxId} className="text-sm font-medium text-charcoal cursor-pointer leading-none pt-0.5">
                {label}
            </label>
        </div>
    );
};

export default AvCheckbox;
