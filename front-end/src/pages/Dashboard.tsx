import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from '@tanstack/react-router';
import { MainLayout } from '../components/layout/MainLayout';
import { SummaryCard } from '../components/dashboard/SummaryCard';
import { TransactionItem } from '../components/dashboard/TransactionItem';
import { CategoryItem } from '../components/dashboard/CategoryItem';
import { NewTransactionModal } from '../components/dashboard/NewTransactionModal';
import { EditTransactionModal } from '../components/dashboard/EditTransactionModal';
import { Wallet, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { TRANSACTIONS_QUERY, CATEGORIES_QUERY } from '../graphql/queries';
import { DELETE_TRANSACTION_MUTATION } from '../graphql/mutations';
import type { Transaction, Category } from '../types/graphql';
import { getCategoryIcon, getCategoryColor } from '../lib/constants';

export function Dashboard() {
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: transactionsData, loading: loadingTransactions } = useQuery<{ transactions: Transaction[] }>(TRANSACTIONS_QUERY);
  const { data: categoriesData, loading: loadingCategories } = useQuery<{ categories: Category[] }>(CATEGORIES_QUERY);
  
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION_MUTATION, {
    refetchQueries: [{ query: TRANSACTIONS_QUERY }],
  });

  const transactions = transactionsData?.transactions || [];
  const categories = categoriesData?.categories || [];

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter((t) => {
    const date = new Date(t.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalIncome = monthlyTransactions
    .filter((t) => t.type === 'INCOME')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((t) => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpense;

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const categoryStats = categories.map((category) => {
    const categoryTransactions = transactions.filter(
      (t) => t.categoryId === category.id && t.type === 'EXPENSE'
    );
    return {
      ...category,
      count: categoryTransactions.length,
      total: categoryTransactions.reduce((sum, t) => sum + t.amount, 0),
    };
  }).sort((a, b) => b.total - a.total); 

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

  if (loadingTransactions || loadingCategories) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard 
            title="SALDO TOTAL" 
            amount={totalBalance} 
            icon={Wallet} 
            variant="total"
          />
          <SummaryCard 
            title="RECEITAS DO MÊS" 
            amount={totalIncome} 
            icon={TrendingUp} 
            trend="up"
          />
          <SummaryCard 
            title="DESPESAS DO MÊS" 
            amount={totalExpense} 
            icon={TrendingDown} 
            trend="down"
          />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <section className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Transações recentes</h2>
              <button 
                onClick={() => navigate({ to: '/transactions' })}
                className="text-sm font-medium text-brand-base hover:text-brand-dark flex items-center gap-1"
              >
                Ver todas <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-6 pt-2">
              {recentTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Nenhuma transação encontrada</p>
              ) : (
                recentTransactions.map((transaction) => {
                  const Icon = getCategoryIcon(transaction.category?.icon || undefined);
                  const colorObj = getCategoryColor(transaction.category?.color || undefined);
                  
                  return (
                    <TransactionItem
                      key={transaction.id}
                      title={transaction.description}
                      date={new Date(transaction.date).toLocaleDateString('pt-BR')}
                      amount={transaction.amount}
                      category={transaction.category?.title || 'Sem categoria'}
                      categoryColor={colorObj.name}
                      type={transaction.type === 'INCOME' ? 'income' : 'outcome'}
                      icon={Icon}
                      iconBgColor={`${colorObj.light} ${colorObj.text}`}
                      onEdit={() => handleEdit(transaction)}
                      onDelete={() => handleDelete(transaction)}
                    />
                  );
                })
              )}
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex justify-center">
               <NewTransactionModal />
            </div>
          </section>

          <section className="bg-white rounded-xl border border-gray-200 shadow-sm h-fit">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categorias</h2>
              <button 
                onClick={() => navigate({ to: '/categories' })}
                className="text-sm font-medium text-brand-base hover:text-brand-dark flex items-center gap-1"
              >
                Gerenciar <ChevronRight size={16} />
              </button>
            </div>
            <div className="p-6 space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar">
              {categoryStats.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Nenhuma categoria encontrada</p>
              ) : (
                categoryStats.map((category) => {
                  const colorObj = getCategoryColor(category.color || undefined);
                  return (
                    <CategoryItem 
                      key={category.id}
                      name={category.title} 
                      count={category.count} 
                      amount={category.total} 
                      color={colorObj.name} 
                    />
                  );
                })
              )}
            </div>
          </section>

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
