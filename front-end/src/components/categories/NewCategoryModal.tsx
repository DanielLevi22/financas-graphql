import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '../ui/dialog';
import { 
  Plus, 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { CATEGORIES_QUERY } from '../../graphql/queries';
import { CREATE_CATEGORY_MUTATION } from '../../graphql/mutations';
import type { CreateCategoryInput } from '../../types/graphql';
import { CATEGORY_COLORS, CATEGORY_ICONS } from '../../lib/constants';

export function NewCategoryModal() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'briefcase',
    color: 'green' as typeof CATEGORY_COLORS[number]['name'],
  });

  const [createCategory] = useMutation(CREATE_CATEGORY_MUTATION, {
    refetchQueries: [{ query: CATEGORIES_QUERY }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const input: CreateCategoryInput = {
        title: formData.title,
        description: formData.description || undefined,
        icon: formData.icon,
        color: formData.color,
      };

      await createCategory({
        variables: { input },
      });


      setFormData({
        title: '',
        description: '',
        icon: 'briefcase',
        color: 'green',
      });
      setOpen(false);
    } catch (error) {
      console.error('Error creating category:', error);
      alert('Erro ao criar categoria. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-base hover:bg-green-dark text-white">
           <Plus size={16} className="mr-2" /> Nova categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
          <DialogDescription>
            Organize suas transações com categorias
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 py-4">
            
            <div className="grid gap-2">
              <Input 
                label="Título" 
                placeholder="Ex. Alimentação"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="grid gap-2">
              <Input 
                label="Descrição" 
                placeholder="Descrição da categoria"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Ícone</label>
              <div className="grid grid-cols-6 gap-2">
                  {CATEGORY_ICONS.map(({ icon: Icon, name }) => (
                      <button
                          key={name}
                          onClick={() => setFormData({ ...formData, icon: name })}
                          type="button"
                          className={cn(
                              "h-11 w-full rounded-lg flex items-center justify-center border transition-all text-gray-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-base",
                              formData.icon === name ? "border-brand-base bg-brand-light/20 text-brand-base ring-1 ring-brand-base" : "border-gray-200"
                          )}
                      >
                          <Icon size={20} />
                      </button>
                  ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Cor</label>
              <div className="grid grid-cols-7 gap-2">
                  {CATEGORY_COLORS.map((color) => (
                      <button
                          key={color.name}
                          onClick={() => setFormData({ ...formData, color: color.name })}
                          type="button"
                          className={cn(
                              "h-9 w-full rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400",
                              color.bg,
                              formData.color === color.name ? "ring-2 ring-offset-2 ring-gray-900 shadow-md scale-105" : "hover:scale-105"
                          )}
                          aria-label={`Select ${color.name}`}
                      />
                  ))}
              </div>
            </div>

          </div>

          <DialogFooter className="pt-2">
            <Button 
              type="submit"
              className="w-full bg-green-base hover:bg-green-dark text-white h-11"
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
