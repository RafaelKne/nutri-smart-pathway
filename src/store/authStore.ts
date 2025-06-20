
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  isPremium: boolean;
  profile?: UserProfile;
}

interface UserProfile {
  weight: number;
  height: number;
  age: number;
  gender: 'masculino' | 'feminino' | 'outro';
  goal: 'emagrecimento' | 'ganho_massa' | 'manutencao';
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso';
  dietaryPreferences: string[];
  restrictions: string[];
  mealsPerDay: 3 | 4 | 5;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulação de autenticação
        if (email && password) {
          const user: User = {
            id: '1',
            name: email.split('@')[0],
            email,
            isPremium: false,
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        // Simulação de registro
        if (name && email && password) {
          const user: User = {
            id: Date.now().toString(),
            name,
            email,
            isPremium: false,
          };
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (profile: UserProfile) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              profile,
            },
          });
        }
      },
    }),
    {
      name: 'nutri-ai-auth',
    }
  )
);
