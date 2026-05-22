import { apiClient } from "@/api/client";
import { USE_MOCK } from "@/config/env";
import { mockGetOrders, mockUpdateOrder } from "@/api/mock-store";
import type { Order, UpdateOrderPayload } from "@/types/order";

export async function fetchOrders(): Promise<Order[]> {
  if (USE_MOCK) {
    return mockGetOrders();
  }
  const { data } = await apiClient.get<Order[]>("/orders");
  return data;
}

export async function updateOrder(
  id: number,
  payload: UpdateOrderPayload
): Promise<Order> {
  if (USE_MOCK) {
    const updated = await mockUpdateOrder(id, payload);
    if (!updated) {
      throw new Error("Order not found");
    }
    return updated;
  }
  const { data } = await apiClient.patch<Order>(`/orders/${id}`, payload);
  return data;
}
