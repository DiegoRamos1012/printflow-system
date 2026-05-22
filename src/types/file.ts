export type PageCountStatus = "exact" | "estimated" | "manual";

export interface OrderFile {
  id: number;
  orderId: number;
  originalName: string;
  mimeType: string;
  pageCountStatus: PageCountStatus;
  pageCount: number;
  createdAt: string;
}
