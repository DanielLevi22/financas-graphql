import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { User, Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import Logo from '../assets/Logo.svg';
import { useAuthStore } from '../stores/authStore';

export function Register() {
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await register(formData);
      navigate({ to: '/dashboard' });
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta. Tente novamente.');
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
          <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>
          <p className="text-gray-500 mt-2">Comece a controlar suas finanças ainda hoje</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <Input
            label="Nome completo"
            type="text"
            placeholder="Seu nome completo"
            startIcon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

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
            helperText="A senha deve ter no mínimo 6 caracteres"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            Cadastrar
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
            <p className="text-sm text-gray-600">Já tem uma conta?</p>
            <Link to="/login">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Fazer login
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
