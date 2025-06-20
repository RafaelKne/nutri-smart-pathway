
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Meal {
  id: number;
  name: string;
  time: string;
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  consumed: boolean;
}

interface MealState {
  meals: Meal[];
  consumedMeals: number[];
  markMealAsConsumed: (mealId: number) => void;
  generateNewPlan: () => void;
  substituteMeal: (mealId: number) => void;
}

const defaultMeals: Meal[] = [
  {
    id: 1,
    name: "Café da Manhã",
    time: "07:00",
    title: "Omelete com Aveia e Frutas",
    calories: 420,
    protein: 25,
    carbs: 35,
    fat: 18,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "2 ovos",
      "30g de aveia",
      "1 banana pequena",
      "1 colher de sopa de azeite",
      "50ml de leite desnatado"
    ],
    instructions: [
      "Bata os ovos com o leite",
      "Aqueça o azeite na frigideira",
      "Despeje os ovos e cozinhe por 3-4 minutos",
      "Sirva com aveia e banana fatiada"
    ],
    consumed: false
  },
  {
    id: 2,
    name: "Almoço",
    time: "12:30",
    title: "Peito de Frango Grelhado com Quinoa",
    calories: 580,
    protein: 45,
    carbs: 55,
    fat: 12,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "150g de peito de frango",
      "80g de quinoa",
      "100g de brócolis",
      "1 tomate médio",
      "Temperos a gosto"
    ],
    instructions: [
      "Tempere o frango e grelhe por 8-10 minutos",
      "Cozinhe a quinoa conforme instruções da embalagem",
      "Refogue o brócolis rapidamente",
      "Monte o prato e sirva"
    ],
    consumed: false
  },
  {
    id: 3,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Iogurte com Granola e Frutas Vermelhas",
    calories: 280,
    protein: 15,
    carbs: 35,
    fat: 8,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "150g de iogurte grego",
      "30g de granola",
      "80g de frutas vermelhas",
      "1 colher de chá de mel"
    ],
    instructions: [
      "Coloque o iogurte na tigela",
      "Adicione as frutas vermelhas",
      "Polvilhe a granola por cima",
      "Finalize com mel"
    ],
    consumed: false
  },
  {
    id: 4,
    name: "Jantar",
    time: "19:00",
    title: "Salmão Assado com Batata Doce",
    calories: 520,
    protein: 35,
    carbs: 40,
    fat: 22,
    prepTime: "30 min",
    servings: 1,
    ingredients: [
      "120g de filé de salmão",
      "200g de batata doce",
      "100g de aspargos",
      "1 colher de sopa de azeite",
      "Ervas finas"
    ],
    instructions: [
      "Preaqueça o forno a 200°C",
      "Corte a batata doce em cubos e tempere",
      "Asse por 20 minutos",
      "Adicione o salmão e aspargos, asse por mais 15 minutos"
    ],
    consumed: false
  }
];

const alternativeMeals = [
  {
    id: 5,
    name: "Café da Manhã",
    time: "07:00",
    title: "Smoothie Proteico com Banana",
    calories: 380,
    protein: 28,
    carbs: 42,
    fat: 12,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "1 banana média",
      "200ml de leite de amêndoas",
      "30g de whey protein",
      "1 colher de sopa de pasta de amendoim",
      "Gelo a gosto"
    ],
    instructions: [
      "Coloque todos os ingredientes no liquidificador",
      "Bata até ficar homogêneo",
      "Sirva imediatamente",
      "Adicione gelo se preferir mais gelado"
    ],
    consumed: false
  },
  {
    id: 6,
    name: "Almoço",
    time: "12:30",
    title: "Salada de Atum com Grão-de-Bico",
    calories: 520,
    protein: 38,
    carbs: 48,
    fat: 18,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "1 lata de atum em água",
      "150g de grão-de-bico cozido",
      "Folhas verdes variadas",
      "1 tomate cereja",
      "Azeite e limão para temperar"
    ],
    instructions: [
      "Escorra o atum e o grão-de-bico",
      "Misture com as folhas verdes",
      "Adicione os tomates cereja",
      "Tempere com azeite e limão"
    ],
    consumed: false
  }
];

export const useMealStore = create<MealState>()(
  persist(
    (set, get) => ({
      meals: defaultMeals,
      consumedMeals: [],

      markMealAsConsumed: (mealId: number) => {
        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === mealId ? { ...meal, consumed: !meal.consumed } : meal
          ),
          consumedMeals: state.meals.find(m => m.id === mealId)?.consumed
            ? state.consumedMeals.filter(id => id !== mealId)
            : [...state.consumedMeals, mealId]
        }));
      },

      generateNewPlan: () => {
        const newMeals = defaultMeals.map((meal, index) => ({
          ...meal,
          id: Date.now() + index,
          consumed: false
        }));
        set({ meals: newMeals, consumedMeals: [] });
      },

      substituteMeal: (mealId: number) => {
        const { meals } = get();
        const mealToReplace = meals.find(meal => meal.id === mealId);
        if (!mealToReplace) return;

        const alternatives = alternativeMeals.filter(alt => alt.name === mealToReplace.name);
        if (alternatives.length === 0) return;

        const randomAlternative = alternatives[Math.floor(Math.random() * alternatives.length)];
        const newMeal = {
          ...randomAlternative,
          id: Date.now(),
          consumed: false
        };

        set((state) => ({
          meals: state.meals.map((meal) =>
            meal.id === mealId ? newMeal : meal
          )
        }));
      },
    }),
    {
      name: 'nutri-ai-meals',
    }
  )
);
