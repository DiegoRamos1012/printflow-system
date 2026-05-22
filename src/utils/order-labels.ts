import type { OrderStatus, OrderStatusFilter, PrintType } from "@/types/order";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pendente",
  printing: "Imprimindo",
  ready: "Pronto",
  delivered: "Entregue",
};

export const PRINT_TYPE_LABELS: Record<PrintType, string> = {
  blackWhite: "P&B",
  colored: "Colorido",
};

export const ORDER_STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "printing",
  "ready",
  "delivered",
];

export const ORDER_STATUS_FILTER_OPTIONS: {
  value: OrderStatusFilter;
  label: string;
}[] = [
  { value: "all", label: "Todos" },
  ...ORDER_STATUS_OPTIONS.map((status) => ({
    value: status,
    label: ORDER_STATUS_LABELS[status],
  })),
];

export const ORDER_STATUS_BADGE_STYLES: Record<OrderStatus, string> = {
  pending:
    "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  printing:
    "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  ready:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  delivered:
    "bg-muted text-muted-foreground",
};
