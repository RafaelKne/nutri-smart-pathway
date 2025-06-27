
import { Meal } from "@/types/meal";

export const vegetarianMeals: Meal[] = [
  // Café da Manhã Vegetariano
  {
    id: 501,
    name: "Café da Manhã",
    time: "07:00",
    title: "Bowl de Açaí com Granola Caseira",
    calories: 420,
    protein: 18,
    carbs: 55,
    fat: 16,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "100g de polpa de açaí",
      "1 banana",
      "50g de granola sem mel",
      "1 colher de sopa de pasta de amendoim",
      "10g de chia",
      "Frutas vermelhas"
    ],
    instructions: [
      "Bata o açaí com banana até ficar cremoso",
      "Despeje na tigela",
      "Cubra com granola e chia",
      "Finalize com pasta de amendoim e frutas"
    ],
    consumed: false
  },
  {
    id: 502,
    name: "Café da Manhã",
    time: "07:00",
    title: "Panqueca de Aveia com Banana",
    calories: 380,
    protein: 20,
    carbs: 48,
    fat: 12,
    prepTime: "15 min",
    servings: 1,
    ingredients: [
      "50g de aveia",
      "2 ovos",
      "1 banana madura",
      "200ml de leite vegetal",
      "1 colher de chá de canela",
      "Mel ou xarope de bordo"
    ],
    instructions: [
      "Bata todos os ingredientes no liquidificador",
      "Aqueça frigideira antiaderente",
      "Despeje a massa e cozinhe como panqueca",
      "Sirva com mel ou xarope"
    ],
    consumed: false
  },

  // Almoço Vegetariano
  {
    id: 503,
    name: "Almoço",
    time: "12:30",
    title: "Buddha Bowl com Quinoa",
    calories: 550,
    protein: 25,
    carbs: 65,
    fat: 18,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "80g de quinoa",
      "100g de grão-de-bico cozido",
      "1/2 abacate",
      "100g de brócolis",
      "Folhas verdes",
      "2 colheres de tahine",
      "Sementes de girassol"
    ],
    instructions: [
      "Cozinhe a quinoa",
      "Refogue o brócolis rapidamente",
      "Monte a bowl com todos os ingredientes",
      "Tempere com tahine e sementes"
    ],
    consumed: false
  },
  {
    id: 504,
    name: "Almoço",
    time: "12:30",
    title: "Lasanha de Berinjela com Ricota",
    calories: 480,
    protein: 28,
    carbs: 35,
    fat: 24,
    prepTime: "40 min",
    servings: 1,
    ingredients: [
      "1 berinjela grande",
      "150g de ricota",
      "100g de espinafre",
      "Molho de tomate caseiro",
      "50g de queijo mussarela",
      "Manjericão fresco"
    ],
    instructions: [
      "Corte a berinjela em fatias e grelhe",
      "Misture ricota com espinafre",
      "Monte camadas com berinjela e recheio",
      "Asse por 25 minutos"
    ],
    consumed: false
  },

  // Lanche Vegetariano
  {
    id: 505,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Smoothie Verde Proteico",
    calories: 280,
    protein: 22,
    carbs: 28,
    fat: 10,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "1 banana",
      "100g de espinafre",
      "200ml de leite de coco",
      "1 colher de proteína vegetal",
      "1 colher de pasta de amendoim",
      "Gelo"
    ],
    instructions: [
      "Bata todos os ingredientes no liquidificador",
      "Adicione gelo para gelar",
      "Sirva imediatamente",
      "Polvilhe sementes por cima se desejar"
    ],
    consumed: false
  },

  // Jantar Vegetariano
  {
    id: 506,
    name: "Jantar",
    time: "19:00",
    title: "Curry de Lentilha com Arroz Integral",
    calories: 520,
    protein: 24,
    carbs: 72,
    fat: 14,
    prepTime: "30 min",
    servings: 1,
    ingredients: [
      "100g de lentilha vermelha",
      "80g de arroz integral",
      "1 lata de leite de coco",
      "1 cebola",
      "Temperos: curry, cúrcuma, gengibre",
      "Coentro fresco"
    ],
    instructions: [
      "Cozinhe o arroz integral",
      "Refogue cebola e temperos",
      "Adicione lentilha e leite de coco",
      "Cozinhe até ficar cremoso"
    ],
    consumed: false
  }
];

