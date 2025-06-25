import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/authStore";
import { useMealStore } from "@/store/mealStore";
import { ProfileSetup } from "./ProfileSetup";
import { MealPlan } from "./MealPlan";
import { Calendar, User, TrendingUp, Target, Clock } from "lucide-react";
export const Dashboard = () => {
  const {
    user
  } = useAuthStore();
  const {
    meals
  } = useMealStore();
  if (!user?.profile) {
    return <ProfileSetup />;
  }

  // Calcular progresso baseado nas refeições consumidas
  const consumedMeals = meals.filter(meal => meal.consumed);
  const totalConsumed = consumedMeals.reduce((acc, meal) => ({
    calories: acc.calories + (meal.calories || 0),
    protein: acc.protein + (meal.protein || 0),
    carbs: acc.carbs + (meal.carbs || 0),
    fat: acc.fat + (meal.fat || 0)
  }), {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  });

  // Garantir que os valores não sejam NaN
  const safeCalories = isNaN(totalConsumed.calories) ? 0 : totalConsumed.calories;
  const safeProtein = isNaN(totalConsumed.protein) ? 0 : totalConsumed.protein;
  const safeCarbs = isNaN(totalConsumed.carbs) ? 0 : totalConsumed.carbs;
  const safeFat = isNaN(totalConsumed.fat) ? 0 : totalConsumed.fat;
  const todayProgress = {
    calories: {
      consumed: safeCalories,
      target: 1800
    },
    protein: {
      consumed: safeProtein,
      target: 120
    },
    carbs: {
      consumed: safeCarbs,
      target: 200
    },
    fat: {
      consumed: safeFat,
      target: 60
    }
  };

  // Calcular porcentagens de forma segura
  const caloriesProgress = Math.min(todayProgress.calories.consumed / todayProgress.calories.target * 100, 100);
  const proteinProgress = Math.min(todayProgress.protein.consumed / todayProgress.protein.target * 100, 100);
  const carbsProgress = Math.min(todayProgress.carbs.consumed / todayProgress.carbs.target * 100, 100);
  const fatProgress = Math.min(todayProgress.fat.consumed / todayProgress.fat.target * 100, 100);
  return <div className="space-y-8 bg-slate-800">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white bg-slate-600">
        <h2 className="text-2xl font-bold mb-2">Olá, {user.name}! 👋</h2>
        <p className="opacity-90">
          Aqui está seu resumo nutricional de hoje. Continue assim!
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-effect card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Calorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-2">
              {todayProgress.calories.consumed}/{todayProgress.calories.target}
            </div>
            <Progress value={caloriesProgress} className="h-2" />
            <p className="text-xs text-gray-500 mt-2">
              {Math.max(0, todayProgress.calories.target - todayProgress.calories.consumed)} restantes
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Proteína
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {todayProgress.protein.consumed}g/{todayProgress.protein.target}g
            </div>
            <Progress value={proteinProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Carboidratos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {todayProgress.carbs.consumed}g/{todayProgress.carbs.target}g
            </div>
            <Progress value={carbsProgress} className="h-2" />
          </CardContent>
        </Card>

        <Card className="glass-effect card-hover">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Gorduras
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {todayProgress.fat.consumed}g/{todayProgress.fat.target}g
            </div>
            <Progress value={fatProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Meal Plan Section */}
      <MealPlan />

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-effect card-hover">
          
        </Card>
      </div>
    </div>;
};