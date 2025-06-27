
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Lock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState<'email' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { findUserByEmail, resetPassword } = useAuthStore();
  const { toast } = useToast();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = findUserByEmail(email);
      
      if (user) {
        setStep('reset');
        toast({
          title: "E-mail encontrado!",
          description: "Agora você pode definir uma nova senha.",
        });
      } else {
        toast({
          title: "E-mail não encontrado",
          description: "Este e-mail não está cadastrado em nosso sistema.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Senhas não coincidem",
        description: "As senhas digitadas não são iguais.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword.length < 3) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 3 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const success = await resetPassword(email, newPassword);
      
      if (success) {
        setStep('success');
        toast({
          title: "Senha redefinida!",
          description: "Sua senha foi alterada com sucesso.",
        });
      } else {
        toast({
          title: "Erro",
          description: "Não foi possível redefinir a senha.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-green-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-200/30 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 border border-white/30 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            {step === 'email' && <Mail className="w-8 h-8 text-white" />}
            {step === 'reset' && <Lock className="w-8 h-8 text-white" />}
            {step === 'success' && <CheckCircle className="w-8 h-8 text-white" />}
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold">
            {step === 'email' && 'Recuperar Senha'}
            {step === 'reset' && 'Nova Senha'}
            {step === 'success' && 'Senha Alterada!'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {step === 'email' && 'Digite seu e-mail para recuperar sua senha'}
            {step === 'reset' && 'Digite sua nova senha'}
            {step === 'success' && 'Sua senha foi redefinida com sucesso'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full health-gradient text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Verificando...
                  </div>
                ) : (
                  'Continuar'
                )}
              </Button>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-gray-700 font-medium">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirmar Nova Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-green-500 focus:ring-green-500 transition-colors"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full health-gradient text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Redefinindo...
                  </div>
                ) : (
                  'Redefinir Senha'
                )}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Agora você pode fazer login com sua nova senha.
              </p>
              <Link to="/app">
                <Button className="w-full health-gradient text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300">
                  Fazer Login
                </Button>
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link to="/app" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors">
              <ArrowLeft size={16} />
              Voltar ao Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
