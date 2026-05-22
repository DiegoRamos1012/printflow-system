import { describe, expect, it } from "vitest";
import { mockLogin } from "@/api/mock-store";
import { login } from "@/api/auth";

describe("authentication", () => {
  it("accepts valid mock credentials", async () => {
    const user = await mockLogin("ana@printflow.local", "printflow123");
    expect(user).not.toBeNull();
    expect(user?.email).toBe("ana@printflow.local");
    expect(user?.name).toBe("Ana Silva");
  });

  it("rejects invalid mock credentials", async () => {
    const user = await mockLogin("wrong@printflow.local", "invalid");
    expect(user).toBeNull();
  });

  it("login returns user session via mock API layer", async () => {
    const response = await login({
      email: "carlos@printflow.local",
      password: "printflow123",
    });
    expect(response.user.id).toBe(2);
    expect(response.user.email).toBe("carlos@printflow.local");
  });

  it("login throws on invalid credentials", async () => {
    await expect(
      login({ email: "ana@printflow.local", password: "wrong" })
    ).rejects.toThrow("Invalid email or password");
  });
});
