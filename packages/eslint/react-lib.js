module.exports = {
  extends: ["./base.js"],
  plugins: ["react", "react-hooks"],
  extends: ["./base.js"],
  env: {
    browser: true,
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
