import { expect, test } from "@playwright/test";

test("returns a useful not-found state", async ({ page }) => {
  const response = await page.goto("/unresolved-route");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1, name: "Signal not found." })).toBeVisible();
  await expect(page.getByRole("link", { name: /return_home/ })).toHaveAttribute("href", "/");
});

test("sets the production security header baseline", async ({ request }) => {
  const response = await request.get("/");
  const headers = response.headers();

  expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(headers["permissions-policy"]).toBe("camera=(), geolocation=(), microphone=()");
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["x-powered-by"]).toBeUndefined();
});
