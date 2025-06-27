
import { Meal } from "@/types/meal";
import { defaultMeals } from "@/data/defaultMeals";
import { alternativeMeals } from "@/data/alternativeMeals";
import { basicMeals } from "@/data/basicMeals";
import { vegetarianMeals, veganMeals } from "@/data/vegetarianMeals";
import { extraMeals } from "@/data/extraMeals";

// Função para validar se uma refeição tem conteúdo válido
const isValidMeal = (meal: Meal): boolean => {
  // Verifica se tem título e não é apenas pontos ou espaços
  if (!meal.title || meal.title.trim() === '' || meal.title.trim() === '.') {
    return false;
  }
  
  // Verifica se tem ingredientes válidos
  const hasValidIngredients = meal.ingredients && 
    meal.ingredients.some(ingredient => 
      ingredient && 
      ingredient.trim() !== '' && 
      ingredient.trim() !== '.' &&
      ingredient.length > 1
    );
  
  // Verifica se tem instruções válidas
  const hasValidInstructions = meal.instructions && 
    meal.instructions.some(instruction => 
      instruction && 
      instruction.trim() !== '' && 
      instruction.trim() !== '.' &&
      instruction.length > 1
    );
  
  // A refeição deve ter pelo menos ingredientes OU instruções válidos
  return hasValidIngredients || hasValidInstructions;
};

// Função para calcular TMB (Taxa Metabólica Basal) usando a fórmula de Harris-Benedict
const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  // Garantir que todos os valores são números válidos
  const validWeight = isNaN(weight) || weight <= 0 ? 70 : weight;
  const validHeight = isNaN(height) || height <= 0 ? 170 : height;
  const validAge = isNaN(age) || age <= 0 ? 25 : age;
  
  if (gender === 'masculino') {
    return 88.362 + (13.397 * validWeight) + (4.799 * validHeight) - (5.677 * validAge);
  } else {
    return 447.593 + (9.247 * validWeight) + (3.098 * validHeight) - (4.330 * validAge);
  }
};

// Função para calcular TDEE (Total Daily Energy Expenditure)
const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const validBmr = isNaN(bmr) || bmr <= 0 ? 1500 : bmr;
  const activityMultipliers = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725
  };
  return validBmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
};

// Função para calcular calorias diárias baseadas no objetivo
const calculateDailyCalories = (tdee: number, goal: string): number => {
  const validTdee = isNaN(tdee) || tdee <= 0 ? 1800 : tdee;
  switch (goal) {
    case 'emagrecimento':
      return Math.round(validTdee * 0.85); // Déficit de 15%
    case 'ganho_massa':
      return Math.round(validTdee * 1.15); // Superávit de 15%
    case 'manutencao':
    default:
      return Math.round(validTdee);
  }
};

// Função para calcular macronutrientes baseados no objetivo
const calculateMacros = (calories: number, goal: string) => {
  const validCalories = isNaN(calories) || calories <= 0 ? 1800 : calories;
  let proteinRatio = 0.25;
  let carbRatio = 0.45;
  let fatRatio = 0.30;

  if (goal === 'ganho_massa') {
    proteinRatio = 0.30; // Mais proteína para ganho de massa
    carbRatio = 0.40;
    fatRatio = 0.30;
  } else if (goal === 'emagrecimento') {
    proteinRatio = 0.35; // Mais proteína para preservar massa muscular
    carbRatio = 0.30; // Menos carboidratos
    fatRatio = 0.35;
  }

  return {
    protein: Math.round((validCalories * proteinRatio) / 4), // 4 cal/g
    carbs: Math.round((validCalories * carbRatio) / 4), // 4 cal/g
    fat: Math.round((validCalories * fatRatio) / 9) // 9 cal/g
  };
};

