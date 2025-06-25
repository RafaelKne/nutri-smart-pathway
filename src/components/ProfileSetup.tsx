
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
    weight: 0,
    height: 0,
    age: 0,
    gender: 'masculino',
    goal: 'manutencao',
    activityLevel: 'sedentario',
    dietaryPreferences: [],
    restrictions: [],
    mealsPerDay: 4,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.weight || formData.weight <= 0) {
      newErrors.weight = 'Peso é obrigatório e deve ser maior que 0';
    }
    if (!formData.height || formData.height <= 0) {
      newErrors.height = 'Altura é obrigatória e deve ser maior que 0';
    }
    if (!formData.age || formData.age <= 0) {
      newErrors.age = 'Idade é obrigatória e deve ser maior que 0';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gênero é obrigatório';
    }
    if (!formData.goal) {
      newErrors.goal = 'Objetivo é obrigatório';
    }
    if (!formData.activityLevel) {
      newErrors.activityLevel = 'Nível de atividade é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || 0 });
    // Limpar erro quando o usuário começar a digitar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    // Limpar erro quando o usuário selecionar
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (checked: boolean, value: string) => {
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
      mealsPerDay: data.mealsPerDay,
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
    
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, preencha todos os campos obrigatórios corretamente.",
        variant: "destructive"
      });
      return;
    }

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
                <Label htmlFor="weight">Peso (kg) *</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight || ''}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className={errors.weight ? 'border-red-500' : ''}
                />
                {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
              </div>
              <div>
                <Label htmlFor="height">Altura (cm) *</Label>
                <Input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height || ''}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className={errors.height ? 'border-red-500' : ''}
                />
                {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
              </div>
            </div>
            <div>
              <Label htmlFor="age">Idade *</Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={formData.age || ''}
                onChange={handleInputChange}
                required
                min="1"
                className={errors.age ? 'border-red-500' : ''}
              />
              {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
            </div>
            <div>
              <Label htmlFor="gender">Gênero *</Label>
              <Select onValueChange={(value) => handleSelectChange('gender', value)}>
                <SelectTrigger className={`w-full ${errors.gender ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
            </div>
            <div>
              <Label htmlFor="goal">Objetivo *</Label>
              <Select onValueChange={(value) => handleSelectChange('goal', value)}>
                <SelectTrigger className={`w-full ${errors.goal ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                  <SelectItem value="ganho_massa">Ganho de Massa</SelectItem>
                  <SelectItem value="manutencao">Manutenção</SelectItem>
                </SelectContent>
              </Select>
              {errors.goal && <p className="text-red-500 text-sm mt-1">{errors.goal}</p>}
            </div>
            <div>
              <Label htmlFor="activityLevel">Nível de Atividade *</Label>
              <Select onValueChange={(value) => handleSelectChange('activityLevel', value)}>
                <SelectTrigger className={`w-full ${errors.activityLevel ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentario">Sedentário</SelectItem>
                  <SelectItem value="leve">Leve</SelectItem>
                  <SelectItem value="moderado">Moderado</SelectItem>
                  <SelectItem value="intenso">Intenso</SelectItem>
                </SelectContent>
              </Select>
              {errors.activityLevel && <p className="text-red-500 text-sm mt-1">{errors.activityLevel}</p>}
            </div>
            <div>
              <Label>Preferências Dietéticas</Label>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetariano"
                    checked={formData.dietaryPreferences.includes('Vegetariano')}
                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'Vegetariano')}
                  />
                  <Label htmlFor="vegetariano">Vegetariano</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegano"
                    checked={formData.dietaryPreferences.includes('Vegano')}
                    onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'Vegano')}
                  />
                  <Label htmlFor="vegano">Vegano</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="mealsPerDay">Número de refeições por dia</Label>
              <Select onValueChange={(value) => handleSelectChange('mealsPerDay', value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="4 refeições" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 refeições</SelectItem>
                  <SelectItem value="4">4 refeições</SelectItem>
                  <SelectItem value="5">5 refeições</SelectItem>
                </SelectContent>
              </Select>
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
