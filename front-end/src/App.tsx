import { Outlet, RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Categories } from './pages/Categories';
import { Profile } from './pages/Profile';
import { Showcase } from './pages/Showcase';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const token = localStorage.getItem('@financy:token');
    if (token) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/login';
    }
    return <div>Redirecionando...</div>;
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});

const transactionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/transactions',
  component: () => (
    <ProtectedRoute>
      <Transactions />
    </ProtectedRoute>
  ),
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: () => (
    <ProtectedRoute>
      <Categories />
    </ProtectedRoute>
  ),
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: () => (
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  ),
});

const showcaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/showcase',
  component: Showcase,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  dashboardRoute,
  transactionsRoute,
  categoriesRoute,
  profileRoute,
  showcaseRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
