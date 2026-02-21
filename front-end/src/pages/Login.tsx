import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Logo from '../assets/Logo.svg';
import { useAuthStore } from '../stores/authStore';

export function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData);
      navigate({ to: '/dashboard' });
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <img src={Logo} alt="Financy Logo" className="h-8" />
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Fazer login</h1>
          <p className="text-gray-500 mt-2">Entre na sua conta para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <Input
            label="E-mail"
            type="email"
            placeholder="mail@exemplo.com"
            startIcon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite sua senha"
            startIcon={Lock}
            endIcon={showPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowPassword(!showPassword)}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300 text-brand-base focus:ring-brand-base"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Lembrar-me
              </label>
            </div>
            <Link to="." className="text-sm text-brand-base hover:text-brand-dark font-medium">
              Recuperar senha
            </Link>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Entrar
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">Ainda não tem uma conta?</p>
            <Link to="/register">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Criar conta
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
