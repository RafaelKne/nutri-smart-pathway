
import { Meal } from "@/types/meal";
import { defaultMeals } from "@/data/defaultMeals";
import { alternativeMeals } from "@/data/alternativeMeals";

export const getMealsByType = (mealType: string): Meal[] => {
  const defaults = defaultMeals.filter(meal => meal.name === mealType);
  const alternatives = alternativeMeals.filter(meal => meal.name === mealType);
  return [...defaults, ...alternatives];
};

export const getRandomMeal = (meals: Meal[]): Meal => {
  return meals[Math.floor(Math.random() * meals.length)];
};

export const generateNewMealPlan = (): Meal[] => {
  const mealTypes = ["Café da Manhã", "Almoço", "Lanche da Tarde", "Jantar"];
  
  return mealTypes.map((type, index) => {
    const availableMeals = getMealsByType(type);
    const selectedMeal = getRandomMeal(availableMeals);
    
    return {
      ...selectedMeal,
      id: Date.now() + index + 1,
      consumed: false
    };
  });
};

export const getAlternativeMeal = (mealName: string): Meal | null => {
  const alternatives = alternativeMeals.filter(meal => meal.name === mealName);
  
  if (alternatives.length === 0) {
    return null;
  }
  
  return {
    ...getRandomMeal(alternatives),
    id: Date.now(),
    consumed: false
  };
};
