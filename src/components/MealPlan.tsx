
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Flame, ChefHat } from "lucide-react";

export const MealPlan = () => {
  const meals = [
    {
      id: 1,
      name: "Café da Manhã",
      time: "07:00",
      title: "Omelete com Aveia e Frutas",
      calories: 420,
      protein: 25,
      carbs: 35,
      fat: 18,
      prepTime: "15 min",
      servings: 1,
      ingredients: [
        "2 ovos",
        "30g de aveia",
        "1 banana pequena",
        "1 colher de sopa de azeite",
        "50ml de leite desnatado"
      ],
      instructions: [
        "Bata os ovos com o leite",
        "Aqueça o azeite na frigideira",
        "Despeje os ovos e cozinhe por 3-4 minutos",
        "Sirva com aveia e banana fatiada"
      ]
    },
    {
      id: 2,
      name: "Almoço",
      time: "12:30",
      title: "Peito de Frango Grelhado com Quinoa",
      calories: 580,
      protein: 45,
      carbs: 55,
      fat: 12,
      prepTime: "25 min",
      servings: 1,
      ingredients: [
        "150g de peito de frango",
        "80g de quinoa",
        "100g de brócolis",
        "1 tomate médio",
        "Temperos a gosto"
      ],
      instructions: [
        "Tempere o frango e grelhe por 8-10 minutos",
        "Cozinhe a quinoa conforme instruções da embalagem",
        "Refogue o brócolis rapidamente",
        "Monte o prato e sirva"
      ]
    },
    {
      id: 3,
      name: "Lanche da Tarde",
      time: "15:30",
      title: "Iogurte com Granola e Frutas Vermelhas",
      calories: 280,
      protein: 15,
      carbs: 35,
      fat: 8,
      prepTime: "5 min",
      servings: 1,
      ingredients: [
        "150g de iogurte grego",
        "30g de granola",
        "80g de frutas vermelhas",
        "1 colher de chá de mel"
      ],
      instructions: [
        "Coloque o iogurte na tigela",
        "Adicione as frutas vermelhas",
        "Polvilhe a granola por cima",
        "Finalize com mel"
      ]
    },
    {
      id: 4,
      name: "Jantar",
      time: "19:00",
      title: "Salmão Assado com Batata Doce",
      calories: 520,
      protein: 35,
      carbs: 40,
      fat: 22,
      prepTime: "30 min",
      servings: 1,
      ingredients: [
        "120g de filé de salmão",
        "200g de batata doce",
        "100g de aspargos",
        "1 colher de sopa de azeite",
        "Ervas finas"
      ],
      instructions: [
        "Preaqueça o forno a 200°C",
        "Corte a batata doce em cubos e tempere",
        "Asse por 20 minutos",
        "Adicione o salmão e aspargos, asse por mais 15 minutos"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Seu Plano de Hoje</h3>
        <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
          Gerar Novo Plano
        </Button>
      </div>

      <div className="grid gap-6">
        {meals.map((meal) => (
          <Card key={meal.id} className="glass-effect card-hover overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    {meal.name} • {meal.time}
                  </Badge>
                  <CardTitle className="text-xl">{meal.title}</CardTitle>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{meal.calories}</div>
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
                <Button size="sm" className="health-gradient text-white">
                  Marcar como Consumido
                </Button>
                <Button size="sm" variant="outline">
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
