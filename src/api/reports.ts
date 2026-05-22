import { apiClient } from "@/api/client";
import { USE_MOCK } from "@/config/env";
import { mockGetSalesReport } from "@/api/mock-store";
import type { ReportPeriodDays, SalesReport } from "@/types/report";

export async function fetchSalesReport(
  periodDays: ReportPeriodDays
): Promise<SalesReport> {
  if (USE_MOCK) {
    return mockGetSalesReport(periodDays);
  }
  const { data } = await apiClient.get<SalesReport>("/reports/sales", {
    params: { days: periodDays },
  });
  return data;
}
