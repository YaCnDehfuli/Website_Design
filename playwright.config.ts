import { defineConfig, devices } from "@playwright/test";

const localBaseUrl = "http://127.0.0.1:3100";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? localBaseUrl;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  ...(process.env.PLAYWRIGHT_BASE_URL
    ? {}
    : {
        webServer: {
          command: "corepack pnpm start --hostname 127.0.0.1 --port 3100",
          reuseExistingServer: !process.env.CI,
          timeout: 30_000,
          url: localBaseUrl,
        },
      }),
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
