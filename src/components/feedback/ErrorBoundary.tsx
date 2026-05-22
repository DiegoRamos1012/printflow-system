import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ChevronDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getErrorMessage } from "@/utils/error-message";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  handleRetry = (): void => {
    this.setState({ error: null, errorInfo: null });
  };

  render(): ReactNode {
    const { error, errorInfo } = this.state;

    if (!error) {
      return this.props.children;
    }

    const message = getErrorMessage(error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <AlertTriangle className="h-6 w-6" aria-hidden="true" />
            </div>
            <CardTitle className="text-xl">Algo deu errado</CardTitle>
            <CardDescription>
              Encontramos um problema inesperado. Você pode tentar novamente ou
              voltar para a página inicial. Se o erro persistir, envie os
              detalhes abaixo para o suporte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="flex-1" onClick={this.handleRetry}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Tentar novamente
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <Link to="/orders">Ir para pedidos</Link>
              </Button>
            </div>

            <details className="group rounded-md border bg-muted/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-medium [&::-webkit-details-marker]:hidden">
                <span>Detalhes do erro</span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="space-y-3 border-t px-4 py-3">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Mensagem
                  </p>
                  <p className="break-words rounded-md bg-background p-2 font-mono text-sm text-destructive">
                    {message}
                  </p>
                </div>
                {errorInfo?.componentStack && (
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Componente
                    </p>
                    <pre className="max-h-48 overflow-auto rounded-md bg-background p-2 font-mono text-xs text-muted-foreground">
                      {errorInfo.componentStack.trim()}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          </CardContent>
        </Card>
      </div>
    );
  }
}
