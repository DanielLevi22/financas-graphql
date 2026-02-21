import * as React from 'react';
import { cn } from '../../lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
  onEndIconClick?: () => void;
  icon?: LucideIcon;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, helperText, error, startIcon, endIcon, onEndIconClick, icon, disabled, ...props }, ref) => {
    const StartIcon = startIcon || icon;
    const EndIcon = endIcon;

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className={cn(
            "text-sm font-medium",
            error ? "text-danger" : disabled ? "text-gray-400" : "text-gray-700"
          )}>
            {label}
          </label>
        )}
        <div className="relative">
          {StartIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <StartIcon size={20} />
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-base focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200",
              StartIcon && "pl-10",
              EndIcon && "pr-10",
              error && "border-danger focus-visible:ring-danger text-danger placeholder:text-danger/50",
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          {EndIcon && (
            <div 
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400",
                onEndIconClick && "cursor-pointer hover:text-gray-600"
              )}
              onClick={onEndIconClick}
            >
              <EndIcon size={20} />
            </div>
          )}
        </div>
        {helperText && (
          <span className={cn(
            "text-xs",
            error ? "text-danger" : "text-gray-500"
          )}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
