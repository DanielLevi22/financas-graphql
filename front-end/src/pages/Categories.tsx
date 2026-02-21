import { useQuery } from '@apollo/client/react';
import { MainLayout } from '../components/layout/MainLayout';
import { CategoryCard } from '../components/categories/CategoryCard';
import { NewCategoryModal } from '../components/categories/NewCategoryModal';
import { 
  Utensils,
  Tag,
  ArrowUpDown,
  AlertCircle
} from 'lucide-react';
import { CATEGORIES_QUERY, TRANSACTIONS_QUERY } from '../graphql/queries';
import type { Category, Transaction } from '../types/graphql';
import { getCategoryIcon, getCategoryColor } from '../lib/constants';

interface CategoriesData {
  categories: Category[];
}

interface TransactionsData {
  transactions: Transaction[];
}

export function Categories() {
  const { data: categoriesData, loading: loadingCategories, error: errorCategories } = useQuery<CategoriesData>(CATEGORIES_QUERY);
  const { data: transactionsData, loading: loadingTransactions } = useQuery<TransactionsData>(TRANSACTIONS_QUERY);

  const loading = loadingCategories || loadingTransactions;
  const error = errorCategories;

  const categories = categoriesData?.categories || [];
  const transactions = transactionsData?.transactions || [];

  const totalCategories = categories.length;
  const totalTransactions = transactions.length;

  const categoryCounts = transactions.reduce((acc, transaction) => {
    if (transaction.categoryId) {
      acc[transaction.categoryId] = (acc[transaction.categoryId] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const mostUsedCategory = categories.reduce((prev, current) => {
    const prevCount = categoryCounts[prev?.id || ''] || 0;
    const currentCount = categoryCounts[current.id] || 0;
    return (prevCount > currentCount) ? prev : current;
  }, undefined as Category | undefined);

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
                <p>Erro ao carregar categorias. Tente novamente.</p>
            </div>
        </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8">
        
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
            <NewCategoryModal />
        </div>
        <p className="text-gray-500 -mt-6">Organize suas transações por categorias</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <Tag size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{totalCategories}</h2>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total de Categorias</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-base">
                    <ArrowUpDown size={24} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">{totalTransactions}</h2>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total de Transações</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-light/20 flex items-center justify-center text-blue-base">
                    <Utensils size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{mostUsedCategory?.title || 'Nenhuma'}</h2>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria Mais Utilizada</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
                const Icon = getCategoryIcon(category.icon || undefined);
                const colorObj = getCategoryColor(category.color || undefined);
                const count = categoryCounts[category.id] || 0;
                
                return (
                  <CategoryCard
                      key={category.id}
                      category={category}
                      count={count}
                      icon={Icon}
                      iconBgColor={`${colorObj.light} ${colorObj.text}`}
                  />
                );
            })}
            
            {categories.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    <Tag className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                    <p className="text-lg font-medium">Nenhuma categoria encontrada</p>
                    <p className="text-sm">Crie sua primeira categoria para começar a organizar.</p>
                </div>
            )}
        </div>

      </div>
    </MainLayout>
  );
}
