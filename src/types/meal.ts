
export interface Meal {
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

export interface MealState {
  meals: Meal[];
  consumedMeals: number[];
  markMealAsConsumed: (mealId: number) => void;
  generateNewPlan: (dietaryPreferences?: string[]) => void;
  substituteMeal: (mealId: number, dietaryPreferences?: string[]) => void;
}
