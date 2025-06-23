import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("reports field errors without relying on browser validation", async ({ page }) => {
    await page.goto("/contact");
    const nameField = page.getByRole("textbox", { name: /Name$/ });
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Check the highlighted fields and try again.")).toBeVisible();
    await expect(nameField).toBeFocused();
    await expect(nameField).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("textbox", { name: /Email$/ })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByRole("textbox", { name: /Message$/ })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    await expect(page.getByText("Enter at least 2 characters.")).toBeVisible();
    await expect(page.getByText("Enter a valid email address.")).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("returns a generic success for a honeypot submission", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("textbox", { name: /Name$/ }).fill("Grace Hopper");
    await page.getByRole("textbox", { name: /Email$/ }).fill("grace@example.com");
    await page
      .getByRole("textbox", { name: /Message$/ })
      .fill("I would like to discuss a reproducible memory-forensics workflow.");

    // Populate the hidden bot field so the complete Server Action path is exercised without
    // retaining test contact data.
    await page.locator("#website").fill("https://example.com", { force: true });
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByRole("status")).toHaveText(
      "Message received. Thank you for reaching out.",
    );
    await expect(page.getByRole("textbox", { name: /Name$/ })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: /Email$/ })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: /Message$/ })).toHaveValue("");
  });
});

test.describe("accessibility", () => {
  const routes = [
    ["/", 200],
    ["/about", 200],
    ["/projects", 200],
    ["/projects/vadvit-explainable-memory-forensics", 200],
    ["/publications", 200],
    ["/publications/memory-analysis-malware-detection-oscar-survey", 200],
    ["/engineering", 200],
    ["/contact", 200],
    ["/unresolved-route", 404],
  ] as const;

  for (const [route, expectedStatus] of routes) {
    test(`${route} has no detectable WCAG A or AA violations`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(expectedStatus);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22a", "wcag22aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }

  test("exposes the skip link to keyboard users", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("removes motion when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");

    expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
      true,
    );
    expect(
      await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
    ).toBe("auto");

    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(
      await page.evaluate(
        () =>
          document.getAnimations().filter((animation) => animation.playState === "running").length,
      ),
    ).toBe(0);
  });
});
