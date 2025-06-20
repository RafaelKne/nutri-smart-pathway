
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
  // Café da Manhã alternativas
  {
    id: 101,
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
    id: 102,
    name: "Café da Manhã",
    time: "07:00",
    title: "Panqueca de Aveia com Morango",
    calories: 390,
    protein: 22,
    carbs: 45,
    fat: 14,
    prepTime: "20 min",
    servings: 1,
    ingredients: [
      "50g de aveia em flocos",
      "2 ovos",
      "1 banana madura",
      "100ml de leite desnatado",
      "10 morangos",
      "1 colher de chá de mel"
    ],
    instructions: [
      "Bata todos os ingredientes no liquidificador exceto os morangos",
      "Aqueça uma frigideira antiaderente",
      "Despeje a massa e cozinhe como panqueca",
      "Sirva com morangos e mel"
    ],
    consumed: false
  },
  {
    id: 103,
    name: "Café da Manhã",
    time: "07:00",
    title: "Tapioca com Queijo e Tomate",
    calories: 350,
    protein: 18,
    carbs: 40,
    fat: 15,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "50g de goma de tapioca",
      "50g de queijo branco",
      "1 tomate médio",
      "Orégano a gosto",
      "Azeite para untar"
    ],
    instructions: [
      "Hidrate a tapioca em frigideira quente",
      "Adicione o queijo branco",
      "Coloque o tomate em fatias",
      "Tempere com orégano e dobre"
    ],
    consumed: false
  },
  {
    id: 104,
    name: "Café da Manhã",
    time: "07:00",
    title: "Vitamina de Açaí com Granola",
    calories: 450,
    protein: 20,
    carbs: 55,
    fat: 18,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "100g de polpa de açaí",
      "1 banana",
      "200ml de leite de coco",
      "30g de granola",
      "1 colher de sopa de mel"
    ],
    instructions: [
      "Bata o açaí com banana e leite de coco",
      "Despeje na tigela",
      "Cubra com granola",
      "Finalize com mel"
    ],
    consumed: false
  },

  // Almoço alternativas
  {
    id: 201,
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
  },
  {
    id: 202,
    name: "Almoço",
    time: "12:30",
    title: "Carne Moída com Abobrinha",
    calories: 490,
    protein: 40,
    carbs: 30,
    fat: 22,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "150g de carne moída magra",
      "2 abobrinhas médias",
      "1 cebola pequena",
      "2 dentes de alho",
      "Molho de tomate natural"
    ],
    instructions: [
      "Refogue a cebola e alho",
      "Adicione a carne moída e tempere",
      "Corte a abobrinha em cubos",
      "Misture tudo e cozinhe por 15 minutos"
    ],
    consumed: false
  },
  {
    id: 203,
    name: "Almoço",
    time: "12:30",
    title: "Peixe Grelhado com Arroz Integral",
    calories: 550,
    protein: 42,
    carbs: 50,
    fat: 16,
    prepTime: "30 min",
    servings: 1,
    ingredients: [
      "150g de filé de peixe branco",
      "80g de arroz integral",
      "100g de vagem",
      "1 cenoura média",
      "Temperos naturais"
    ],
    instructions: [
      "Cozinhe o arroz integral",
      "Tempere e grelhe o peixe",
      "Refogue a vagem e cenoura",
      "Monte o prato e sirva"
    ],
    consumed: false
  },
  {
    id: 204,
    name: "Almoço",
    time: "12:30",
    title: "Frango Xadrez com Legumes",
    calories: 480,
    protein: 45,
    carbs: 35,
    fat: 18,
    prepTime: "20 min",
    servings: 1,
    ingredients: [
      "150g de peito de frango em cubos",
      "1 pimentão colorido",
      "1 cebola média",
      "100g de vagem",
      "Molho shoyu light"
    ],
    instructions: [
      "Corte todos os ingredientes em cubos",
      "Refogue o frango primeiro",
      "Adicione os legumes",
      "Tempere com shoyu e finalize"
    ],
    consumed: false
  },

  // Lanche alternativas
  {
    id: 301,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Mix de Castanhas e Frutas Secas",
    calories: 250,
    protein: 8,
    carbs: 25,
    fat: 14,
    prepTime: "2 min",
    servings: 1,
    ingredients: [
      "20g de castanha do pará",
      "15g de amêndoas",
      "20g de tâmaras",
      "15g de passas",
      "10g de nozes"
    ],
    instructions: [
      "Misture todas as castanhas",
      "Adicione as frutas secas",
      "Consuma moderadamente",
      "Guarde o restante em recipiente fechado"
    ],
    consumed: false
  },
  {
    id: 302,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Vitamina de Banana com Aveia",
    calories: 320,
    protein: 18,
    carbs: 40,
    fat: 10,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "1 banana grande",
      "200ml de leite desnatado",
      "30g de aveia",
      "1 colher de sopa de mel",
      "Canela em pó"
    ],
    instructions: [
      "Bata todos os ingredientes no liquidificador",
      "Adicione gelo se preferir gelado",
      "Polvilhe canela por cima",
      "Sirva imediatamente"
    ],
    consumed: false
  },
  {
    id: 303,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Torrada Integral com Abacate",
    calories: 290,
    protein: 12,
    carbs: 30,
    fat: 16,
    prepTime: "8 min",
    servings: 1,
    ingredients: [
      "2 fatias de pão integral",
      "1/2 abacate maduro",
      "1 ovo cozido",
      "Sal e pimenta a gosto",
      "Tomate cereja para decorar"
    ],
    instructions: [
      "Toste o pão integral",
      "Amasse o abacate com garfo",
      "Espalhe sobre o pão",
      "Adicione o ovo picado e tempere"
    ],
    consumed: false
  },

  // Jantar alternativas
  {
    id: 401,
    name: "Jantar",
    time: "19:00",
    title: "Sopa de Legumes com Frango",
    calories: 380,
    protein: 30,
    carbs: 35,
    fat: 12,
    prepTime: "40 min",
    servings: 1,
    ingredients: [
      "100g de peito de frango desfiado",
      "1 batata média",
      "1 cenoura",
      "1 abobrinha",
      "Caldo de legumes natural"
    ],
    instructions: [
      "Cozinhe o frango e desfie",
      "Corte os legumes em cubos",
      "Refogue tudo no caldo",
      "Cozinhe até os legumes ficarem macios"
    ],
    consumed: false
  },
  {
    id: 402,
    name: "Jantar",
    time: "19:00",
    title: "Omelete de Espinafre com Queijo",
    calories: 420,
    protein: 28,
    carbs: 15,
    fat: 28,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "3 ovos",
      "100g de espinafre fresco",
      "50g de queijo branco",
      "1 colher de azeite",
      "Temperos a gosto"
    ],
    instructions: [
      "Refogue o espinafre rapidamente",
      "Bata os ovos e tempere",
      "Faça a omelete na frigideira",
      "Adicione queijo e espinafre, dobre"
    ],
    consumed: false
  },
  {
    id: 403,
    name: "Jantar",
    time: "19:00",
    title: "Salada Completa com Proteína",
    calories: 450,
    protein: 35,
    carbs: 25,
    fat: 24,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "Mix de folhas verdes",
      "100g de peito de peru",
      "1/2 abacate",
      "Tomate cereja",
      "Azeite e vinagre balsâmico"
    ],
    instructions: [
      "Lave e corte as folhas",
      "Fatique o peru e abacate",
      "Monte a salada na tigela",
      "Tempere com azeite e vinagre"
    ],
    consumed: false
  },
  {
    id: 404,
    name: "Jantar",
    time: "19:00",
    title: "Peixe ao Papillote com Legumes",
    calories: 400,
    protein: 38,
    carbs: 20,
    fat: 18,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "150g de filé de peixe",
      "1 abobrinha pequena",
      "1/2 pimentão",
      "Tomate cereja",
      "Ervas finas e azeite"
    ],
    instructions: [
      "Corte os legumes em fatias",
      "Tempere o peixe",
      "Monte tudo no papel alumínio",
      "Asse no forno por 20 minutos"
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
        // Seleciona refeições aleatórias de cada tipo
        const breakfastOptions = [defaultMeals[0], ...alternativeMeals.filter(m => m.name === "Café da Manhã")];
        const lunchOptions = [defaultMeals[1], ...alternativeMeals.filter(m => m.name === "Almoço")];
        const snackOptions = [defaultMeals[2], ...alternativeMeals.filter(m => m.name === "Lanche da Tarde")];
        const dinnerOptions = [defaultMeals[3], ...alternativeMeals.filter(m => m.name === "Jantar")];

        const newMeals = [
          { ...breakfastOptions[Math.floor(Math.random() * breakfastOptions.length)], id: Date.now() + 1, consumed: false },
          { ...lunchOptions[Math.floor(Math.random() * lunchOptions.length)], id: Date.now() + 2, consumed: false },
          { ...snackOptions[Math.floor(Math.random() * snackOptions.length)], id: Date.now() + 3, consumed: false },
          { ...dinnerOptions[Math.floor(Math.random() * dinnerOptions.length)], id: Date.now() + 4, consumed: false }
        ];

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