export const veganMeals: Meal[] = [
  // Café da Manhã Vegano
  {
    id: 601,
    name: "Café da Manhã",
    time: "07:00",
    title: "Overnight Oats com Frutas",
    calories: 400,
    protein: 16,
    carbs: 58,
    fat: 14,
    prepTime: "5 min",
    servings: 1,
    ingredients: [
      "50g de aveia",
      "200ml de leite de amêndoas",
      "1 colher de chia",
      "1 banana",
      "1 colher de pasta de amendoim",
      "Frutas vermelhas",
      "Xarope de bordo"
    ],
    instructions: [
      "Misture aveia, chia e leite vegetal",
      "Deixe na geladeira durante a noite",
      "Pela manhã, adicione banana e pasta de amendoim",
      "Finalize com frutas e xarope"
    ],
    consumed: false
  },
  {
    id: 602,
    name: "Café da Manhã",
    time: "07:00",
    title: "Smoothie Bowl de Manga",
    calories: 380,
    protein: 18,
    carbs: 52,
    fat: 12,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "150g de manga congelada",
      "1 banana",
      "200ml de leite de coco",
      "30g de proteína vegetal",
      "Granola vegana",
      "Coco ralado",
      "Sementes de chia"
    ],
    instructions: [
      "Bata manga, banana e leite de coco",
      "Adicione proteína vegetal",
      "Despeje na tigela",
      "Decore com granola, coco e chia"
    ],
    consumed: false
  },

  // Almoço Vegano
  {
    id: 603,
    name: "Almoço",
    time: "12:30",
    title: "Hambúrguer de Grão-de-Bico",
    calories: 520,
    protein: 22,
    carbs: 68,
    fat: 16,
    prepTime: "25 min",
    servings: 1,
    ingredients: [
      "150g de grão-de-bico cozido",
      "1 pão integral",
      "1/2 abacate",
      "Folhas verdes",
      "Tomate",
      "Cebola roxa",
      "Molho tahine"
    ],
    instructions: [
      "Amasse o grão-de-bico e tempere",
      "Faça hambúrguer e grelhe",
      "Monte o sanduíche com vegetais",
      "Finalize with molho tahine"
    ],
    consumed: false
  },
  {
    id: 604,
    name: "Almoço",
    time: "12:30",
    title: "Salada de Quinoa com Tofu",
    calories: 480,
    protein: 28,
    carbs: 52,
    fat: 18,
    prepTime: "20 min",
    servings: 1,
    ingredients: [
      "80g de quinoa",
      "100g de tofu firme",
      "Mix de folhas verdes",
      "1 cenoura ralada",
      "1/2 pepino",
      "Nozes",
      "Vinagrete de limão"
    ],
    instructions: [
      "Cozinhe a quinoa e deixe esfriar",
      "Grelhe o tofu temperado",
      "Monte a salada com todos os vegetais",
      "Tempere com vinagrete"
    ],
    consumed: false
  },

  // Lanche Vegano
  {
    id: 605,
    name: "Lanche da Tarde",
    time: "15:30",
    title: "Energy Balls de Tâmara",
    calories: 260,
    protein: 8,
    carbs: 35,
    fat: 12,
    prepTime: "10 min",
    servings: 1,
    ingredients: [
      "6 tâmaras sem caroço",
      "30g de castanhas mistas",
      "1 colher de cacau em pó",
      "1 colher de pasta de amendoim",
      "Coco ralado para cobrir"
    ],
    instructions: [
      "Processe tâmaras e castanhas",
      "Adicione cacau e pasta de amendoim",
      "Forme bolinhas",
      "Passe no coco ralado"
    ],
    consumed: false
  },

  // Jantar Vegano
  {
    id: 606,
    name: "Jantar",
    time: "19:00",
    title: "Risotto de Cogumelos Vegano",
    calories: 450,
    protein: 16,
    carbs: 68,
    fat: 14,
    prepTime: "35 min",
    servings: 1,
    ingredients: [
      "80g de arroz arbóreo",
      "150g de mix de cogumelos",
      "500ml de caldo de legumes",
      "Levedo nutricional",
      "Vinho branco vegano",
      "Cebola e alho",
      "Azeite de oliva"
    ],
    instructions: [
      "Refogue cebola e cogumelos",
      "Adicione arroz e vinho",
      "Vá adicionando caldo aos poucos",
      "Finalize com levedo nutricional"
    ],
    consumed: false
  }
];
