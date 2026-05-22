import type { OrderStatus } from "@/types/order";
import {
  ORDER_STATUS_BADGE_STYLES,
  ORDER_STATUS_LABELS,
} from "@/utils/order-labels";
import { OrderStatusIcon } from "@/utils/order-status-icons";
import { cn } from "@/utils/cn";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        ORDER_STATUS_BADGE_STYLES[status],
        className
      )}
    >
      <OrderStatusIcon status={status} className="h-3 w-3" />
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}
