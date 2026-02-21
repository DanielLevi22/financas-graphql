import { type LucideIcon, ArrowUpCircle, ArrowDownCircle, Trash2, Pencil } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Tag } from '../ui/tag';

interface TransactionItemProps {
  title: string;
  date: string;
  amount: number;
  category: string;
  categoryColor?: 'default' | 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
  type: 'income' | 'outcome';
  icon: LucideIcon;
  iconBgColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TransactionItem({ 
  title, 
  date, 
  amount, 
  category, 
  categoryColor = 'default',
  type, 
  icon: Icon,
  iconBgColor = 'bg-gray-100',
  onEdit,
  onDelete
}: TransactionItemProps) {
  
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Math.abs(amount));

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-lg group">
      <div className="flex items-center gap-4">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-gray-600", iconBgColor)}>
          <Icon size={20} />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <Tag variant={categoryColor} className="hidden sm:inline-flex">{category}</Tag>
        
        <div className="flex items-center gap-2 min-w-[100px] justify-end">
          <span className={cn(
            "text-sm font-semibold",
            type === 'income' ? "text-gray-900" : "text-gray-900" 
          )}>
            {type === 'income' ? '+' : '-'} {formattedAmount}
          </span>
          {type === 'income' ? (
             <ArrowUpCircle size={16} className="text-green-base" />
          ) : (
             <ArrowDownCircle size={16} className="text-red-base" />
          )}
        </div>

        {(onEdit || onDelete) && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {onDelete && (
                    <button 
                        onClick={onDelete}
                        className="p-1.5 text-danger hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
                {onEdit && (
                    <button 
                        onClick={onEdit}
                        className="p-1.5 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar"
                    >
                        <Pencil size={14} />
                    </button>
                )}
            </div>
        )}
      </div>
    </div>
  );
}
