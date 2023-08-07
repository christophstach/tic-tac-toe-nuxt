/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: "vue-eslint-parser",
  plugins: ["simple-import-sort"],
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
};
