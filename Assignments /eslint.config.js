import { defineConfig } from "eslint/config";

import js from "@eslint/js";

import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  // JS recommended configs
  js.configs.recommended,

  // Add custom rules
  {
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },

  // Prettier config using eslint-config-prettier
  // This must be last to override properly
  eslintConfigPrettier,
]);
