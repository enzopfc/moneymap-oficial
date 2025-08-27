module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
  ],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist/", "node_modules/"],
};
