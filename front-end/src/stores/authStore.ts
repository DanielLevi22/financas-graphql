import { create } from 'zustand';
import { apolloClient } from '../lib/apollo';
import { LOGIN_MUTATION, REGISTER_MUTATION } from '../graphql/mutations';
import type { User, LoginInput, RegisterInput, AuthPayload } from '../types/graphql';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,

  initialize: () => {
    const token = localStorage.getItem('@financy:token');
    const storedUser = localStorage.getItem('@financy:user');

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true, loading: false });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('@financy:token');
        localStorage.removeItem('@financy:user');
        set({ user: null, isAuthenticated: false, loading: false });
      }
    } else {
      set({ loading: false });
    }
  },

  login: async (input: LoginInput) => {
    try {
      const { data } = await apolloClient.mutate<{ login: AuthPayload }>({
        mutation: LOGIN_MUTATION,
        variables: { input },
      });

      if (data?.login) {
        const { token, user } = data.login;
        
        localStorage.setItem('@financy:token', token);
        localStorage.setItem('@financy:user', JSON.stringify(user));
        
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (input: RegisterInput) => {
    try {
      const { data } = await apolloClient.mutate<{ register: AuthPayload }>({
        mutation: REGISTER_MUTATION,
        variables: { input },
      });

      if (data?.register) {
        const { token, user } = data.register;
        
        localStorage.setItem('@financy:token', token);
        localStorage.setItem('@financy:user', JSON.stringify(user));
        
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('@financy:token');
    localStorage.removeItem('@financy:user');
    set({ user: null, isAuthenticated: false });
  },
}));
