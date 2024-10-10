import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier"; // Prettier와 충돌하는 규칙 비활성화

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended, // 기본 JavaScript 규칙
  pluginReact.configs.flat.recommended, // React 관련 규칙
  {
    plugins: {
      prettier: pluginPrettier, // Prettier 플러그인 추가
    },
    rules: {
      "prettier/prettier": "error", // Prettier 규칙을 ESLint에서 오류로 처리
    },
  },
  configPrettier, // Prettier와 충돌하는 규칙 비활성화
];
