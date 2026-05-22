import type { UserSession } from "@/types/user";

const SESSION_KEY = "printflow_session";

export function getStoredSession(): UserSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "id" in parsed &&
      "name" in parsed &&
      "email" in parsed &&
      typeof (parsed as UserSession).id === "number" &&
      typeof (parsed as UserSession).name === "string" &&
      typeof (parsed as UserSession).email === "string"
    ) {
      return parsed as UserSession;
    }
    return null;
  } catch {
    return null;
  }
}

export function setStoredSession(user: UserSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export function clearStoredSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
