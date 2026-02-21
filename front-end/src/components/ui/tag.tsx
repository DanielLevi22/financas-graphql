import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const tagVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200/80",
        blue: "border-transparent bg-blue-light text-blue-dark hover:bg-blue-light/80",
        purple: "border-transparent bg-purple-light text-purple-dark hover:bg-purple-light/80",
        pink: "border-transparent bg-pink-light text-pink-dark hover:bg-pink-light/80",
        red: "border-transparent bg-red-light text-red-dark hover:bg-red-light/80",
        orange: "border-transparent bg-orange-light text-orange-dark hover:bg-orange-light/80",
        yellow: "border-transparent bg-yellow-light text-yellow-dark hover:bg-yellow-light/80",
        green: "border-transparent bg-green-light text-green-dark hover:bg-green-light/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagVariants> {}

function Tag({ className, variant, ...props }: TagProps) {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props} />
  );
}

export { Tag, tagVariants };
