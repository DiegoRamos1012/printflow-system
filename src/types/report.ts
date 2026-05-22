export type ReportPeriodDays = 1 | 3 | 7;

export interface SalesReport {
  periodDays: ReportPeriodDays;
  totalOrders: number;
  totalRevenue: string;
  deliveredCount: number;
  pendingCount: number;
}
