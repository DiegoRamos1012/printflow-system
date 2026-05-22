import type { Order } from "@/types/order";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PRINT_TYPE_LABELS } from "@/utils/order-labels";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { formatCurrency, formatDateTime, formatPhone } from "@/utils/format";

interface OrderDetailsDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onOpenChange,
}: OrderDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{order.codigo}</DialogTitle>
          <DialogDescription>{order.customerName}</DialogDescription>
        </DialogHeader>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Telefone</dt>
            <dd className="font-medium">{formatPhone(order.customerPhone)}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="mt-1">
              <OrderStatusBadge status={order.status} />
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Impressão</dt>
            <dd className="font-medium">{PRINT_TYPE_LABELS[order.printType]}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Cópias</dt>
            <dd className="font-medium">{order.copies}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Encadernação</dt>
            <dd className="font-medium">{order.binding ? "Sim" : "Não"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Criado em</dt>
            <dd className="font-medium">{formatDateTime(order.createdAt)}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted-foreground">Valor calculado</dt>
            <dd className="font-medium">
              {formatCurrency(order.calculatedValue)}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted-foreground">Valor final</dt>
            <dd className="font-medium">{formatCurrency(order.finalValue)}</dd>
          </div>
        </dl>

        {order.observation && (
          <div className="rounded-md bg-muted/50 p-3 text-sm">
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Observação do cliente
            </p>
            <p>{order.observation}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