export const getMealsByType = (mealType: string, dietaryPreferences: string[] = []): Meal[] => {
  let availableMeals: Meal[] = [];

  console.log('Filtering meals for type:', mealType, 'with preferences:', dietaryPreferences);

  // Verificar se a pessoa é vegana
  if (dietaryPreferences.includes('Vegano')) {
    availableMeals = veganMeals.filter(meal => meal.name === mealType);
    console.log('Using ONLY vegan meals:', availableMeals.length);
    
    // Se não houver refeições veganas para este tipo, usar vegetarianas
    if (availableMeals.length === 0) {
      availableMeals = vegetarianMeals.filter(meal => meal.name === mealType);
      console.log('Fallback to vegetarian meals:', availableMeals.length);
    }
  }
  // Verificar se a pessoa é vegetariana (mas não vegana)
  else if (dietaryPreferences.includes('Vegetariano') && !dietaryPreferences.includes('Vegano')) {
    const vegetarian = vegetarianMeals.filter(meal => meal.name === mealType);
    const vegan = veganMeals.filter(meal => meal.name === mealType);
    availableMeals = [...vegetarian, ...vegan];
    console.log('Using vegetarian + vegan meals:', availableMeals.length);
  }
  // Para pessoas SEM preferências dietéticas especiais (carnívoras)
  else {
    const defaults = defaultMeals.filter(meal => meal.name === mealType);
    const alternatives = alternativeMeals.filter(meal => meal.name === mealType);
    const basics = basicMeals.filter(meal => meal.name === mealType);
    const extras = extraMeals.filter(meal => meal.name === mealType);
    availableMeals = [...defaults, ...alternatives, ...basics, ...extras];
    console.log('Using ALL regular meals (with meat):', availableMeals.length);
  }

  // Filtrar apenas refeições válidas
  const validMeals = availableMeals.filter(isValidMeal);
  console.log('Valid meals after filtering:', validMeals.length);
  
  // Se ainda não há refeições válidas, usar refeições de outros tipos como fallback
  if (validMeals.length === 0) {
    console.log('No valid meals found, using fallback strategy');
    
    // Tentar usar refeições similares (ex: usar "Café da Manhã" para "Lanche da Manhã")
    const fallbackTypes = ['Café da Manhã', 'Lanche da Tarde', 'Almoço', 'Jantar'];
    
    for (const fallbackType of fallbackTypes) {
      if (fallbackType === mealType) continue;
      
      let fallbackMeals: Meal[] = [];
      
      if (dietaryPreferences.includes('Vegano')) {
        fallbackMeals = veganMeals.filter(meal => meal.name === fallbackType);
        if (fallbackMeals.length === 0) {
          fallbackMeals = vegetarianMeals.filter(meal => meal.name === fallbackType);
        }
      } else if (dietaryPreferences.includes('Vegetariano')) {
        const vegetarian = vegetarianMeals.filter(meal => meal.name === fallbackType);
        const vegan = veganMeals.filter(meal => meal.name === fallbackType);
        fallbackMeals = [...vegetarian, ...vegan];
      } else {
        const defaults = defaultMeals.filter(meal => meal.name === fallbackType);
        const alternatives = alternativeMeals.filter(meal => meal.name === fallbackType);
        const basics = basicMeals.filter(meal => meal.name === fallbackType);
        const extras = extraMeals.filter(meal => meal.name === fallbackType);
        fallbackMeals = [...defaults, ...alternatives, ...basics, ...extras];
      }
      
      const validFallbacks = fallbackMeals.filter(isValidMeal);
      if (validFallbacks.length > 0) {
        console.log(`Using fallback meals from ${fallbackType}:`, validFallbacks.length);
        return validFallbacks;
      }
    }
  }
  
  return validMeals;
};

export const getRandomMeal = (meals: Meal[]): Meal => {
  if (meals.length === 0) {
    // Retornar uma refeição padrão se não houver opções válidas
    return {
      id: Date.now(),
      name: "Refeição",
      time: "12:00",
      title: "Refeição Simples",
      calories: 300,
      protein: 20,
      carbs: 30,
      fat: 10,
      prepTime: "15 min",
      servings: 1,
      ingredients: ["Ingredientes não disponíveis"],
      instructions: ["Preparar conforme preferência"],
      consumed: false
    };
  }
  
  return meals[Math.floor(Math.random() * meals.length)];
};

