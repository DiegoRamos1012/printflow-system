import { beforeEach, describe, expect, it } from "vitest";
import { mockGetSalesReport, resetMockOrders } from "@/api/mock-store";
import { fetchSalesReport } from "@/api/reports";

describe("sales report", () => {
  beforeEach(() => {
    resetMockOrders();
  });

  it("returns report for 7 days", async () => {
    const report = await mockGetSalesReport(7);
    expect(report.periodDays).toBe(7);
    expect(report.totalOrders).toBeGreaterThan(0);
    expect(Number.parseFloat(report.totalRevenue)).toBeGreaterThan(0);
  });

  it("filters orders by 1 day period", async () => {
    const report = await mockGetSalesReport(1);
    expect(report.periodDays).toBe(1);
    expect(report.totalOrders).toBeLessThanOrEqual(5);
  });

  it("fetchSalesReport returns consistent shape", async () => {
    const report = await fetchSalesReport(3);
    expect(report.periodDays).toBe(3);
    expect(report.totalOrders).toBeGreaterThanOrEqual(0);
    expect(report.totalRevenue).toMatch(/^\d+\.\d{2}$/);
    expect(report.deliveredCount).toBeGreaterThanOrEqual(0);
    expect(report.pendingCount).toBeGreaterThanOrEqual(0);
  });
});
