import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  nom: string;
  username: string;
  role: 'fondateur' | 'directeur' | 'admin_scolarite' | 'admin_auditeur' | 'parent' | 'enseignant' | 'administratif';
  permissions: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  hasRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      hasRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        return roles.includes(user.role);
      },
      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        return user.permissions?.includes(permission) || false;
      }
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: (name: string) => {
          return window.localStorage.getItem(name) || window.sessionStorage.getItem(name);
        },
        setItem: (name: string, value: string) => {
          if (window.localStorage.getItem('rememberMe') === 'true') {
            window.localStorage.setItem(name, value);
            window.sessionStorage.removeItem(name);
          } else {
            window.sessionStorage.setItem(name, value);
            window.localStorage.removeItem(name);
          }
        },
        removeItem: (name: string) => {
          window.localStorage.removeItem(name);
          window.sessionStorage.removeItem(name);
        },
      }
    }
  )
);
