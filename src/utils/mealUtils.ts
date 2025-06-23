
import { Meal } from "@/types/meal";
import { defaultMeals } from "@/data/defaultMeals";
import { alternativeMeals } from "@/data/alternativeMeals";
import { basicMeals } from "@/data/basicMeals";
import { vegetarianMeals, veganMeals } from "@/data/vegetarianMeals";

// Função para calcular TMB (Taxa Metabólica Basal)
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
      return Math.round(validTdee * 0.8); // Déficit de 20%
    case 'ganho_massa':
      return Math.round(validTdee * 1.15); // Superávit de 15%
    case 'manutencao':
    default:
      return Math.round(validTdee);
  }
};

// Função para calcular macronutrientes
const calculateMacros = (calories: number, goal: string) => {
  const validCalories = isNaN(calories) || calories <= 0 ? 1800 : calories;
  let proteinRatio = 0.25;
  let carbRatio = 0.45;
  let fatRatio = 0.30;

  if (goal === 'ganho_massa') {
    proteinRatio = 0.30;
    carbRatio = 0.40;
    fatRatio = 0.30;
  } else if (goal === 'emagrecimento') {
    proteinRatio = 0.35;
    carbRatio = 0.35;
    fatRatio = 0.30;
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
    availableMeals = [...defaults, ...alternatives, ...basics];
    console.log('Using ONLY regular meals (with meat):', availableMeals.length);
  }

  return availableMeals;
};

export const getRandomMeal = (meals: Meal[]): Meal => {
  return meals[Math.floor(Math.random() * meals.length)];
};

// Função para ajustar valores nutricionais baseado no perfil
const adjustMealNutrition = (meal: Meal, userProfile: any, mealIndex: number, totalMeals: number) => {
  if (!userProfile || !userProfile.weight || !userProfile.height || !userProfile.age) {
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
  
  // Calcular necessidades diárias
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const dailyCalories = calculateDailyCalories(tdee, goal);
  const dailyMacros = calculateMacros(dailyCalories, goal);

  // Distribuição de calorias por refeição
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
  const mealsPerDay = userProfile?.mealsPerDay || 4;
  
  let mealTypes: string[] = [];
  
  if (mealsPerDay === 3) {
    mealTypes = ["Café da Manhã", "Almoço", "Jantar"];
  } else if (mealsPerDay === 4) {
    mealTypes = ["Café da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  } else {
    mealTypes = ["Café da Manhã", "Lanche da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  }
  
  return mealTypes.map((type, index) => {
    const availableMeals = getMealsByType(type, dietaryPreferences);
    const selectedMeal = getRandomMeal(availableMeals);
    const adjustedMeal = adjustMealNutrition(selectedMeal, userProfile, index, mealsPerDay);
    
    return {
      ...adjustedMeal,
      id: Date.now() + index + 1,
      consumed: false
    };
  });
};

export const getAlternativeMeal = (mealName: string, dietaryPreferences: string[] = [], userProfile?: any): Meal | null => {
  const availableMeals = getMealsByType(mealName, dietaryPreferences);
  
  if (availableMeals.length === 0) {
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
