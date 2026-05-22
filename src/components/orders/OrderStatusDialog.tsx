import { useEffect, useState } from "react";
import { MessageCircle, Save, X } from "lucide-react";
import type { Order, OrderStatus } from "@/types/order";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CurrencyField } from "@/components/orders/CurrencyField";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_OPTIONS,
} from "@/utils/order-labels";
import { OrderStatusIcon } from "@/utils/order-status-icons";
import {
  parseCurrencyInputToApi,
  sanitizeCurrencyInput,
  toCurrencyInputDisplay,
} from "@/utils/currency-input";

interface OrderStatusDialogProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (
    id: number,
    status: OrderStatus,
    finalValue: string,
  ) => Promise<void>;
  isSaving: boolean;
}

export function OrderStatusDialog({
  order,
  open,
  onOpenChange,
  onSave,
  isSaving,
}: OrderStatusDialogProps) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [finalValueDisplay, setFinalValueDisplay] = useState(() =>
    toCurrencyInputDisplay(order.finalValue),
  );

  const finalValueApi = parseCurrencyInputToApi(finalValueDisplay);
  const hasChanges =
    status !== order.status || finalValueApi !== order.finalValue;

  useEffect(() => {
    if (open) {
      setStatus(order.status);
      setFinalValueDisplay(toCurrencyInputDisplay(order.finalValue));
    }
  }, [open, order.status, order.finalValue]);

  async function handleSave() {
    await onSave(order.id, status, finalValueApi);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Alterar status</DialogTitle>
          <DialogDescription>
            Pedido {order.codigo} — {order.customerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`dialog-status-${order.id}`}>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as OrderStatus)}
              disabled={isSaving}
            >
              <SelectTrigger id={`dialog-status-${order.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper" className="z-[200]">
                {ORDER_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    <span className="flex items-center gap-2">
                      <OrderStatusIcon status={option} className="h-4 w-4" />
                      {ORDER_STATUS_LABELS[option]}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {status === "ready" && (
            <div
              className="flex gap-3 rounded-md border border-amber-500/40 bg-amber-500/10 p-3 text-sm"
              role="alert"
            >
              <MessageCircle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p>
                Ao marcar como <strong>Pronto</strong>, o cliente será
                notificado automaticamente por uma mensagem no WhatsApp do bot.
              </p>
            </div>
          )}

          <CurrencyField
            id={`dialog-final-${order.id}`}
            label="Valor final"
            value={finalValueDisplay}
            onChange={(value) =>
              setFinalValueDisplay(sanitizeCurrencyInput(value))
            }
            disabled={isSaving}
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            onClick={() => void handleSave()}
            disabled={!hasChanges || isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Salvando..." : "Confirmar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
