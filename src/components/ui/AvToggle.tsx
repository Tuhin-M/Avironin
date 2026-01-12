/**
 * AvToggle Component
 */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvToggleProps {
    isChecked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
    disabled?: boolean;
}

const AvToggle = ({
    isChecked,
    onChange,
    label,
    className,
    disabled = false,
}: AvToggleProps) => {
    return (
        <div className={cn("flex items-center space-x-3", className)}>
            <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                disabled={disabled}
                onClick={() => !disabled && onChange(!isChecked)}
                className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    isChecked ? "bg-azure" : "bg-gray-200"
                )}
            >
                <span
                    className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        isChecked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
            {label && <span className="text-sm font-medium text-charcoal">{label}</span>}
        </div>
    );
};

export default AvToggle;
