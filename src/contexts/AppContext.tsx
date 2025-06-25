
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'pt' | 'en';

interface AppContextType {
  theme: Theme;
  language: Language;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations = {
  pt: {
    nutriplan: 'NutriPlan',
    settings: 'Configurações',
    logout: 'Sair',
    login: 'Entrar',
    register: 'Cadastrar',
    darkMode: 'Modo Escuro',
    language: 'Idioma',
    mealPlan: 'Seu Plano de Hoje',
    generateNewPlan: 'Gerar Novo Plano',
    markAsConsumed: 'Marcar como Consumido',
    consumed: 'Consumido',
    substituteMeal: 'Substituir Refeição',
    ingredients: 'Ingredientes:',
    instructions: 'Modo de preparo:',
    calories: 'calorias',
    protein: 'Proteína',
    carbs: 'Carbs',
    fat: 'Gordura',
    servings: 'porção',
    water: 'Água',
    goal: 'Meta'
  },
  en: {
    nutriplan: 'NutriPlan',
    settings: 'Settings',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    darkMode: 'Dark Mode',
    language: 'Language',
    mealPlan: 'Your Today\'s Plan',
    generateNewPlan: 'Generate New Plan',
    markAsConsumed: 'Mark as Consumed',
    consumed: 'Consumed',
    substituteMeal: 'Substitute Meal',
    ingredients: 'Ingredients:',
    instructions: 'Instructions:',
    calories: 'calories',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    servings: 'serving',
    water: 'Water',
    goal: 'Goal'
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('pt');

  // Carregar configurações salvas
  useEffect(() => {
    const savedTheme = localStorage.getItem('nutri-theme') as Theme;
    const savedLanguage = localStorage.getItem('nutri-language') as Language;
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme);
    }
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Aplicar tema
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('nutri-theme', theme);
  }, [theme]);

  // Salvar idioma
  useEffect(() => {
    localStorage.setItem('nutri-language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <AppContext.Provider value={{ theme, language, toggleTheme, toggleLanguage, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
