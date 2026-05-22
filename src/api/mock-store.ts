import usersData from "@/mocks/users.json";
import ordersData from "@/mocks/orders.json";
import type { User } from "@/types/user";
import type { Order, UpdateOrderPayload } from "@/types/order";
import type { ReportPeriodDays, SalesReport } from "@/types/report";

const users: User[] = [...usersData];
const initialOrders: Order[] = ordersData as Order[];
let orders: Order[] = initialOrders.map((order) => ({ ...order }));

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function mockLogin(
  email: string,
  password: string
): Promise<{ id: number; name: string; email: string } | null> {
  await delay(300);
  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );
  if (!user) {
    return null;
  }
  return { id: user.id, name: user.name, email: user.email };
}

export async function mockGetOrders(): Promise<Order[]> {
  await delay(200);
  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function mockUpdateOrder(
  id: number,
  payload: UpdateOrderPayload
): Promise<Order | null> {
  await delay(250);
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) {
    return null;
  }
  const current = orders[index];
  if (!current) {
    return null;
  }
  const updated: Order = {
    ...current,
    status: payload.status ?? current.status,
    finalValue: payload.finalValue ?? current.finalValue,
  };
  orders = orders.map((order) => (order.id === id ? updated : order));
  return updated;
}

function isWithinPeriod(createdAt: string, days: ReportPeriodDays): boolean {
  const created = new Date(createdAt).getTime();
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return created >= cutoff;
}

export async function mockGetSalesReport(
  periodDays: ReportPeriodDays
): Promise<SalesReport> {
  await delay(200);
  const filtered = orders.filter((order) =>
    isWithinPeriod(order.createdAt, periodDays)
  );
  const totalRevenue = filtered.reduce(
    (sum, order) => sum + Number.parseFloat(order.finalValue),
    0
  );
  const deliveredCount = filtered.filter(
    (order) => order.status === "delivered"
  ).length;
  const pendingCount = filtered.filter(
    (order) => order.status === "pending"
  ).length;

  return {
    periodDays,
    totalOrders: filtered.length,
    totalRevenue: totalRevenue.toFixed(2),
    deliveredCount,
    pendingCount,
  };
}

export function resetMockOrders(): void {
  orders = initialOrders.map((order) => ({ ...order }));
}
