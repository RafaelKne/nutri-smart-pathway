
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: number;
  name: string;
  email: string;
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
  waterConsumed?: number;
  dailyWaterGoal?: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: Array<{ email: string; password: string; name: string; id: number; profile?: UserProfile }>;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (email: string, password: string, name: string) => boolean;
  updateProfile: (profile: UserProfile) => void;
  updateWaterConsumption: (amount: number) => void;
  resetDailyWater: () => void;
  resetPassword: (email: string, newPassword: string) => boolean;
  findUserByEmail: (email: string) => { email: string; password: string; name: string; id: number; profile?: UserProfile } | undefined;
}

const calculateDailyWaterGoal = (weight: number, height: number): number => {
  // Fórmula baseada no peso corporal: 35ml por kg
  return Math.round(weight * 35);
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [
        {
          id: 1,
          email: 'admin@nutri.com',
          password: 'admin123',
          name: 'Administrador',
          profile: {
            weight: 70,
            height: 170,
            age: 30,
            gender: 'masculino',
            goal: 'manutencao',
            activityLevel: 'moderado',
            dietaryPreferences: [],
            restrictions: [],
            mealsPerDay: 4,
            waterConsumed: 0,
            dailyWaterGoal: 2450
          }
        }
      ],

      login: (email, password) => {
        console.log('Tentando login com:', { email, password });
        const { users } = get();
        console.log('Usuários disponíveis:', users);
        
        const user = users.find(u => u.email === email && u.password === password);
        console.log('Usuário encontrado:', user);
        
        if (user) {
          let userProfile = user.profile;
          
          // Se o usuário tem perfil mas não tem meta de água, calcular
          if (userProfile && !userProfile.dailyWaterGoal) {
            userProfile = {
              ...userProfile,
              dailyWaterGoal: calculateDailyWaterGoal(userProfile.weight, userProfile.height),
              waterConsumed: userProfile.waterConsumed || 0
            };
          }
          
          set({ 
            user: { 
              id: user.id, 
              name: user.name, 
              email: user.email, 
              profile: userProfile 
            }, 
            isAuthenticated: true 
          });
          console.log('Login bem-sucedido');
          return true;
        }
        console.log('Login falhou');
        return false;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: (email, password, name) => {
        console.log('Tentando registrar:', { email, password, name });
        const { users } = get();
        
        if (users.some(u => u.email === email)) {
          console.log('Email já existe');
          return false;
        }
        
        const newUser = {
          id: Date.now(),
          email,
          password,
          name
        };
        
        const updatedUsers = [...users, newUser];
        set({ users: updatedUsers });
        console.log('Usuário registrado com sucesso:', newUser);
        console.log('Lista de usuários atualizada:', updatedUsers);
        return true;
      },

      updateProfile: (profile) => {
        const { user, users } = get();
        if (!user) return;

        const dailyWaterGoal = calculateDailyWaterGoal(profile.weight, profile.height);
        const updatedProfile = {
          ...profile,
          dailyWaterGoal,
          waterConsumed: user.profile?.waterConsumed || 0
        };

        const updatedUser = { ...user, profile: updatedProfile };
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, profile: updatedProfile } : u
        );

        set({ 
          user: updatedUser,
          users: updatedUsers
        });
      },

      updateWaterConsumption: (amount) => {
        const { user, users } = get();
        if (!user?.profile) return;

        const currentWater = user.profile.waterConsumed || 0;
        const newWaterAmount = Math.max(0, currentWater + amount);
        
        const updatedProfile = {
          ...user.profile,
          waterConsumed: newWaterAmount
        };

        const updatedUser = { ...user, profile: updatedProfile };
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, profile: updatedProfile } : u
        );

        set({ 
          user: updatedUser,
          users: updatedUsers
        });
      },

      resetDailyWater: () => {
        const { user, users } = get();
        if (!user?.profile) return;

        const updatedProfile = {
          ...user.profile,
          waterConsumed: 0
        };

        const updatedUser = { ...user, profile: updatedProfile };
        const updatedUsers = users.map(u => 
          u.id === user.id ? { ...u, profile: updatedProfile } : u
        );

        set({ 
          user: updatedUser,
          users: updatedUsers
        });
      },

      resetPassword: (email, newPassword) => {
        const { users } = get();
        const userIndex = users.findIndex(u => u.email === email);
        
        if (userIndex === -1) return false;
        
        const updatedUsers = [...users];
        updatedUsers[userIndex] = { ...updatedUsers[userIndex], password: newPassword };
        
        set({ users: updatedUsers });
        return true;
      },

      findUserByEmail: (email) => {
        const { users } = get();
        return users.find(u => u.email === email);
      },
    }),
    {
      name: 'nutri-ai-auth',
    }
  )
);
