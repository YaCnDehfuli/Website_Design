import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("contact form", () => {
  test("reports field errors without relying on browser validation", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /transmit_message/ }).click();

    await expect(page.getByText("Check the highlighted fields and try again.")).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Name$/ })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
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
  });

  test("accepts a valid submission and clears the form", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("textbox", { name: /Name$/ }).fill("Grace Hopper");
    await page.getByRole("textbox", { name: /Email$/ }).fill("grace@example.com");
    await page
      .getByRole("textbox", { name: /Message$/ })
      .fill("I would like to discuss a reproducible memory-forensics workflow.");

    // Populate the hidden bot field so the complete Server Action path is exercised without
    // retaining test contact data.
    await page.locator("#website").fill("https://example.com", { force: true });
    await page.getByRole("button", { name: /transmit_message/ }).click();

    await expect(page.getByText("Message received.")).toBeVisible();
    await expect(page.getByRole("textbox", { name: /Name$/ })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: /Email$/ })).toHaveValue("");
    await expect(page.getByRole("textbox", { name: /Message$/ })).toHaveValue("");
  });
});

test.describe("accessibility", () => {
  for (const route of ["/", "/contact"] as const) {
    test(`${route} has no detectable WCAG A or AA violations`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }

  test("exposes the skip link to keyboard users", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });
});
