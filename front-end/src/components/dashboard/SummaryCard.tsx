import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  variant?: 'default' | 'total';
  trend?: 'up' | 'down';
}

export function SummaryCard({ title, amount, icon: Icon, variant = 'default', trend }: SummaryCardProps) {
  const isTotal = variant === 'total';
  
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <div className={cn(
      "rounded-xl p-6 border transition-shadow hover:shadow-sm",
      isTotal ? "bg-white border-gray-200" : "bg-white border-gray-200"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <div className={cn(
          "p-1.5 rounded-full",
          isTotal ? "bg-purple-light text-purple-base" : 
          trend === 'up' ? "bg-green-light text-green-base" : "bg-red-light text-red-base"
        )}>
           <Icon size={16} />
        </div>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{title}</span>
      </div>
      <div className="flex items-end justify-between">
         <h3 className="text-2xl font-bold text-gray-900">{formattedAmount}</h3>
      </div>
    </div>
  );
}
