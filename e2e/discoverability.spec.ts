import { expect, test } from "@playwright/test";

test("publishes site metadata and a share image", async ({ page, request }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Yasin Dehfouli · Cybersecurity Engineer/);
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /detection engineering/,
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/opengraph-image/,
  );
  await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
    "content",
    "Profile card for Yasin Dehfouli, Cybersecurity Engineer.",
  );
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");

  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const imageBody = await image.body();
  expect(imageBody.byteLength).toBeGreaterThan(10_000);
  expect(imageBody.readUInt32BE(16)).toBe(1200);
  expect(imageBody.readUInt32BE(20)).toBe(630);
});

test("publishes robots and database-backed sitemap records", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  await expect(robots.text()).resolves.toContain("Sitemap: http://localhost:3000/sitemap.xml");

  const sitemap = await request.get("/sitemap.xml");
  const sitemapBody = await sitemap.text();
  expect(sitemap.status()).toBe(200);
  expect(sitemapBody).toContain("/projects/vadvit-explainable-memory-forensics");
  expect(sitemapBody).toContain("/publications/memory-analysis-malware-detection-oscar-survey");
});
