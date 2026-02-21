import React from 'react';
import { Link, Outlet, useLocation } from '@tanstack/react-router';
import { cn } from '../../lib/utils';
import Logo from '../../assets/Logo.svg';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex-shrink-0">
              <img src={Logo} alt="Financy" className="h-6" />
            </Link>
            
            <nav className="hidden md:flex gap-6">
              <Link 
                to="/dashboard" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-base",
                  isActive('/dashboard') ? "text-brand-base" : "text-gray-500"
                )}
              >
                Dashboard
              </Link>
              <Link 
                to="/transactions" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-base",
                  isActive('/transactions') ? "text-brand-base" : "text-gray-500"
                )}
              >
                Transações
              </Link>
              <Link 
                to="/categories" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-base",
                  isActive('/categories') ? "text-brand-base" : "text-gray-500"
                )}
              >
                Categorias
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/profile" className="flex-shrink-0">
               <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-xs hover:ring-2 hover:ring-gray-300 transition-all">
                  CT
               </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children || <Outlet />}
      </main>
    </div>
  );
}
