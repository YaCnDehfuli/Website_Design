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

  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
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
