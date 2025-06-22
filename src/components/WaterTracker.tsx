
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplets, Plus, Minus, RotateCcw } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

export const WaterTracker = () => {
  const { user, updateWaterConsumption, resetDailyWater } = useAuthStore();
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState(250);

  const waterConsumed = user?.profile?.waterConsumed || 0;
  const dailyGoal = user?.profile?.dailyWaterGoal || 2000;
  const progressPercentage = Math.min((waterConsumed / dailyGoal) * 100, 100);

  const quickAmounts = [200, 250, 300, 500];

  const addWater = (amount: number) => {
    updateWaterConsumption(amount);
    toast({
      title: "Água adicionada!",
      description: `${amount}ml adicionados ao seu consumo diário`,
    });
  };

  const removeWater = (amount: number) => {
    updateWaterConsumption(-amount);
    toast({
      title: "Água removida",
      description: `${amount}ml removidos do seu consumo`,
    });
  };

  const resetWater = () => {
    resetDailyWater();
    toast({
      title: "Contador resetado",
      description: "Seu consumo diário foi resetado para 0ml",
    });
  };

  if (!user?.profile) {
    return (
      <Card className="glass-effect">
        <CardContent className="p-6 text-center">
          <Droplets className="h-12 w-12 mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Configure seu perfil para acessar o contador de água</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Contador de Água
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progresso Diário</span>
            <Badge variant={progressPercentage >= 100 ? "default" : "secondary"}>
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{waterConsumed}ml consumidos</span>
            <span>Meta: {dailyGoal}ml</span>
          </div>
        </div>

        {/* Water Animation */}
        <div className="relative mx-auto w-32 h-32">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200 bg-gradient-to-t from-blue-50 to-white overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-500 ease-out"
              style={{ height: `${progressPercentage}%` }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        {/* Quick Add Buttons */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Adicionar Rapidamente:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => addWater(amount)}
                className="flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
                {amount}ml
              </Button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Quantidade Personalizada:</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAmount(Math.max(50, selectedAmount - 50))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-center min-w-[80px] font-medium">
              {selectedAmount}ml
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAmount(Math.min(1000, selectedAmount + 50))}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => addWater(selectedAmount)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Plus className="h-4 w-4 mr-1" />
              Adicionar
            </Button>
            <Button
              variant="outline"
              onClick={() => removeWater(selectedAmount)}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetWater}
          className="w-full"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Resetar Dia
        </Button>

        {/* Tips */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-xs text-blue-700">
            💡 Dica: Sua meta diária foi calculada com base no seu peso ({user.profile.weight}kg) 
            e altura ({user.profile.height}cm). Beba pequenas quantidades ao longo do dia!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
