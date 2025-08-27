module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
  ],
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-unused-vars": ["error", { 
      "vars": "all", 
      "args": "after-used", 
      "ignoreRestSiblings": false,
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_"
    }]
  },
  ignorePatterns: ["dist/", "node_modules/"],
};
