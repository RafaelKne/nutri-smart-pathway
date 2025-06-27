import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Check } from "lucide-react";
import { useMealStore } from "@/store/mealStore";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { WaterTracker } from "./WaterTracker";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import React from "react";
const MealCard = ({
  meal,
  onMarkConsumed,
  onSubstitute
}) => {
  const {
    t
  } = useApp();
  return <Card className={`glass-effect card-hover overflow-hidden transition-all ${meal.consumed ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700" : ""}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <Badge variant="secondary" className="mb-2">
              {meal.name} • {meal.time}
              {meal.consumed && <Check className="h-3 w-3 ml-1 text-green-600" />}
            </Badge>
            <CardTitle className={`text-xl ${meal.consumed ? "text-green-700 dark:text-green-400" : ""}`}>
              {meal.title}
            </CardTitle>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${meal.consumed ? "text-green-700 dark:text-green-400" : "text-green-600"}`}>
              {meal.calories}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('calories')}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Macros */}
        <div className="flex gap-6 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{t('protein')}: {meal.protein}g</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>{t('carbs')}: {meal.carbs}g</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span>{t('fat')}: {meal.fat}g</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{meal.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{meal.servings} {t('servings')}</span>
          </div>
        </div>

        {/* Ingredients */}
        {meal.ingredients && meal.ingredients.length > 0 && meal.ingredients.some(ingredient => ingredient && ingredient.trim() !== '' && ingredient !== '.') && <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <ChefHat className="h-4 w-4" />
              {t('ingredients')}
            </h4>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {meal.ingredients.filter(ingredient => ingredient && ingredient.trim() !== '' && ingredient !== '.').map((ingredient, index) => <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>{ingredient}</span>
                </div>)}
            </div>
          </div>}

        {/* Instructions */}
        {meal.instructions && meal.instructions.length > 0 && meal.instructions.some(instruction => instruction && instruction.trim() !== '' && instruction !== '.') && <div className="space-y-2">
            <h4 className="font-semibold">{t('instructions')}</h4>
            <ol className="text-sm space-y-1">
              {meal.instructions.filter(instruction => instruction && instruction.trim() !== '' && instruction !== '.').map((instruction, index) => <li key={index} className="flex gap-2">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>)}
            </ol>
          </div>}

        <div className="flex gap-2 pt-2">
          <Button size="sm" className={meal.consumed ? "bg-green-600 hover:bg-green-700 text-white" : "health-gradient text-white"} onClick={() => onMarkConsumed(meal.id, meal.title, meal.consumed)}>
            {meal.consumed ? <>
                <Check className="h-4 w-4 mr-1" />
                {t('consumed')}
              </> : t('markAsConsumed')}
          </Button>
          <Button size="sm" variant="outline" onClick={() => onSubstitute(meal.id)}>
            {t('substituteMeal')}
          </Button>
        </div>
      </CardContent>
    </Card>;
};
export const MealPlan = () => {
  const {
    meals,
    markMealAsConsumed,
    generateNewPlan,
    substituteMeal
  } = useMealStore();
  const {
    user
  } = useAuthStore();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  const {
    t
  } = useApp();
  const userDietaryPreferences = user?.profile?.dietaryPreferences || [];
  const userProfile = user?.profile;
  const handleMarkAsConsumed = (mealId: number, mealTitle: string, isConsumed: boolean) => {
    markMealAsConsumed(mealId);
    toast({
      title: isConsumed ? "Refeição desmarcada" : "Refeição marcada como consumida!",
      description: isConsumed ? `${mealTitle} foi desmarcada` : `${mealTitle} foi marcada como consumida`
    });
  };
  const handleSubstituteMeal = (mealId: number) => {
    substituteMeal(mealId, userDietaryPreferences, userProfile);
    toast({
      title: "Refeição substituída!",
      description: "Uma nova opção foi gerada respeitando suas preferências dietéticas"
    });
  };
  const handleGenerateNewPlan = () => {
    generateNewPlan(userDietaryPreferences, userProfile);
    toast({
      title: "Novo plano gerado!",
      description: "Seu plano de refeições foi atualizado respeitando suas preferências dietéticas"
    });
  };
  return <div className="space-y-6">
      {/* Water Tracker */}
      <WaterTracker />

      <div className="flex items-center justify-between bg-slate-50">
        <div>
          <h3 className="text-2xl font-bold text-zinc-950">{t('mealPlan')}</h3>
          {userDietaryPreferences.length > 0 && <div className="flex gap-2 mt-2">
              {userDietaryPreferences.map(pref => <Badge key={pref} variant="outline" className="text-green-600 border-green-300">
                  {pref}
                </Badge>)}
            </div>}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" onClick={handleGenerateNewPlan}>
            {t('generateNewPlan')}
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {meals && meals.length > 0 && meals.map(meal => <MealCard key={meal.id} meal={meal} onMarkConsumed={handleMarkAsConsumed} onSubstitute={handleSubstituteMeal} />)}
      </div>
    </div>;
};