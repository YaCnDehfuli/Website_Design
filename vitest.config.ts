import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    environment: "node",
    exclude: ["src/**/*.integration.test.ts"],
    include: ["src/**/*.test.ts"],
    restoreMocks: true,
  },
});
