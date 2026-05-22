import { beforeEach, describe, expect, it } from "vitest";
import { mockGetOrders, mockUpdateOrder, resetMockOrders } from "@/api/mock-store";
import { updateOrder } from "@/api/orders";

describe("order updates", () => {
  beforeEach(() => {
    resetMockOrders();
  });

  it("updates order status", async () => {
    const orders = await mockGetOrders();
    const first = orders[0];
    expect(first).toBeDefined();

    const updated = await mockUpdateOrder(first!.id, { status: "ready" });
    expect(updated?.status).toBe("ready");
  });

  it("updates final value", async () => {
    const orders = await mockGetOrders();
    const first = orders[0];
    expect(first).toBeDefined();

    const updated = await mockUpdateOrder(first!.id, { finalValue: "50.00" });
    expect(updated?.finalValue).toBe("50.00");
    expect(updated?.calculatedValue).toBe(first!.calculatedValue);
  });

  it("updateOrder exposes status and final value through API layer", async () => {
    const orders = await mockGetOrders();
    const target = orders.find((order) => order.codigo === "IMP-0482");
    expect(target).toBeDefined();

    const updated = await updateOrder(target!.id, {
      status: "printing",
      finalValue: "47.00",
    });

    expect(updated.status).toBe("printing");
    expect(updated.finalValue).toBe("47.00");
  });
});
