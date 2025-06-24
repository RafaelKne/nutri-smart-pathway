import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  isPremium: boolean;
  isAdmin?: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
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
  resetPassword: (email: string, newPassword: string) => Promise<boolean>;
  findUserByEmail: (email: string) => User | null;
}

// Função para calcular necessidade diária de água (ml)
const calculateDailyWater = (weight: number, height: number): number => {
  const baseWater = weight * 35;
  const heightAdjustment = height > 170 ? (height - 170) * 10 : 0;
  return Math.round(baseWater + heightAdjustment);
};

// Conta de administrador padrão resetada
const adminUser: User = {
  id: 'admin-001',
  name: 'Administrador',
  email: 'admin@nutriai.com',
  password: 'admin123',
  isPremium: true,
  isAdmin: true,
  profile: {
    weight: 70,
    height: 175,
    age: 30,
    gender: 'masculino',
    goal: 'manutencao',
    activityLevel: 'moderado',
    dietaryPreferences: [],
    restrictions: [],
    mealsPerDay: 4,
    dailyWaterGoal: 2450,
    waterConsumed: 0,
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [adminUser], // Apenas administrador resetado

      login: async (email: string, password: string) => {
        console.log('Tentando login com:', { email, password });
        const { registeredUsers } = get();
        
        console.log('Usuários registrados:', registeredUsers);
        
        const existingUser = registeredUsers.find(u => {
          const emailMatch = u.email.toLowerCase().trim() === email.toLowerCase().trim();
          const userPassword = u.password || '';
          const passwordMatch = userPassword.trim() === password.trim();
          console.log('Comparando:', { 
            userEmail: u.email, 
            inputEmail: email, 
            emailMatch,
            userPassword: userPassword,
            inputPassword: password,
            passwordMatch,
            hasPassword: !!u.password
          });
          return emailMatch && passwordMatch;
        });
        
        console.log('Usuário encontrado:', existingUser);
        
        if (existingUser) {
          if (!existingUser.password) {
            existingUser.password = password;
            const updatedUsers = registeredUsers.map(u => 
              u.id === existingUser.id ? existingUser : u
            );
            set({ registeredUsers: updatedUsers });
          }
          
          set({ user: existingUser, isAuthenticated: true });
          console.log('Login realizado com sucesso');
          return true;
        }
        
        console.log('Falha no login - usuário não encontrado ou credenciais inválidas');
        return false;
      },

      register: async (name: string, email: string, password: string) => {
        const { registeredUsers } = get();
        
        const existingUser = registeredUsers.find(u => 
          u.email.toLowerCase().trim() === email.toLowerCase().trim()
        );
        if (existingUser) {
          return false;
        }
        
        if (name && email && password) {
          const newUser: User = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            isPremium: false,
            isAdmin: false,
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

      resetPassword: async (email: string, newPassword: string) => {
        const { registeredUsers } = get();
        
        const userIndex = registeredUsers.findIndex(u => 
          u.email.toLowerCase().trim() === email.toLowerCase().trim()
        );
        
        if (userIndex !== -1) {
          const updatedUsers = [...registeredUsers];
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            password: newPassword.trim()
          };
          
          set({ registeredUsers: updatedUsers });
          return true;
        }
        
        return false;
      },

      findUserByEmail: (email: string) => {
        const { registeredUsers } = get();
        return registeredUsers.find(u => 
          u.email.toLowerCase().trim() === email.toLowerCase().trim()
        ) || null;
      },
    }),
    {
      name: 'nutri-ai-auth',
    }
  )
);
