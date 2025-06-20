
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
  registeredUsers: User[];
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
      registeredUsers: [],

      login: async (email: string, password: string) => {
        const { registeredUsers } = get();
        
        // Procurar usuário registrado
        const existingUser = registeredUsers.find(u => u.email === email);
        
        if (existingUser && email && password) {
          set({ user: existingUser, isAuthenticated: true });
          return true;
        }
        
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        const { registeredUsers } = get();
        
        // Verificar se usuário já existe
        const existingUser = registeredUsers.find(u => u.email === email);
        if (existingUser) {
          return false;
        }
        
        if (name && email && password) {
          const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            isPremium: false,
          };
          
          const updatedUsers = [...registeredUsers, newUser];
          
          set({ 
            user: newUser, 
            isAuthenticated: true,
            registeredUsers: updatedUsers
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (profile: UserProfile) => {
        const { user, registeredUsers } = get();
        if (user) {
          const updatedUser = {
            ...user,
            profile,
          };
          
          const updatedUsers = registeredUsers.map(u => 
            u.id === user.id ? updatedUser : u
          );
          
          set({
            user: updatedUser,
            registeredUsers: updatedUsers
          });
        }
      },
    }),
    {
      name: 'nutri-ai-auth',
    }
  )
);
