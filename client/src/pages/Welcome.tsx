import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Salad, Utensils, Target, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Background decorativo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg mb-6">
            <Utensils className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">NutriPlan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sua jornada para uma alimentação equilibrada e saudável começa aqui. 
            Planeje suas refeições, acompanhe sua nutrição e alcance seus objetivos.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="glass-effect card-hover text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-green-700">Planos Personalizados</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Receba planos de refeições personalizados baseados em seus objetivos, 
                preferências dietéticas e estilo de vida.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-effect card-hover text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-700">Acompanhamento Nutricional</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Monitore suas calorias, macronutrientes e hidratação diária 
                para manter-se no caminho certo.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="glass-effect card-hover text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle className="text-emerald-700">Receitas Práticas</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Acesse centenas de receitas saudáveis com tempo de preparo 
                e instruções detalhadas para facilitar seu dia a dia.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Por que escolher o NutriPlan?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Apple className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Alimentação Balanceada</h3>
                <p className="text-gray-600">Garanta o equilíbrio perfeito entre todos os nutrientes essenciais</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Salad className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Variedade de Opções</h3>
                <p className="text-gray-600">Centenas de receitas para todos os gostos e preferências</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Objetivos Claros</h3>
                <p className="text-gray-600">Seja para emagrecer, ganhar massa ou manter o peso</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Progresso Visível</h3>
                <p className="text-gray-600">Acompanhe sua evolução com relatórios detalhados</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="health-gradient text-white font-semibold px-12 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]" onClick={() => navigate('/app')}>
            Começar Agora
          </Button>
          
        </div>
      </div>
    </div>;
};
export default Welcome;