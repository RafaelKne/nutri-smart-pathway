
import { Meal } from "@/types/meal";

export const extraMeals: Meal[] = [
  // Café da Manhã
  {
    id: 101,
    name: "Café da Manhã",
    time: "07:00",
    title: "Smoothie Verde Energético",
    calories: 280,
    protein: 15,
    carbs: 35,
    fat: 8,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "1 banana",
      "1 xícara de espinafre",
      "1/2 abacate",
      "200ml leite de amêndoa",
      "1 colher de sopa de chia"
    ],
    instructions: [
      "Bata todos os ingredientes no liquidificador",
      "Sirva gelado"
    ],
    consumed: false
  },
  {
    id: 102,
    name: "Café da Manhã",
    time: "07:00",
    title: "Bowl de Açaí Proteico",
    calories: 320,
    protein: 18,
    carbs: 40,
    fat: 12,
    prepTime: "8 min",
    servings: 1,
    ingredients: [
      "100g polpa de açaí",
      "1 banana",
      "1 scoop whey protein",
      "Granola",
      "Frutas vermelhas"
    ],
    instructions: [
      "Bata o açaí com banana e whey",
      "Adicione as coberturas por cima"
    ],
    consumed: false
  },
  
  // Almoço
  {
    id: 103,
    name: "Almoço",
    time: "12:00",
    title: "Salmão Grelhado com Quinoa",
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 20,
    prepTime: "20 min",
    servings: 1,
    ingredients: [
      "150g salmão",
      "1/2 xícara quinoa cozida",
      "Brócolis",
      "Azeite",
      "Limão"
    ],
    instructions: [
      "Grelhe o salmão temperado",
      "Refogue os brócolis",
      "Sirva com quinoa"
    ],
    consumed: false
  },
  {
    id: 104,
    name: "Almoço",
    time: "12:00",
    title: "Poke Bowl de Atum",
    calories: 420,
    protein: 32,
    carbs: 35,
    fat: 18,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "150g atum fresco",
      "Arroz integral",
      "Pepino",
      "Cenoura",
      "Abacate",
      "Shoyu"
    ],
    instructions: [
      "Corte o atum em cubos",
      "Prepare a base com arroz",
      "Adicione os vegetais e temperos"
    ],
    consumed: false
  },
  
  // Lanche da Tarde
  {
    id: 105,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Vitamina de Banana com Aveia",
    calories: 220,
    protein: 12,
    carbs: 28,
    fat: 8,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "1 banana",
      "200ml leite desnatado",
      "2 colheres aveia",
      "Canela"
    ],
    instructions: [
      "Bata todos os ingredientes",
      "Sirva gelado"
    ],
    consumed: false
  },
  {
    id: 106,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Mix de Castanhas e Frutas",
    calories: 180,
    protein: 8,
    carbs: 15,
    fat: 12,
    prepTime: "2 min",
    servings: 1,
    ingredients: [
      "30g mix de castanhas",
      "1 maçã pequena",
      "Uvas passas"
    ],
    instructions: [
      "Misture todos os ingredientes",
      "Consuma como lanche"
    ],
    consumed: false
  },
  
  // Jantar
  {
    id: 107,
    name: "Jantar",
    time: "19:00",
    title: "Peito de Peru com Batata Doce",
    calories: 380,
    protein: 30,
    carbs: 35,
    fat: 12,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "150g peito de peru",
      "1 batata doce média",
      "Rúcula",
      "Tomate cereja"
    ],
    instructions: [
      "Asse a batata doce",
      "Grelhe o peito de peru",
      "Sirva com salada"
    ],
    consumed: false
  },
  {
    id: 108,
    name: "Jantar",
    time: "19:00",
    title: "Omelete de Claras com Vegetais",
    calories: 250,
    protein: 22,
    carbs: 15,
    fat: 12,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "4 claras de ovo",
      "1 ovo inteiro",
      "Espinafre",
      "Tomate",
      "Queijo cottage"
    ],
    instructions: [
      "Bata os ovos",
      "Adicione os vegetais na frigideira",
      "Faça a omelete"
    ],
    consumed: false
  }
];