const adjustMealNutrition = (meal: Meal, userProfile: any, mealIndex: number, totalMeals: number) => {
  if (!userProfile || !userProfile.weight || !userProfile.height || !userProfile.age) {
    console.log('Profile incomplete, using default values');
    // Se não tiver perfil completo, usar valores padrão da refeição
    return {
      ...meal,
      calories: meal.calories || 300,
      protein: meal.protein || 20,
      carbs: meal.carbs || 30,
      fat: meal.fat || 10
    };
  }

  const { weight, height, age, gender, goal, activityLevel } = userProfile;
  
  console.log('Calculating nutrition for profile:', { weight, height, age, gender, goal, activityLevel });
  
  // Calcular necessidades diárias
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const dailyCalories = calculateDailyCalories(tdee, goal);
  const dailyMacros = calculateMacros(dailyCalories, goal);

  console.log('Daily targets:', { bmr: Math.round(bmr), tdee: Math.round(tdee), dailyCalories, dailyMacros });

  // Distribuição de calorias por refeição baseada no número de refeições
  const mealCalorieDistribution = {
    3: [0.25, 0.45, 0.30], // café, almoço, jantar
    4: [0.25, 0.35, 0.15, 0.25], // café, almoço, lanche, jantar
    5: [0.20, 0.30, 0.15, 0.20, 0.15] // café, lanche1, almoço, lanche2, jantar
  };

  const distribution = mealCalorieDistribution[totalMeals as keyof typeof mealCalorieDistribution] || mealCalorieDistribution[4];
  const mealCalories = Math.round(dailyCalories * distribution[mealIndex]);
  const mealProtein = Math.round(dailyMacros.protein * distribution[mealIndex]);
  const mealCarbs = Math.round(dailyMacros.carbs * distribution[mealIndex]);
  const mealFat = Math.round(dailyMacros.fat * distribution[mealIndex]);

  console.log('Meal nutrition adjusted:', { mealCalories, mealProtein, mealCarbs, mealFat });

  // Garantir que os valores são válidos
  return {
    ...meal,
    calories: isNaN(mealCalories) ? meal.calories || 300 : Math.max(100, mealCalories),
    protein: isNaN(mealProtein) ? meal.protein || 20 : Math.max(5, mealProtein),
    carbs: isNaN(mealCarbs) ? meal.carbs || 30 : Math.max(5, mealCarbs),
    fat: isNaN(mealFat) ? meal.fat || 10 : Math.max(3, mealFat)
  };
};

export const generateNewMealPlan = (dietaryPreferences: string[] = [], userProfile?: any): Meal[] => {
  console.log('Generating new meal plan with profile:', userProfile);
  
  // Usar o número de refeições do perfil do usuário, com fallback para 4
  // Garantir que é um número, não string
  const mealsPerDay = parseInt(userProfile?.mealsPerDay) || 4;
  
  console.log('Generating plan with', mealsPerDay, 'meals per day');
  
  // Definir tipos de refeição baseado no número escolhido
  let mealTypes: string[] = [];
  
  if (mealsPerDay === 3) {
    mealTypes = ["Café da Manhã", "Almoço", "Jantar"];
  } else if (mealsPerDay === 4) {
    mealTypes = ["Café da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  } else if (mealsPerDay === 5) {
    mealTypes = ["Café da Manhã", "Lanche da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  } else {
    // Fallback for any other number
    console.warn('Unexpected mealsPerDay value:', mealsPerDay, 'using default 4 meals');
    mealTypes = ["Café da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  }
  
  console.log('Meal types to generate:', mealTypes);
  
  const generatedMeals = mealTypes.map((type, index) => {
    console.log(`Generating meal ${index + 1}/${mealTypes.length}: ${type}`);
    
    const availableMeals = getMealsByType(type, dietaryPreferences);
    console.log(`Found ${availableMeals.length} available meals for ${type}`);
    
    if (availableMeals.length === 0) {
      console.error(`No meals found for type: ${type} with preferences:`, dietaryPreferences);
      return null;
    }
    
    const selectedMeal = getRandomMeal(availableMeals);
    console.log(`Selected meal: ${selectedMeal.title}`);
    
    const adjustedMeal = adjustMealNutrition(selectedMeal, userProfile, index, mealsPerDay);
    
    return {
      ...adjustedMeal,
      id: Date.now() + index + 1,
      consumed: false
    };
  }).filter(meal => meal !== null);
  
  console.log('Generated meals plan:', generatedMeals.map(m => ({ title: m.title, calories: m.calories })));
  
  return generatedMeals;
};

export const getAlternativeMeal = (mealName: string, dietaryPreferences: string[] = [], userProfile?: any): Meal | null => {
  const availableMeals = getMealsByType(mealName, dietaryPreferences);
  
  if (availableMeals.length === 0) {
    console.log('No alternative meals found for', mealName);
    return null;
  }
  
  const randomMeal = getRandomMeal(availableMeals);
  
  // Ajustar nutrição se tiver perfil do usuário
  let adjustedMeal = randomMeal;
  if (userProfile) {
    const mealIndex = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'].indexOf(mealName);
    if (mealIndex !== -1) {
      adjustedMeal = adjustMealNutrition(randomMeal, userProfile, mealIndex, userProfile.mealsPerDay || 4);
    }
  }
  
  return {
    ...adjustedMeal,
    id: Date.now(),
    consumed: false
  };
};
