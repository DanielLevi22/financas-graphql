import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';

const transactionTypeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-4 py-1 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        income: "border-green-light bg-green-light/30 text-green-base",
        outcome: "border-red-light bg-red-light/30 text-red-base",
      },
    },
    defaultVariants: {
      variant: "income",
    },
  }
);

export interface TransactionTypeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof transactionTypeVariants> {
    variant: "income" | "outcome";
}

function TransactionType({ className, variant, ...props }: TransactionTypeProps) {
  const Icon = variant === 'income' ? ArrowUpCircle : ArrowDownCircle;
  const label = variant === 'income' ? 'Entrada' : 'Saída';

  return (
    <div className={cn(transactionTypeVariants({ variant }), className)} {...props}>
        <Icon size={16} />
        {label}
    </div>
  );
}

export { TransactionType, transactionTypeVariants };
