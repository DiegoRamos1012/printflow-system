import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff, FlaskConical, LogIn, Printer } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { DEV_TEST_LOGIN, IS_DEV } from "@/config/env";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AppFooter } from "@/components/layout/AppFooter";

export function Login() {
  const { isAuthenticated, login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isAuthenticated) {
    return <Navigate to="/orders" replace />;
  }

  async function performLogin(loginEmail: string, loginPassword: string) {
    setError(null);
    try {
      await login({ email: loginEmail, password: loginPassword });
    } catch {
      setError("E-mail ou senha inválidos.");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await performLogin(email, password);
  }

  async function handleTestLogin() {
    setEmail(DEV_TEST_LOGIN.email);
    setPassword(DEV_TEST_LOGIN.password);
    await performLogin(DEV_TEST_LOGIN.email, DEV_TEST_LOGIN.password);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Printer className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Printflow</CardTitle>
          <CardDescription>
            Acesse o painel de gerenciamento de pedidos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="ana@printflow.local"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 hover:bg-transparent"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              <LogIn className="mr-2 h-4 w-4" />
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>

            {IS_DEV && (
              <Button
                type="button"
                variant="secondary"
                className="w-full"
                disabled={isLoading}
                onClick={() => void handleTestLogin()}
              >
                <FlaskConical className="mr-2 h-4 w-4" />
                Login Teste
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      </div>
      <AppFooter />
    </div>
  );
}
