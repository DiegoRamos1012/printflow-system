import { apiClient } from "@/api/client";
import { USE_MOCK } from "@/config/env";
import { mockLogin } from "@/api/mock-store";
import type { LoginCredentials, LoginResponse } from "@/types/user";

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  if (USE_MOCK) {
    const user = await mockLogin(credentials.email, credentials.password);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    return { user };
  }
  const { data } = await apiClient.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  return data;
}

export async function logout(): Promise<void> {
  if (USE_MOCK) {
    return;
  }
  await apiClient.post("/auth/logout");
}
