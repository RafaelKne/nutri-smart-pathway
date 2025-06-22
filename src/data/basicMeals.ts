
import { Meal } from "@/types/meal";

export const basicMeals: Meal[] = [
  // Café da Manhã básico
  {
    id: 501,
    name: "Café da Manhã",
    time: "07:00",
    title: "Pão com Ovo Frito",
    calories: 320,
    protein: 18,
    carbs: 35,
    fat: 12,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "2 fatias de pão de forma",
      "1 ovo",
      "1 colher de chá de óleo",
      "Sal a gosto",
      "1 copo de leite"
    ],
    instructions: [
      "Aqueça o óleo na frigideira",
      "Frite o ovo do jeito que preferir",
      "Torre o pão se desejar",
      "Monte o sanduíche e sirva com leite"
    ],
    consumed: false
  },
  {
    id: 502,
    name: "Café da Manhã",
    time: "07:00",
    title: "Café com Leite e Torrada",
    calories: 280,
    protein: 12,
    carbs: 40,
    fat: 8,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "1 xícara de café",
      "200ml de leite",
      "2 fatias de pão",
      "1 colher de sopa de margarina",
      "Açúcar a gosto"
    ],
    instructions: [
      "Prepare o café",
      "Aqueça o leite",
      "Torre o pão",
      "Passe margarina no pão e sirva"
    ],
    consumed: false
  },
  {
    id: 503,
    name: "Café da Manhã",
    time: "07:00",
    title: "Mingau de Aveia Simples",
    calories: 300,
    protein: 15,
    carbs: 45,
    fat: 8,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "50g de aveia em flocos",
      "300ml de leite",
      "1 banana",
      "1 colher de sopa de açúcar",
      "Canela em pó"
    ],
    instructions: [
      "Ferva o leite",
      "Adicione a aveia e mexa bem",
      "Cozinhe por 10 minutos mexendo sempre",
      "Sirva com banana e canela"
    ],
    consumed: false
  },

  // Almoços simples
  {
    id: 601,
    name: "Almoço",
    time: "12:30",
    title: "Arroz, Feijão e Salada",
    calories: 450,
    protein: 18,
    carbs: 65,
    fat: 12,
    prepTime: "30 min",
    servings: 1,
    ingredients: [
      "100g de arroz",
      "80g de feijão cozido",
      "Folhas verdes",
      "1 tomate",
      "Temperos básicos"
    ],
    instructions: [
      "Cozinhe o arroz normalmente",
      "Aqueça o feijão",
      "Prepare a salada simples",
      "Monte o prato e sirva"
    ],
    consumed: false
  },
  {
    id: 602,
    name: "Almoço",
    time: "12:30",
    title: "Macarrão com Molho de Tomate",
    calories: 420,
    protein: 15,
    carbs: 70,
    fat: 10,
    prepTime: "20 min",
    servings: 1,
    ingredients: [
      "100g de macarrão",
      "3 colheres de molho de tomate",
      "1 dente de alho",
      "Queijo ralado",
      "Sal e orégano"
    ],
    instructions: [
      "Cozinhe o macarrão conforme embalagem",
      "Refogue o alho",
      "Adicione o molho de tomate",
      "Misture com o macarrão e sirva"
    ],
    consumed: false
  },
  {
    id: 603,
    name: "Almoço",
    time: "12:30",
    title: "Frango Cozido com Batata",
    calories: 480,
    protein: 35,
    carbs: 40,
    fat: 18,
    prepTime: "40 min",
    servings: 1,
    ingredients: [
      "150g de peito de frango",
      "200g de batata",
      "1 cebola pequena",
      "Sal e temperos básicos",
      "1 colher de óleo"
    ],
    instructions: [
      "Corte o frango em pedaços",
      "Cozinhe com água, sal e cebola",
      "Adicione as batatas cortadas",
      "Cozinhe até tudo ficar macio"
    ],
    consumed: false
  },
  {
    id: 604,
    name: "Almoço",
    time: "12:30",
    title: "Ovo Mexido com Arroz",
    calories: 380,
    protein: 20,
    carbs: 45,
    fat: 14,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "2 ovos",
      "100g de arroz cozido",
      "1 colher de óleo",
      "Sal e cebola",
      "Cheiro verde"
    ],
    instructions: [
      "Refogue a cebola no óleo",
      "Adicione os ovos batidos",
      "Mexa até cozinhar",
      "Sirva com arroz"
    ],
    consumed: false
  },

  // Lanches populares
  {
    id: 701,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Pão com Queijo",
    calories: 250,
    protein: 12,
    carbs: 30,
    fat: 10,
    prepTime: "3 min",
    servings: 1,
    ingredients: [
      "2 fatias de pão",
      "2 fatias de queijo",
      "Margarina",
      "1 copo de suco"
    ],
    instructions: [
      "Passe margarina no pão",
      "Coloque o queijo",
      "Monte o sanduíche",
      "Sirva com suco"
    ],
    consumed: false
  },
  {
    id: 702,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Banana com Granola",
    calories: 200,
    protein: 6,
    carbs: 35,
    fat: 5,
    prepTime: "2 min",
    servings: 1,
    ingredients: [
      "1 banana grande",
      "30g de granola",
      "1 colher de mel",
      "Leite se desejar"
    ],
    instructions: [
      "Corte a banana em fatias",
      "Polvilhe a granola",
      "Regue com mel",
      "Coma na hora"
    ],
    consumed: false
  },
  {
    id: 703,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Biscoito Integral com Leite",
    calories: 220,
    protein: 8,
    carbs: 32,
    fat: 7,
    prepTime: "2 min",
    servings: 1,
    ingredients: [
      "6 biscoitos integrais",
      "200ml de leite",
      "Açúcar se desejar"
    ],
    instructions: [
      "Coloque os biscoitos no prato",
      "Sirva com o leite",
      "Molhe os biscoitos no leite",
      "Consuma imediatamente"
    ],
    consumed: false
  },

  // Jantares leves
  {
    id: 801,
    name: "Jantar",
    time: "19:00",
    title: "Sopa de Legumes Simples",
    calories: 280,
    protein: 12,
    carbs: 35,
    fat: 8,
    prepTime: "30 min",
    servings: 1,
    ingredients: [
      "1 batata média",
      "1 cenoura",
      "1 chuchu",
      "Sal e temperos",
      "1 cubo de caldo"
    ],
    instructions: [
      "Corte todos os legumes",
      "Cozinhe em água com sal",
      "Adicione o cubo de caldo",
      "Cozinhe até ficar macio"
    ],
    consumed: false
  },
  {
    id: 802,
    name: "Jantar",
    time: "19:00",
    title: "Sanduíche Natural",
    calories: 320,
    protein: 18,
    carbs: 35,
    fat: 12,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "2 fatias de pão integral",
      "Folhas de alface",
      "2 fatias de peito de peru",
      "1 tomate",
      "Maionese light"
    ],
    instructions: [
      "Lave as folhas",
      "Corte o tomate",
      "Monte o sanduíche com todos ingredientes",
      "Corte ao meio e sirva"
    ],
    consumed: false
  },
  {
    id: 803,
    name: "Jantar",
    time: "19:00",
    title: "Salada Mista Simples",
    calories: 250,
    protein: 15,
    carbs: 20,
    fat: 12,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "Folhas verdes variadas",
      "1 tomate",
      "1 ovo cozido",
      "Azeite e vinagre",
      "Sal a gosto"
    ],
    instructions: [
      "Lave e corte as folhas",
      "Adicione o tomate em fatias",
      "Coloque o ovo cozido picado",
      "Tempere com azeite, vinagre e sal"
    ],
    consumed: false
  }
];
