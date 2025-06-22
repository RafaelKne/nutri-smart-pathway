
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Adicionado campo password
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
  dailyWaterGoal?: number;
  waterConsumed?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  registeredUsers: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profile: UserProfile) => void;
  updateWaterConsumption: (amount: number) => void;
  resetDailyWater: () => void;
}

// Função para calcular necessidade diária de água (ml)
const calculateDailyWater = (weight: number, height: number): number => {
  // Fórmula: 35ml por kg de peso corporal + ajuste pela altura
  const baseWater = weight * 35;
  const heightAdjustment = height > 170 ? (height - 170) * 10 : 0;
  return Math.round(baseWater + heightAdjustment);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [],

      login: async (email: string, password: string) => {
        const { registeredUsers } = get();
        
        // Procurar usuário registrado e validar TANTO email quanto senha
        const existingUser = registeredUsers.find(u => 
          u.email === email && u.password === password
        );
        
        if (existingUser) {
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
            password, // Armazenar senha
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
          // Calcular meta diária de água
          const dailyWaterGoal = calculateDailyWater(profile.weight, profile.height);
          
          const updatedProfile = {
            ...profile,
            dailyWaterGoal,
            waterConsumed: profile.waterConsumed || 0,
          };
          
          const updatedUser = {
            ...user,
            profile: updatedProfile,
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

      updateWaterConsumption: (amount: number) => {
        const { user, registeredUsers } = get();
        if (user?.profile) {
          const currentWater = user.profile.waterConsumed || 0;
          const newWater = Math.max(0, currentWater + amount);
          
          const updatedProfile = {
            ...user.profile,
            waterConsumed: newWater,
          };
          
          const updatedUser = {
            ...user,
            profile: updatedProfile,
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

      resetDailyWater: () => {
        const { user, registeredUsers } = get();
        if (user?.profile) {
          const updatedProfile = {
            ...user.profile,
            waterConsumed: 0,
          };
          
          const updatedUser = {
            ...user,
            profile: updatedProfile,
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
