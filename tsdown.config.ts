import { defineConfig } from "tsdown";

export default defineConfig({
  // Build options
  platform: "browser",
  exports: true,
  dts: true,
  // Lint options
  publint: true,
  attw: true,
});
