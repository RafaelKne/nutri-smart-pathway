
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const ProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'masculino' as 'masculino' | 'feminino' | 'outro',
    goal: 'emagrecimento' as 'emagrecimento' | 'ganho_massa' | 'manutencao',
    activityLevel: 'moderado' as 'sedentario' | 'leve' | 'moderado' | 'intenso',
    dietaryPreferences: [] as string[],
    restrictions: [] as string[],
    mealsPerDay: 4 as 3 | 4 | 5,
  });

  const { updateProfile } = useAuthStore();
  const { toast } = useToast();

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const profileData = {
      weight: parseFloat(profile.weight),
      height: parseFloat(profile.height),
      age: parseInt(profile.age),
      gender: profile.gender,
      goal: profile.goal,
      activityLevel: profile.activityLevel,
      dietaryPreferences: profile.dietaryPreferences,
      restrictions: profile.restrictions,
      mealsPerDay: profile.mealsPerDay,
    };

    updateProfile(profileData);
    toast({
      title: "Perfil configurado!",
      description: "Seu plano personalizado está sendo gerado...",
    });
  };

  const togglePreference = (preference: string) => {
    setProfile(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const toggleRestriction = (restriction: string) => {
    setProfile(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-center">
            Configure seu Perfil Nutricional
          </CardTitle>
          <CardDescription className="text-center">
            Etapa {step} de {totalSteps}
          </CardDescription>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="health-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Básicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="70"
                    value={profile.weight}
                    onChange={(e) => setProfile({...profile, weight: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="170"
                    value={profile.height}
                    onChange={(e) => setProfile({...profile, height: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={profile.age}
                  onChange={(e) => setProfile({...profile, age: e.target.value})}
                />
              </div>

              <div className="space-y-3">
                <Label>Gênero</Label>
                <RadioGroup 
                  value={profile.gender} 
                  onValueChange={(value) => setProfile({...profile, gender: value as any})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino">Masculino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino">Feminino</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outro" id="outro" />
                    <Label htmlFor="outro">Outro</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Objetivos e Atividade</h3>
              
              <div className="space-y-3">
                <Label>Qual é seu objetivo principal?</Label>
                <RadioGroup 
                  value={profile.goal} 
                  onValueChange={(value) => setProfile({...profile, goal: value as any})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emagrecimento" id="emagrecimento" />
                    <Label htmlFor="emagrecimento">Emagrecimento</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ganho_massa" id="ganho_massa" />
                    <Label htmlFor="ganho_massa">Ganho de massa muscular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manutencao" id="manutencao" />
                    <Label htmlFor="manutencao">Manutenção do peso</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Nível de atividade física</Label>
                <RadioGroup 
                  value={profile.activityLevel} 
                  onValueChange={(value) => setProfile({...profile, activityLevel: value as any})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sedentario" id="sedentario" />
                    <Label htmlFor="sedentario">Sedentário (pouco ou nenhum exercício)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="leve" id="leve" />
                    <Label htmlFor="leve">Leve (exercício 1-3x por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderado" id="moderado" />
                    <Label htmlFor="moderado">Moderado (exercício 3-5x por semana)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intenso" id="intenso" />
                    <Label htmlFor="intenso">Intenso (exercício 6-7x por semana)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preferências Alimentares</h3>
              
              <div className="space-y-3">
                <Label>Selecione suas preferências (opcional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Vegetariano',
                    'Vegano',
                    'Sem Glúten',
                    'Sem Lactose',
                    'Low Carb',
                    'Mediterrânea',
                    'Paleo',
                    'Cetogênica'
                  ].map((pref) => (
                    <div key={pref} className="flex items-center space-x-2">
                      <Checkbox
                        id={pref}
                        checked={profile.dietaryPreferences.includes(pref)}
                        onCheckedChange={() => togglePreference(pref)}
                      />
                      <Label htmlFor={pref}>{pref}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Restrições alimentares (opcional)</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Alergia a amendoim',
                    'Alergia a frutos do mar',
                    'Intolerância à lactose',
                    'Doença celíaca',
                    'Diabetes',
                    'Hipertensão',
                    'Colesterol alto',
                    'Outras'
                  ].map((restriction) => (
                    <div key={restriction} className="flex items-center space-x-2">
                      <Checkbox
                        id={restriction}
                        checked={profile.restrictions.includes(restriction)}
                        onCheckedChange={() => toggleRestriction(restriction)}
                      />
                      <Label htmlFor={restriction}>{restriction}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Plano de Refeições</h3>
              
              <div className="space-y-3">
                <Label>Quantas refeições por dia você prefere?</Label>
                <RadioGroup 
                  value={profile.mealsPerDay.toString()} 
                  onValueChange={(value) => setProfile({...profile, mealsPerDay: parseInt(value) as any})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="3meals" />
                    <Label htmlFor="3meals">3 refeições (café, almoço, jantar)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="4meals" />
                    <Label htmlFor="4meals">4 refeições (+ 1 lanche)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="5meals" />
                    <Label htmlFor="5meals">5 refeições (+ 2 lanches)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Resumo do seu perfil:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {profile.weight}kg, {profile.height}cm, {profile.age} anos</li>
                  <li>• Objetivo: {profile.goal.replace('_', ' ')}</li>
                  <li>• Atividade: {profile.activityLevel}</li>
                  <li>• {profile.mealsPerDay} refeições por dia</li>
                  {profile.dietaryPreferences.length > 0 && (
                    <li>• Preferências: {profile.dietaryPreferences.join(', ')}</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            
            {step < totalSteps ? (
              <Button onClick={handleNext} className="health-gradient text-white">
                Próximo
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="health-gradient text-white">
                Finalizar Configuração
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
