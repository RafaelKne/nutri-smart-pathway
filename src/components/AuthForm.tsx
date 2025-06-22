
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { Apple, Salad, Utensils } from "lucide-react";

interface AuthFormProps {
  onSuccess?: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let success = false;
      if (isLogin) {
        success = await login(formData.email, formData.password);
        if (!success) {
          toast({
            title: "Erro no login",
            description: "E-mail ou senha incorretos. Verifique seus dados ou crie uma conta.",
            variant: "destructive",
          });
        }
      } else {
        success = await register(formData.name, formData.email, formData.password);
        if (!success) {
          toast({
            title: "Erro no cadastro",
            description: "Este e-mail já está cadastrado. Tente fazer login.",
            variant: "destructive",
          });
        }
      }

      if (success) {
        toast({
          title: isLogin ? "Login realizado!" : "Conta criada!",
          description: isLogin ? "Bem-vindo de volta!" : "Sua conta foi criada com sucesso!",
        });
        onSuccess?.();
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Floating food icons */}
      <div className="absolute top-1/4 left-1/6 text-green-400/40 animate-bounce">
        <Apple size={48} />
      </div>
      <div className="absolute bottom-1/4 right-1/6 text-emerald-400/40 animate-bounce delay-300">
        <Salad size={56} />
      </div>
      <div className="absolute top-1/3 right-1/4 text-green-500/40 animate-bounce delay-700">
        <Utensils size={40} />
      </div>

      <Card className="w-full max-w-md glass-effect relative z-10 border border-white/30 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            {isLogin 
              ? 'Acesse sua conta para continuar sua jornada nutricional' 
              : 'Comece sua transformação nutricional hoje mesmo'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required={!isLogin}
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full health-gradient text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Carregando...
                </div>
              ) : (
                isLogin ? 'Entrar' : 'Criar Conta'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              {isLogin 
                ? 'Não tem conta? Criar agora' 
                : 'Já tem conta? Fazer login'
              }
            </Button>
          </div>

          {/* Features showcase */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Apple size={16} className="text-green-500" />
                <span>Nutrição</span>
              </div>
              <div className="flex items-center gap-1">
                <Salad size={16} className="text-emerald-500" />
                <span>Receitas</span>
              </div>
              <div className="flex items-center gap-1">
                <Utensils size={16} className="text-green-600" />
                <span>Planejamento</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
