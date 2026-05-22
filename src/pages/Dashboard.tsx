import { useCallback, useEffect, useState } from "react";
import { BarChart3, ChartColumn, TrendingUp } from "lucide-react";
import { fetchSalesReport } from "@/api/reports";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/feedback/PageLoader";
import type { ReportPeriodDays, SalesReport } from "@/types/report";
import { formatCurrency } from "@/utils/format";

const PERIOD_OPTIONS: {
  days: ReportPeriodDays;
  label: string;
  icon: typeof BarChart3;
}[] = [
  { days: 1, label: "1 dia", icon: BarChart3 },
  { days: 3, label: "3 dias", icon: ChartColumn },
  { days: 7, label: "7 dias", icon: TrendingUp },
];

export function Dashboard() {
  const [periodDays, setPeriodDays] = useState<ReportPeriodDays>(7);
  const [report, setReport] = useState<SalesReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadReport = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSalesReport(periodDays);
      setReport(data);
    } catch {
      setError("Não foi possível carregar o relatório.");
    } finally {
      setLoading(false);
    }
  }, [periodDays]);

  useEffect(() => {
    void loadReport();
  }, [loadReport]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Relatório de vendas</h2>
        <p className="text-sm text-muted-foreground">
          Resumo de pedidos por período
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PERIOD_OPTIONS.map(({ days, label, icon: Icon }) => (
          <Button
            key={days}
            variant={periodDays === days ? "default" : "outline"}
            size="sm"
            onClick={() => setPeriodDays(days)}
          >
            <Icon className="mr-1.5 h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {error && (
        <p className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <PageLoader message="Carregando relatório..." />
      ) : report ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total de pedidos</CardDescription>
              <CardTitle className="text-3xl">{report.totalOrders}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Receita (valor final)</CardDescription>
              <CardTitle className="text-3xl">
                {formatCurrency(report.totalRevenue)}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Entregues</CardDescription>
              <CardTitle className="text-3xl">{report.deliveredCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Pendentes</CardDescription>
              <CardTitle className="text-3xl">{report.pendingCount}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      ) : null}

      {report && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">
              Período selecionado: últimos {report.periodDays}{" "}
              {report.periodDays === 1 ? "dia" : "dias"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
