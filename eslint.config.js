import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  // Configuração para os arquivos JavaScript e TypeScript
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,  // Usar o parser do TypeScript para arquivos TS e JSX
      globals: globals.browser,  // Adiciona variáveis globais de ambiente de navegador
    },
    rules: {
      // Adiciona regras básicas recomendadas e integrações
      ...pluginJs.configs.recommended.rules,  // Regras recomendadas para JS
      ...tseslint.configs.recommended.rules,  // Regras recomendadas para TypeScript
      ...pluginReact.configs.flat.recommended.rules,  // Regras recomendadas para React
    },
    settings: {
      react: {
        version: "detect",  // Detectar a versão do React automaticamente
      },
    },
  },
];
