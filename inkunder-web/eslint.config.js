// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import vitest from "eslint-plugin-vitest";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vitest.environments.env.globals, // Thêm globals cho Vitest (describe, it, expect…)
        React: "readonly", // Fix lỗi React JSX
      },
    },
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
      vitest, // plugin vitest
    },
    rules: {
      // Xóa import thừa
      "unused-imports/no-unused-imports": "error",

      // Biến/argument chưa dùng thì cho phép bắt đầu bằng "_"
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // Import order: nhóm, alphabetize, newline
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Không export default anonymous array/object
      "import/no-anonymous-default-export": "warn",
    },
    ignores: ["node_modules/**", ".next/**", "dist/**", "**/*.d.ts"], // thay cho .eslintignore cũ
  },
];
