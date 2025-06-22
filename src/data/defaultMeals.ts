
import { Meal } from "@/types/meal";

export const defaultMeals: Meal[] = [
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
  },
  // Adicionando mais opções práticas
  {
    id: 5,
    name: "Café da Manhã",
    time: "07:00",
    title: "Pão Integral com Requeijão e Presunto",
    calories: 350,
    protein: 20,
    carbs: 40,
    fat: 12,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "2 fatias de pão integral",
      "2 colheres de requeijão light",
      "2 fatias de presunto magro",
      "Folhas de alface",
      "1 copo de suco de laranja"
    ],
    instructions: [
      "Torre levemente o pão",
      "Espalhe o requeijão",
      "Adicione o presunto e alface",
      "Sirva com suco"
    ],
    consumed: false
  },
  {
    id: 6,
    name: "Almoço",
    time: "12:30",
    title: "Bife Acebolado com Arroz e Feijão",
    calories: 520,
    protein: 38,
    carbs: 50,
    fat: 18,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "150g de bife magro",
      "100g de arroz",
      "80g de feijão",
      "1 cebola média",
      "Salada verde"
    ],
    instructions: [
      "Grelhe o bife e reserve",
      "Refogue a cebola",
      "Cozinhe arroz e feijão",
      "Monte o prato com salada"
    ],
    consumed: false
  }
];
