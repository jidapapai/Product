import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import importAliasPlugin from '@limegrass/eslint-plugin-import-alias';
import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      '@limegrass/import-alias': importAliasPlugin,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'prettier/prettier': 'error',
      // Import Alias rule
      '@limegrass/import-alias/import-alias': [
        'warn',
        { aliasConfigPath: 'tsconfig.app.json' },
      ],
    },
    ignorePatterns: ['test-setup.ts'],
  },
  eslintPluginPrettier,
]);
