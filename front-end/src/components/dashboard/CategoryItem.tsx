import { Tag } from '../ui/tag';

interface CategoryItemProps {
  name: string;
  count: number;
  amount: number;
  color: 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';
}

export function CategoryItem({ name, count, amount, color }: CategoryItemProps) {
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-lg">
      <div className="flex items-center gap-3">
        <Tag variant={color} className="text-xs px-3 py-1">{name}</Tag>
      </div>
      <div className="flex items-center gap-12">
        <span className="text-xs text-gray-500 w-16 text-right">{count} itens</span>
        <span className="text-sm font-semibold text-gray-900 min-w-[80px] text-right">{formattedAmount}</span>
      </div>
    </div>
  );
}
