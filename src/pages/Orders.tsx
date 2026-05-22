import { useCallback, useEffect, useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { fetchOrders, updateOrder } from "@/api/orders";
import { OrderCard } from "@/components/orders/OrderCard";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/feedback/PageLoader";
import { ORDER_STATUS_FILTER_OPTIONS } from "@/utils/order-labels";
import { OrderStatusFilterIcon } from "@/utils/order-status-icons";
import type { Order, OrderStatus, OrderStatusFilter } from "@/types/order";

const POLL_INTERVAL_MS = 15000;

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") {
      return orders;
    }
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const loadOrders = useCallback(async (silent = false) => {
    if (!silent) {
      setLoading(true);
    }
    setError(null);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch {
      const message = "Não foi possível carregar os pedidos.";
      setError(message);
      if (!silent) {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrders();
    const interval = window.setInterval(() => {
      void loadOrders(true);
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [loadOrders]);

  async function handleUpdate(
    id: number,
    status: OrderStatus,
    finalValue: string
  ) {
    setUpdatingId(id);
    try {
      const updated = await updateOrder(id, { status, finalValue });
      setOrders((current) =>
        current.map((order) => (order.id === id ? updated : order))
      );
      setError(null);
      toast.success("Pedido atualizado com sucesso.");
      if (status === "ready") {
        toast.info("O cliente será notificado pelo bot.");
      }
    } catch {
      const message = "Falha ao atualizar o pedido.";
      setError(message);
      toast.error(message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Pedidos</h2>
          <p className="text-sm text-muted-foreground">
            Use os cards para ver detalhes ou alterar status. A lista atualiza
            automaticamente.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => void loadOrders()}
          disabled={loading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {ORDER_STATUS_FILTER_OPTIONS.map(({ value, label }) => (
          <Button
            key={value}
            variant={statusFilter === value ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(value)}
          >
            <OrderStatusFilterIcon filter={value} className="mr-1.5 h-4 w-4" />
            {label}
          </Button>
        ))}
        {!loading && orders.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1 ? "pedido" : "pedidos"}
          </span>
        )}
      </div>

      {error && (
        <p className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading && orders.length === 0 ? (
        <PageLoader message="Carregando pedidos..." />
      ) : orders.length === 0 ? (
        <p className="text-muted-foreground">Nenhum pedido registrado.</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-muted-foreground">
          Nenhum pedido com este status no momento.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onUpdate={handleUpdate}
              isUpdating={updatingId === order.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
