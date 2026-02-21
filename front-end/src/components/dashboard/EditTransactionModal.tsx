import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CATEGORIES_QUERY, TRANSACTIONS_QUERY } from '../../graphql/queries';
import { UPDATE_TRANSACTION_MUTATION } from '../../graphql/mutations';
import type { Category, Transaction, UpdateTransactionInput } from '../../types/graphql';

interface EditTransactionModalProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTransactionModal({ transaction, open, onOpenChange }: EditTransactionModalProps) {
  const [type, setType] = useState<'INCOME' | 'EXPENSE'>('EXPENSE');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    categoryId: '',
  });

  const { data: categoriesData, loading: loadingCategories, error: errorCategories } = useQuery<{ categories: Category[] }>(CATEGORIES_QUERY);
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION_MUTATION, {
    refetchQueries: [{ query: TRANSACTIONS_QUERY }],
  });

  const categories = categoriesData?.categories || [];

  if (errorCategories) {
    console.error("Categories query error (Edit):", errorCategories);
  }
  

  console.log("Categories loaded (Edit):", categories.length, categories);

  useEffect(() => {
    if (transaction) {
      setFormData({
        description: transaction.description,
        amount: transaction.amount.toString(),
        date: new Date(transaction.date).toISOString().split('T')[0],
        categoryId: transaction.categoryId || '',
      });
      setType(transaction.type as 'INCOME' | 'EXPENSE');
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const input: UpdateTransactionInput = {
        description: formData.description,
        amount: parseFloat(formData.amount),
        type,
        date: new Date(formData.date + 'T12:00:00Z').toISOString(),
        categoryId: formData.categoryId || undefined,
      };

      console.log("Updating transaction input:", input);

      await updateTransaction({
        variables: { 
          id: transaction.id,
          input 
        },
      });

      onOpenChange(false);
    } catch (error: any) {
      console.error('Error updating transaction:', error);
      const errorMessage = error.graphQLErrors?.[0]?.message || error.message || 'Erro desconhecido';
      alert(`Erro ao atualizar transação: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar transação</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da sua transação
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('EXPENSE')}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-lg border transition-all",
                  type === 'EXPENSE' 
                    ? "bg-red-50 border-red-200 text-red-base" 
                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                )}
              >
                <ArrowDownCircle size={18} />
                <span className="font-medium">Despesa</span>
              </button>
              <button
                type="button"
                onClick={() => setType('INCOME')}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-lg border transition-all",
                  type === 'INCOME' 
                    ? "bg-green-50 border-green-200 text-green-base" 
                    : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                )}
              >
                <ArrowUpCircle size={18} />
                <span className="font-medium">Receita</span>
              </button>
            </div>

            <div className="grid gap-2">
              <Input 
                label="Descrição" 
                placeholder="Ex. Almoço no restaurante"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Input 
                  label="Data" 
                  placeholder="Selecione"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Input 
                  label="Valor" 
                  placeholder="0.00" 
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">Categoria</label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })} disabled={loadingCategories}>
                <SelectTrigger>
                  <SelectValue placeholder={loadingCategories ? "Carregando..." : "Selecione uma categoria"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.title}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-gray-500 text-center">
                      {loadingCategories ? "Carregando..." : "Nenhuma categoria encontrada"}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

          </div>

          <DialogFooter>
            <Button 
              type="submit"
              className="w-full bg-green-base hover:bg-green-dark text-white"
              isLoading={isLoading}
            >
              Salvar alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
