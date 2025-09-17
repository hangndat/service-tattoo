/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier", // phải để cuối để tắt rule xung đột với Prettier
  ],
  plugins: ["unused-imports", "import"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "unused-imports/no-unused-imports": "error",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
};
