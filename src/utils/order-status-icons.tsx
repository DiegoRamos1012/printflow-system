import {
  CircleCheckBig,
  ClipboardCheck,
  FileClock,
  Files,
  Printer,
  type LucideIcon,
} from "lucide-react";
import type { OrderStatus, OrderStatusFilter } from "@/types/order";

export const ORDER_STATUS_ICONS: Record<OrderStatus, LucideIcon> = {
  pending: FileClock,
  printing: Printer,
  ready: ClipboardCheck,
  delivered: CircleCheckBig,
};

export const ORDER_STATUS_FILTER_ICONS: Record<OrderStatusFilter, LucideIcon> = {
  all: Files,
  pending: FileClock,
  printing: Printer,
  ready: ClipboardCheck,
  delivered: CircleCheckBig,
};

interface OrderStatusIconProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusIcon({ status, className }: OrderStatusIconProps) {
  const Icon = ORDER_STATUS_ICONS[status];
  return <Icon className={className} aria-hidden="true" />;
}

interface OrderStatusFilterIconProps {
  filter: OrderStatusFilter;
  className?: string;
}

export function OrderStatusFilterIcon({
  filter,
  className,
}: OrderStatusFilterIconProps) {
  const Icon = ORDER_STATUS_FILTER_ICONS[filter];
  return <Icon className={className} aria-hidden="true" />;
}
