
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat, Check } from "lucide-react";
import { useMealStore } from "@/store/mealStore";
import { useToast } from "@/hooks/use-toast";

export const MealPlan = () => {
  const { meals, markMealAsConsumed, generateNewPlan, substituteMeal } = useMealStore();
  const { toast } = useToast();

  const handleMarkAsConsumed = (mealId: number, mealTitle: string, isConsumed: boolean) => {
    markMealAsConsumed(mealId);
    toast({
      title: isConsumed ? "Refeição desmarcada" : "Refeição marcada como consumida!",
      description: isConsumed ? `${mealTitle} foi desmarcada` : `${mealTitle} foi marcada como consumida`,
    });
  };

  const handleSubstituteMeal = (mealId: number) => {
    substituteMeal(mealId);
    toast({
      title: "Refeição substituída!",
      description: "Uma nova opção foi gerada para você",
    });
  };

  const handleGenerateNewPlan = () => {
    generateNewPlan();
    toast({
      title: "Novo plano gerado!",
      description: "Seu plano de refeições foi atualizado",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Seu Plano de Hoje</h3>
        <Button 
          variant="outline" 
          className="border-green-500 text-green-600 hover:bg-green-50"
          onClick={handleGenerateNewPlan}
        >
          Gerar Novo Plano
        </Button>
      </div>

      <div className="grid gap-6">
        {meals.map((meal) => (
          <Card 
            key={meal.id} 
            className={`glass-effect card-hover overflow-hidden transition-all ${
              meal.consumed ? 'bg-green-50 border-green-200' : ''
            }`}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {meal.name} • {meal.time}
                    {meal.consumed && (
                      <Check className="h-3 w-3 ml-1 text-green-600" />
                    )}
                  </Badge>
                  <CardTitle className={`text-xl ${meal.consumed ? 'text-green-700' : ''}`}>
                    {meal.title}
                  </CardTitle>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${meal.consumed ? 'text-green-700' : 'text-green-600'}`}>
                    {meal.calories}
                  </div>
                  <div className="text-sm text-gray-500">calorias</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Macros */}
              <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Proteína: {meal.protein}g</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Carbs: {meal.carbs}g</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Gordura: {meal.fat}g</span>
                </div>
              </div>

              {/* Info */}
              <div className="flex gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{meal.prepTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{meal.servings} porção</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <ChefHat className="h-4 w-4" />
                  Ingredientes:
                </h4>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  {meal.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span>{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <h4 className="font-semibold">Modo de preparo:</h4>
                <ol className="text-sm space-y-1">
                  {meal.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="bg-green-100 text-green-800 rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  size="sm" 
                  className={meal.consumed ? "bg-green-600 hover:bg-green-700 text-white" : "health-gradient text-white"}
                  onClick={() => handleMarkAsConsumed(meal.id, meal.title, meal.consumed)}
                >
                  {meal.consumed ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Consumido
                    </>
                  ) : (
                    "Marcar como Consumido"
                  )}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleSubstituteMeal(meal.id)}
                >
                  Substituir Refeição
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
