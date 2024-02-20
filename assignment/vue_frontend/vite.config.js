import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 3000,
  },
  test: {
    // specify a default file that will be used for all tests: https://vitest.dev/config/#setupfiles
    setupFiles: "src/tests/testSetup.js",
    // Specify the environment in which to run the tests: https://vitest.dev/config/#environment
    environment: "jsdom",
    reporters: ["default", "json", "junit"],
    outputFile: {
      json: "src/tests/reports/unit_tests.json",
      junit: "src/tests/reports/unit_tests.xml",
    },
  },
});
