/**
 * AvButton Component
 * 
 * A reusable button component with multiple variants and sizes.
 * Used throughout the Avironin application for consistent UI.
 * 
 * @component
 * @example
 * ```tsx
 * <AvButton 
 *   variant="primary"
 *   size="md"
 *   onClick={() => console.log('clicked')}
 * >
 *   Click Me
 * </AvButton>
 * ```
 */

import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-azure text-white hover:bg-azure/90',
        secondary: 'bg-charcoal text-white hover:bg-charcoal/90',
        outline: 'border border-azure text-azure hover:bg-azure/10',
        ghost: 'hover:bg-charcoal/10 text-charcoal',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 text-lg',
        xl: 'h-12 px-10 text-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface AvButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const AvButton = ({
  className,
  variant,
  size,
  children,
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: AvButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 animate-spin">⟳</span>
      )}
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default AvButton;
