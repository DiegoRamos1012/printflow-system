export function formatCurrency(value: string): string {
  const numeric = Number.parseFloat(value);
  if (Number.isNaN(numeric)) {
    return "R$ 0,00";
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numeric);
}

export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function formatPhone(phone: string): string {
  return phone.trim();
}

export function formatObservationPreview(
  observation: string,
  maxLength = 72
): string {
  const trimmed = observation.trim();
  if (!trimmed) {
    return "";
  }
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength).trimEnd()}...`;
}
