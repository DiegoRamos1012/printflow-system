export type PrintType = "blackWhite" | "colored";

export type OrderStatus = "pending" | "printing" | "ready" | "delivered";

export type OrderStatusFilter = "all" | OrderStatus;

export interface Order {
  id: number;
  codigo: string;
  customerName: string;
  customerPhone: string;
  printType: PrintType;
  copies: number;
  binding: boolean;
  observation: string;
  status: OrderStatus;
  calculatedValue: string;
  finalValue: string;
  createdAt: string;
}

export interface UpdateOrderPayload {
  status?: OrderStatus;
  finalValue?: string;
}
