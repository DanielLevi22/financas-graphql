import { useState } from 'react';
import { type LucideIcon, Trash2, Pencil } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { cn } from '../../lib/utils';
import { Tag } from '../ui/tag';
import { EditCategoryModal } from './EditCategoryModal';
import { CATEGORIES_QUERY } from '../../graphql/queries';
import { DELETE_CATEGORY_MUTATION } from '../../graphql/mutations';
import type { Category } from '../../types/graphql';

interface CategoryCardProps {
  category: Category;
  count: number;
  icon: LucideIcon;
  iconBgColor: string;
}

export function CategoryCard({
  category,
  count,
  icon: Icon,
  iconBgColor,
}: CategoryCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deleteCategory] = useMutation(DELETE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${category.title}"?`)) {
      try {
        await deleteCategory({
          variables: { id: category.id },
        });
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Erro ao deletar categoria. Verifique se não há transações associadas.');
      }
    }
  };

  const color = (category.color || 'gray') as 'blue' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'green';

  return (
    <>
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
        
        <div className="flex justify-between items-start mb-4">
          <div className={cn("h-12 w-12 rounded-lg flex items-center justify-center text-gray-700", iconBgColor)}>
              <Icon size={24} />
          </div>
          <div className="flex gap-2">
              <button 
                onClick={handleDelete}
                className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-red-base hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                title="Excluir categoria"
              >
                  <Trash2 size={16} />
              </button>
              <button 
                onClick={() => setIsEditOpen(true)}
                className="h-8 w-8 flex items-center justify-center text-gray-400 hover:text-brand-base hover:bg-brand-light/20 rounded-lg transition-colors border border-gray-200"
                title="Editar categoria"
              >
                  <Pencil size={16} />
              </button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{category.title}</h3>
          <p className="text-sm text-gray-500 line-clamp-2">{category.description || 'Sem descrição'}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <Tag variant={color} className="px-3 py-1 text-xs">{category.title}</Tag>
          <span className="text-sm text-gray-500 font-medium">{count} transações</span>
        </div>

      </div>

      <EditCategoryModal 
        category={category}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
      />
    </>
  );
}
