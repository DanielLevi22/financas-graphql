import { useQuery, useMutation } from '@apollo/client/react';
import { useNavigate } from '@tanstack/react-router';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, Mail, LogOut, Loader2 } from 'lucide-react';
import { ME_QUERY } from '../graphql/queries';
import { UPDATE_USER_MUTATION } from '../graphql/mutations';
import { useAuthStore } from '../stores/authStore';
import type { User as UserType } from '../types/graphql';
import { useState, useEffect } from 'react';

export function Profile() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { data, loading } = useQuery<{ me: UserType }>(ME_QUERY);
  const [updateUser, { loading: updating }] = useMutation(UPDATE_USER_MUTATION, {
    refetchQueries: [{ query: ME_QUERY }],
  });

  const [name, setName] = useState('');

  useEffect(() => {
    if (data?.me) {
      setName(data.me.name);
    }
  }, [data]);

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      await updateUser({
        variables: {
          input: { name },
        },
      });
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
          <div className="text-gray-500">Carregando...</div>
        </div>
      </MainLayout>
    );
  }

  const user = data?.me;

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm w-full max-w-md">
          
          <div className="flex flex-col items-center mb-8">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-3xl font-medium mb-4">
              {user ? getInitials(user.name) : 'U'}
            </div>
            <h1 className="text-xl font-bold text-gray-900">{user?.name || 'Usuário'}</h1>
            <p className="text-gray-500">{user?.email || 'email@exemplo.com'}</p>
          </div>

          <div className="w-full border-t border-gray-100 mb-6"></div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Nome completo</label>
              <Input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                startIcon={User}
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <Input 
                defaultValue={user?.email || ''} 
                startIcon={Mail}
                disabled
                className="bg-gray-50 text-gray-500"
              />
              <p className="text-xs text-gray-400">O e-mail não pode ser alterado</p>
            </div>

            <Button 
              type="submit"
              disabled={updating || name === user?.name}
              className="w-full bg-green-base hover:bg-green-dark text-white h-11"
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar alterações'
              )}
            </Button>
          </form>

          <div className="mt-4">
             <Button 
               variant="outline" 
               className="w-full h-11 text-gray-700 hover:bg-red-50 hover:text-red-base hover:border-red-100 group"
               onClick={handleLogout}
             >
               <LogOut size={18} className="mr-2 group-hover:text-red-base" /> Sair da conta
             </Button>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}
