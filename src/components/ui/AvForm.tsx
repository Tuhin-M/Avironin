/**
 * AvForm Component
 * 
 * A wrapper component for forms with consistent spacing and layout.
 * Supports handling submission and displaying form headers.
 * 
 * @component
 * @example
 * ```tsx
 * <AvForm 
 *   title="Contact Us" 
 *   onSubmit={(data) => console.log(data)}
 * >
 *   <AvInput name="email" label="Email" />
 *   <AvButton type="submit">Send</AvButton>
 * </AvForm>
 * ```
 */

import { ReactNode, FormHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export interface AvFormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    title?: string;
    description?: string;
    footer?: ReactNode;
}

const AvForm = ({
    children,
    title,
    description,
    footer,
    className,
    ...props
}: AvFormProps) => {
    return (
        <form className={cn("space-y-6 w-full max-w-2xl mx-auto", className)} {...props}>
            {(title || description) && (
                <div className="space-y-2 mb-8 border-b border-gray-100 pb-6">
                    {title && <h2 className="text-2xl font-bold text-charcoal">{title}</h2>}
                    {description && <p className="text-gray-600 text-sm">{description}</p>}
                </div>
            )}

            <div className="space-y-4">
                {children}
            </div>

            {footer && (
                <div className="pt-6 border-t border-gray-100">
                    {footer}
                </div>
            )}
        </form>
    );
};

export default AvForm;
