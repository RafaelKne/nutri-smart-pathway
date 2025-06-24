
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuthStore, UserProfile } from "@/store/authStore";
import { useMealStore } from "@/store/mealStore";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormData {
  weight: number;
  height: number;
  age: number;
  gender: 'masculino' | 'feminino' | 'outro';
  goal: 'emagrecimento' | 'ganho_massa' | 'manutencao';
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso';
  dietaryPreferences: string[];
  restrictions: string[];
  mealsPerDay: 3 | 4 | 5;
}

export const ProfileSetup = () => {
  const { updateProfile } = useAuthStore();
  const { generateNewPlan } = useMealStore();
  const { toast } = useToast();

  const [formData, setFormData] = useState<ProfileFormData>({
    weight: 70,
    height: 170,
    age: 25,
    gender: 'masculino',
    goal: 'manutencao',
    activityLevel: 'sedentario',
    dietaryPreferences: [],
    restrictions: [],
    mealsPerDay: 4,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const dietaryPreferences = [...formData.dietaryPreferences];

    if (checked) {
      dietaryPreferences.push(value);
    } else {
      dietaryPreferences.splice(dietaryPreferences.indexOf(value), 1);
    }

    setFormData({ ...formData, dietaryPreferences });
  };

  const onSubmit = (data: ProfileFormData) => {
    const profileData: UserProfile = {
      ...data,
      mealsPerDay: 4, // Sempre 4 refeições
      dailyWaterGoal: 0,
      waterConsumed: 0,
    };
    
    updateProfile(profileData);
    generateNewPlan(data.dietaryPreferences, profileData);
    
    toast({
      title: "Perfil configurado!",
      description: "Seu plano personalizado foi criado com sucesso.",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <Card className="w-full max-w-md glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Configure seu Perfil</CardTitle>
          <CardDescription className="text-gray-500 text-center">
            Preencha os dados abaixo para personalizar seu plano.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="age">Idade</Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="gender">Gênero</Label>
              <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" defaultValue={formData.gender} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="goal">Objetivo</Label>
              <Select onValueChange={(value) => handleSelectChange('goal', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" defaultValue={formData.goal} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                  <SelectItem value="ganho_massa">Ganho de Massa</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="activityLevel">Nível de Atividade</Label>
              <Select onValueChange={(value) => handleSelectChange('activityLevel', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" defaultValue={formData.activityLevel} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentario">Sedentário</SelectItem>
                  <SelectItem value="leve">Leve</SelectItem>
                  <SelectItem value="moderado">Moderado</SelectItem>
                  <SelectItem value="intenso">Intenso</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Preferências Dietéticas</Label>
              <div className="flex flex-wrap gap-2">
                <div>
                  <Checkbox
                    id="vegetariano"
                    value="Vegetariano"
                    checked={formData.dietaryPreferences.includes('Vegetariano')}
                    onCheckedChange={e => handleCheckboxChange({ target: { value: 'Vegetariano', checked: e } } as any)}
                  />
                  <Label htmlFor="vegetariano" className="ml-2">Vegetariano</Label>
                </div>
                <div>
                  <Checkbox
                    id="vegano"
                    value="Vegano"
                    checked={formData.dietaryPreferences.includes('Vegano')}
                    onCheckedChange={e => handleCheckboxChange({ target: { value: 'Vegano', checked: e } } as any)}
                  />
                  <Label htmlFor="vegano" className="ml-2">Vegano</Label>
                </div>
                {/* Adicione outras preferências aqui */}
              </div>
            </div>
            <div>
              <Label htmlFor="restrictions">Restrições Alimentares</Label>
              <Input
                type="text"
                id="restrictions"
                name="restrictions"
                placeholder="Ex: Glúten, Lactose"
                value={formData.restrictions}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full health-gradient text-white">
              Salvar Perfil
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
