/**
 * AvSelect Component
 */
import { SelectHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { value: string; label: string }[];
}

const AvSelect = ({
    className,
    label,
    error,
    options,
    id,
    ...props
}: AvSelectProps) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 11)}`;

    return (
        <div className="space-y-2 w-full">
            {label && (
                <label htmlFor={selectId} className="block text-sm font-medium text-charcoal">
                    {label}
                    {props.required && <span className="text-coral ml-1">*</span>}
                </label>
            )}
            <select
                id={selectId}
                className={cn(
                    "w-full rounded-md border border-gray-300 px-4 py-2 bg-white transition-all outline-none focus:border-azure focus:ring-2 focus:ring-azure/20 appearance-none cursor-pointer",
                    error ? "border-red-500 focus:ring-red-500/20" : "",
                    className
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    );
};

export default AvSelect;
