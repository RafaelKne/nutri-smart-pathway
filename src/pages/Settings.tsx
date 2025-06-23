
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, updateProfile } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState({
    weight: user?.profile?.weight || 0,
    height: user?.profile?.height || 0,
    age: user?.profile?.age || 0,
    gender: user?.profile?.gender || 'masculino' as 'masculino' | 'feminino' | 'outro',
    goal: user?.profile?.goal || 'emagrecimento' as 'emagrecimento' | 'ganho_massa' | 'manutencao',
    activityLevel: user?.profile?.activityLevel || 'moderado' as 'sedentario' | 'leve' | 'moderado' | 'intenso',
    dietaryPreferences: user?.profile?.dietaryPreferences || [] as string[],
    restrictions: user?.profile?.restrictions || [] as string[],
    mealsPerDay: user?.profile?.mealsPerDay || 4 as 3 | 4 | 5,
  });

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

  const handleSave = () => {
    const profileData = {
      weight: Number(profile.weight),
      height: Number(profile.height),
      age: Number(profile.age),
      gender: profile.gender,
      goal: profile.goal,
      activityLevel: profile.activityLevel,
      dietaryPreferences: profile.dietaryPreferences,
      restrictions: profile.restrictions,
      mealsPerDay: profile.mealsPerDay,
    };

    updateProfile(profileData);
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Configurações</h1>
          </div>

          <div className="grid gap-6">
            {/* Informações Básicas */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>Atualize seus dados pessoais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={profile.weight}
                      onChange={(e) => setProfile({...profile, weight: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={profile.height}
                      onChange={(e) => setProfile({...profile, height: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Idade</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profile.age}
                      onChange={(e) => setProfile({...profile, age: Number(e.target.value)})}
                    />
                  </div>
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
              </CardContent>
            </Card>

            {/* Objetivos */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Objetivos e Atividade</CardTitle>
                <CardDescription>Configure seus objetivos e nível de atividade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Objetivo principal</Label>
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
                      <Label htmlFor="sedentario">Sedentário</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="leve" id="leve" />
                      <Label htmlFor="leve">Leve (1-3x por semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderado" id="moderado" />
                      <Label htmlFor="moderado">Moderado (3-5x por semana)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="intenso" id="intenso" />
                      <Label htmlFor="intenso">Intenso (6-7x por semana)</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Preferências Alimentares */}
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle>Preferências Alimentares</CardTitle>
                <CardDescription>Configure suas preferências e restrições dietéticas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Preferências dietéticas</Label>
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
                  <Label>Número de refeições por dia</Label>
                  <RadioGroup 
                    value={profile.mealsPerDay.toString()} 
                    onValueChange={(value) => setProfile({...profile, mealsPerDay: parseInt(value) as any})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="3meals" />
                      <Label htmlFor="3meals">3 refeições</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="4meals" />
                      <Label htmlFor="4meals">4 refeições</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="5meals" />
                      <Label htmlFor="5meals">5 refeições</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label>Restrições alimentares</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Alergia a amendoim',
                      'Alergia a frutos do mar',
                      'Intolerância à lactose',
                      'Doença celíaca',
                      'Diabetes',
                      'Hipertensão'
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
              </CardContent>
            </Card>

            <Button 
              onClick={handleSave}
              className="health-gradient text-white font-semibold py-3 w-full"
            >
              Salvar Configurações
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
