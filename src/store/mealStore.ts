
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Meal, MealState } from '@/types/meal';
import { defaultMeals } from '@/data/defaultMeals';
import { generateNewMealPlan, getAlternativeMeal } from '@/utils/mealUtils';

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

      generateNewPlan: (dietaryPreferences?: string[]) => {
        const newMeals = generateNewMealPlan(dietaryPreferences);
        set({ meals: newMeals, consumedMeals: [] });
      },

      substituteMeal: (mealId: number, dietaryPreferences?: string[]) => {
        const { meals } = get();
        const mealToReplace = meals.find(meal => meal.id === mealId);
        if (!mealToReplace) return;

        const newMeal = getAlternativeMeal(mealToReplace.name, dietaryPreferences);
        if (!newMeal) return;

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
