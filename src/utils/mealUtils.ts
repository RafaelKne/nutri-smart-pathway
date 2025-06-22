
import { Meal } from "@/types/meal";
import { defaultMeals } from "@/data/defaultMeals";
import { alternativeMeals } from "@/data/alternativeMeals";
import { vegetarianMeals, veganMeals } from "@/data/vegetarianMeals";

export const getMealsByType = (mealType: string, dietaryPreferences: string[] = []): Meal[] => {
  let availableMeals: Meal[] = [];

  // Se for vegano, usar apenas refeições veganas
  if (dietaryPreferences.includes('Vegano')) {
    availableMeals = veganMeals.filter(meal => meal.name === mealType);
  }
  // Se for vegetariano (mas não vegano), usar refeições vegetarianas + veganas
  else if (dietaryPreferences.includes('Vegetariano')) {
    const vegetarian = vegetarianMeals.filter(meal => meal.name === mealType);
    const vegan = veganMeals.filter(meal => meal.name === mealType);
    availableMeals = [...vegetarian, ...vegan];
  }
  // Se não tiver restrições, usar todas as refeições
  else {
    const defaults = defaultMeals.filter(meal => meal.name === mealType);
    const alternatives = alternativeMeals.filter(meal => meal.name === mealType);
    const vegetarian = vegetarianMeals.filter(meal => meal.name === mealType);
    const vegan = veganMeals.filter(meal => meal.name === mealType);
    availableMeals = [...defaults, ...alternatives, ...vegetarian, ...vegan];
  }

  return availableMeals;
};

export const getRandomMeal = (meals: Meal[]): Meal => {
  return meals[Math.floor(Math.random() * meals.length)];
};

export const generateNewMealPlan = (dietaryPreferences: string[] = []): Meal[] => {
  const mealTypes = ["Café da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  
  return mealTypes.map((type, index) => {
    const availableMeals = getMealsByType(type, dietaryPreferences);
    const selectedMeal = getRandomMeal(availableMeals);
    
    return {
      ...selectedMeal,
      id: Date.now() + index + 1,
      consumed: false
    };
  });
};

export const getAlternativeMeal = (mealName: string, dietaryPreferences: string[] = []): Meal | null => {
  const availableMeals = getMealsByType(mealName, dietaryPreferences);
  
  if (availableMeals.length === 0) {
    return null;
  }
  
  return {
    ...getRandomMeal(availableMeals),
    id: Date.now(),
    consumed: false
  };
};
