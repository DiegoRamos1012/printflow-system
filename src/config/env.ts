export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const USE_MOCK =
  import.meta.env.VITE_USE_MOCK === "true" ||
  import.meta.env.VITE_USE_MOCK === undefined;

export const IS_DEV = import.meta.env.DEV;

export const DEV_TEST_LOGIN = {
  email: "ana@printflow.local",
  password: "printflow123",
} as const;
