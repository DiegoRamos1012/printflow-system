export function toCurrencyInputDisplay(apiValue: string): string {
  const numeric = Number.parseFloat(apiValue);
  if (Number.isNaN(numeric)) {
    return "";
  }
  return numeric.toFixed(2).replace(".", ",");
}

export function sanitizeCurrencyInput(raw: string): string {
  const cleaned = raw.replace(/[^\d,.]/g, "");
  const separatorIndex = cleaned.search(/[,.]/);
  if (separatorIndex === -1) {
    return cleaned;
  }
  const integerPart = cleaned.slice(0, separatorIndex);
  const decimalPart = cleaned.slice(separatorIndex + 1).replace(/[,.]/g, "");
  return `${integerPart},${decimalPart}`;
}

export function parseCurrencyInputToApi(display: string): string {
  const normalized = display.trim().replace(",", ".");
  const numeric = Number.parseFloat(normalized);
  if (Number.isNaN(numeric) || numeric < 0) {
    return "0.00";
  }
  return numeric.toFixed(2);
}
