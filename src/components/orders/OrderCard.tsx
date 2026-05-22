import { useState } from "react";
import { ClipboardPen, FileText } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderDetailsDialog } from "@/components/orders/OrderDetailsDialog";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderStatusDialog } from "@/components/orders/OrderStatusDialog";
import { PRINT_TYPE_LABELS } from "@/utils/order-labels";
import { formatCurrency, formatObservationPreview } from "@/utils/format";

interface OrderCardProps {
  order: Order;
  onUpdate: (id: number, status: OrderStatus, finalValue: string) => Promise<void>;
  isUpdating: boolean;
}

export function OrderCard({ order, onUpdate, isUpdating }: OrderCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  return (
    <>
      <Card className="hover:shadow-md">
        <CardHeader className="space-y-2 p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <CardTitle className="text-base">{order.codigo}</CardTitle>
              <CardDescription className="truncate">
                {order.customerName}
              </CardDescription>
            </div>
            <OrderStatusBadge status={order.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-3 p-4 pt-0">
          <p className="text-sm font-medium">
            {formatCurrency(order.finalValue)}
          </p>
          <p className="text-xs text-muted-foreground">
            {PRINT_TYPE_LABELS[order.printType]} · {order.copies}{" "}
            {order.copies === 1 ? "cópia" : "cópias"}
            {order.binding ? " · Encadernado" : ""}
          </p>
          <p className="line-clamp-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">Observação: </span>
            {order.observation.trim()
              ? formatObservationPreview(order.observation)
              : "vazio"}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => setDetailsOpen(true)}
            >
              <FileText className="mr-1.5 h-4 w-4" />
              Detalhes
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={() => setStatusOpen(true)}
              disabled={isUpdating}
            >
              <ClipboardPen className="mr-1.5 h-4 w-4" />
              Alterar status
            </Button>
          </div>
        </CardContent>
      </Card>

      <OrderDetailsDialog
        order={order}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
      <OrderStatusDialog
        order={order}
        open={statusOpen}
        onOpenChange={setStatusOpen}
        onSave={onUpdate}
        isSaving={isUpdating}
      />
    </>
  );
}
