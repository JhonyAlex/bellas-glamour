import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
    test: {
        environment: "node",
        globals: true,
        include: ["src/**/*.test.{ts,tsx}"],
        coverage: {
            provider: "v8",
            include: [
                "src/lib/admin-validations.ts",
                "src/app/api/admin/models/**/*.ts",
                "src/hooks/use-admin-models.ts",
            ],
            thresholds: {
                lines: 90,
                functions: 90,
                branches: 80,
                statements: 90,
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
