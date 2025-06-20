import { expect, test } from "@playwright/test";

const publicRoutes = [
  ["/", "Yasin Dehfouli."],
  ["/about", "About Yasin Dehfouli."],
  ["/projects", "Projects"],
  ["/publications", "Publications"],
  ["/engineering", "Engineering practice."],
  ["/contact", "Contact."],
] as const;

test.describe("public routes", () => {
  for (const [route, heading] of publicRoutes) {
    test(`${route} renders its primary heading`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
    });
  }

  test("published detail routes render and missing records return 404", async ({ page }) => {
    await page.goto("/projects/vadvit-explainable-memory-forensics");
    await expect(page.getByRole("heading", { level: 1, name: /VADViT/ })).toBeVisible();

    await page.goto("/publications/memory-analysis-malware-detection-oscar-survey");
    await expect(page.getByRole("heading", { level: 1, name: /OSCAR Methodology/ })).toBeVisible();

    const missingProject = await page.goto("/projects/does-not-exist");
    expect(missingProject?.status()).toBe(404);
  });
});

test.describe("primary navigation", () => {
  test("navigates between public sections", async ({ page }) => {
    await page.goto("/");
    const navigation = page.getByRole("navigation", { name: "Primary navigation" });

    await navigation.getByRole("link", { name: /projects/ }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(navigation.getByRole("link", { name: /projects/ })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await navigation.getByRole("link", { name: /publications/ }).click();
    await expect(page).toHaveURL(/\/publications$/);
  });

  test("supports the compact navigation menu", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: /menu/ });
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("navigation").getByRole("link", { name: /about/ }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });
});
