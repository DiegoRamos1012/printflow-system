import { describe, expect, it } from "vitest";
import {
  parseCurrencyInputToApi,
  sanitizeCurrencyInput,
  toCurrencyInputDisplay,
} from "@/utils/currency-input";

describe("currency-input", () => {
  it("formats api value for display", () => {
    expect(toCurrencyInputDisplay("45.80")).toBe("45,80");
  });

  it("sanitizes user input", () => {
    expect(sanitizeCurrencyInput("12abc,5x")).toBe("12,5");
  });

  it("parses display to api format", () => {
    expect(parseCurrencyInputToApi("47,00")).toBe("47.00");
    expect(parseCurrencyInputToApi("47.00")).toBe("47.00");
  });
});
