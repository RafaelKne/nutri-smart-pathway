
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/authStore";
import { useMealStore } from "@/store/mealStore";
import { ProfileSetup } from "./ProfileSetup";
import { MealPlan } from "./MealPlan";
import { Calendar, User, TrendingUp, Target, Clock } from "lucide-react";

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { meals } = useMealStore();

  if (!user?.profile) {
    return <ProfileSetup />;
  }

  // Calcular progresso baseado nas refeições consumidas
  const consumedMeals = meals.filter(meal => meal.consumed);
  const totalConsumed = consumedMeals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fat: acc.fat + meal.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const todayProgress = {
    calories: {
      consumed: totalConsumed.calories,
      target: 1800
    },
    protein: {
      consumed: totalConsumed.protein,
      target: 120
    },
    carbs: {
      consumed: totalConsumed.carbs,
      target: 200
    },
    fat: {
      consumed: totalConsumed.fat,
      target: 60
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
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
            <Progress value={todayProgress.calories.consumed / todayProgress.calories.target * 100} className="h-2" />
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
            <Progress value={todayProgress.protein.consumed / todayProgress.protein.target * 100} className="h-2" />
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
            <Progress value={todayProgress.carbs.consumed / todayProgress.carbs.target * 100} className="h-2" />
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
            <Progress value={todayProgress.fat.consumed / todayProgress.fat.target * 100} className="h-2" />
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
    </div>
  );
};
