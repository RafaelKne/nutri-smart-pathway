
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/authStore";
import { useMealStore } from "@/store/mealStore";
import { ProfileSetup } from "./ProfileSetup";
import { MealPlan } from "./MealPlan";
import { Calendar, User, TrendingUp, Target, Clock } from "lucide-react";

// Função para calcular TMB (Taxa Metabólica Basal)
const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === 'masculino') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
};

// Função para calcular TDEE
const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725
  };
  return bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
};

// Função para calcular calorias diárias baseadas no objetivo
const calculateDailyCalories = (tdee: number, goal: string): number => {
  switch (goal) {
    case 'emagrecimento':
      return Math.round(tdee * 0.85); // Déficit de 15%
    case 'ganho_massa':
      return Math.round(tdee * 1.15); // Superávit de 15%
    case 'manutencao':
    default:
      return Math.round(tdee);
  }
};

// Função para calcular macronutrientes
const calculateMacros = (calories: number, goal: string) => {
  let proteinRatio = 0.25;
  let carbRatio = 0.45;
  let fatRatio = 0.30;

  if (goal === 'ganho_massa') {
    proteinRatio = 0.30;
    carbRatio = 0.40;
    fatRatio = 0.30;
  } else if (goal === 'emagrecimento') {
    proteinRatio = 0.35;
    carbRatio = 0.30;
    fatRatio = 0.35;
  }

  return {
    protein: Math.round((calories * proteinRatio) / 4), // 4 cal/g
    carbs: Math.round((calories * carbRatio) / 4), // 4 cal/g
    fat: Math.round((calories * fatRatio) / 9) // 9 cal/g
  };
};

export const Dashboard = () => {
  const { user } = useAuthStore();
  const { meals } = useMealStore();

  if (!user?.profile) {
    return <ProfileSetup />;
  }

  // Calcular metas diárias baseadas no perfil do usuário
  const { weight, height, age, gender, goal, activityLevel } = user.profile;
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const dailyCalories = calculateDailyCalories(tdee, goal);
  const dailyMacros = calculateMacros(dailyCalories, goal);

  // Calcular progresso baseado nas refeições consumidas
  const consumedMeals = meals.filter(meal => meal.consumed);
  const totalConsumed = consumedMeals.reduce((acc, meal) => ({
    calories: acc.calories + (meal.calories || 0),
    protein: acc.protein + (meal.protein || 0),
    carbs: acc.carbs + (meal.carbs || 0),
    fat: acc.fat + (meal.fat || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Garantir que os valores não sejam NaN
  const safeCalories = isNaN(totalConsumed.calories) ? 0 : totalConsumed.calories;
  const safeProtein = isNaN(totalConsumed.protein) ? 0 : totalConsumed.protein;
  const safeCarbs = isNaN(totalConsumed.carbs) ? 0 : totalConsumed.carbs;
  const safeFat = isNaN(totalConsumed.fat) ? 0 : totalConsumed.fat;

  const todayProgress = {
    calories: {
      consumed: safeCalories,
      target: dailyCalories
    },
    protein: {
      consumed: safeProtein,
      target: dailyMacros.protein
    },
    carbs: {
      consumed: safeCarbs,
      target: dailyMacros.carbs
    },
    fat: {
      consumed: safeFat,
      target: dailyMacros.fat
    }
  };

  // Calcular porcentagens de forma segura
  const caloriesProgress = Math.min((todayProgress.calories.consumed / todayProgress.calories.target) * 100, 100);
  const proteinProgress = Math.min((todayProgress.protein.consumed / todayProgress.protein.target) * 100, 100);
  const carbsProgress = Math.min((todayProgress.carbs.consumed / todayProgress.carbs.target) * 100, 100);
  const fatProgress = Math.min((todayProgress.fat.consumed / todayProgress.fat.target) * 100, 100);

  // Objetivo em português
  const goalLabels = {
    emagrecimento: 'Emagrecimento',
    ganho_massa: 'Ganho de Massa',
    manutencao: 'Manutenção'
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Olá, {user.name}! 👋</h2>
        <p className="opacity-90">
          Objetivo: {goalLabels[goal]} • Meta diária: {dailyCalories} calorias
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
    </div>
  );
};
