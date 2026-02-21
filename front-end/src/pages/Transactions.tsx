import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { NewTransactionModal } from '../components/dashboard/NewTransactionModal';
import { EditTransactionModal } from '../components/dashboard/EditTransactionModal';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Tag } from '../components/ui/tag';
import { 
  Search, 
  Trash2, 
  Pencil, 
  ChevronLeft, 
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { TRANSACTIONS_QUERY, CATEGORIES_QUERY } from '../graphql/queries';
import { DELETE_TRANSACTION_MUTATION } from '../graphql/mutations';
import type { Transaction, Category } from '../types/graphql';
import { getCategoryIcon, getCategoryColor } from '../lib/constants';

interface TransactionsData {
  transactions: Transaction[];
}

interface CategoriesData {
  categories: Category[];
}

export function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  const [dateFilter, setDateFilter] = useState('todos'); 
  
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const { data: transactionsData, loading, error } = useQuery<TransactionsData>(TRANSACTIONS_QUERY);
  const { data: categoriesData } = useQuery<CategoriesData>(CATEGORIES_QUERY);
  
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    refetchQueries: [{ query: TRANSACTIONS_QUERY }],
  });

  const categories = categoriesData?.categories || [];
  const transactions = transactionsData?.transactions || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Math.abs(value));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    
    try {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR').format(date);
    } catch {
        return dateString;
    }
  };

  const handleDelete = async (transaction: Transaction) => {
    if (window.confirm(`Tem certeza que deseja excluir a transação "${transaction.description}"?`)) {
      try {
        await deleteTransaction({
          variables: { id: transaction.id },
        });
      } catch (error) {
        console.error('Error deleting transaction:', error);
        alert('Erro ao deletar transação.');
      }
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditOpen(true);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'todos' || 
                        (typeFilter === 'entrada' && transaction.type === 'INCOME') || 
                        (typeFilter === 'saida' && transaction.type === 'EXPENSE');
    const matchesCategory = categoryFilter === 'todas' || transaction.categoryId === categoryFilter;
    const matchesDate = true; 

    return matchesSearch && matchesType && matchesCategory && matchesDate;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <MainLayout>
         <div className="flex h-[50vh] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-base border-t-transparent" />
         </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
        <MainLayout>
            <div className="flex h-[50vh] flex-col items-center justify-center text-red-500 gap-2">
                <AlertCircle size={48} />
                <p>Erro ao carregar transações. Tente novamente.</p>
            </div>
        </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
            <NewTransactionModal />
        </div>
        <p className="text-gray-500 -mt-6">Gerencie todas as suas transações financeiras</p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Buscar</label>
              <Input 
                placeholder="Buscar por descrição" 
                startIcon={Search}
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Tipo</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="entrada">Entrada</SelectItem>
                  <SelectItem value="saida">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Categoria</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Período</label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedTransactions.length > 0 ? (
                    paginatedTransactions.map((transaction) => {
                    const Icon = getCategoryIcon(transaction.category?.icon || undefined);
                    const colorObj = getCategoryColor(transaction.category?.color || undefined);
                    
                    return (
                        <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                            <div className={cn("p-2.5 rounded-lg flex items-center justify-center", colorObj.light, colorObj.text)}>
                                <Icon size={20} />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{transaction.description}</span>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(transaction.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center">
                                <Tag variant={colorObj.name} className="px-3 py-1 text-xs">
                                {transaction.category?.title || 'Sem categoria'}
                                </Tag>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                            <div className="flex justify-center flex-col items-center gap-1">
                                <div className="flex items-center gap-1 text-sm font-medium">
                                {transaction.type === 'INCOME' ? (
                                        <div className="flex items-center gap-2 text-green-base bg-transparent">
                                            <ArrowUpCircle size={16} /> Entrada
                                        </div>
                                ) : (
                                        <div className="flex items-center gap-2 text-red-base bg-transparent">
                                            <ArrowDownCircle size={16} /> Saída
                                        </div>
                                )}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                            <span className="text-sm font-bold text-gray-900">
                            {transaction.type === 'INCOME' ? '+' : '-'} {formatCurrency(transaction.amount)}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-2">
                            <button 
                                onClick={() => handleDelete(transaction)}
                                className="h-8 w-8 flex items-center justify-center text-danger hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
                            >
                                <Trash2 size={16} />
                            </button>
                            <button 
                                onClick={() => handleEdit(transaction)}
                                className="h-8 w-8 flex items-center justify-center text-gray-800 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                            >
                                <Pencil size={16} />
                            </button>
                            </div>
                        </td>
                        </tr>
                    );
                    })
                ) : (
                    <tr>
                         <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                            <div className="flex flex-col items-center justify-center">
                                <Search className="h-10 w-10 text-gray-300 mb-2" />
                                <p className="text-lg font-medium">Nenhuma transação encontrada</p>
                                <p className="text-sm">Tente ajustar seus filtros ou crie uma nova transação.</p>
                            </div>
                         </td>
                    </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
                <span className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">{startIndex + 1} a {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}</span> | {filteredTransactions.length} resultados
                </span>
                <div className="flex items-center gap-2">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    <ChevronLeft size={16} />
                </Button>
                
                <span className="text-sm text-gray-600 px-2">
                    Página {currentPage} de {totalPages}
                </span>

                <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8" 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    <ChevronRight size={16} />
                </Button>
                </div>
            </div>
          )}
        </div>
      </div>

      {selectedTransaction && (
        <EditTransactionModal 
            transaction={selectedTransaction}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
        />
      )}
    </MainLayout>
  );
}
