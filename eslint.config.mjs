// @ts-check
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginJest from 'eslint-plugin-jest';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import React from 'react';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // ESLint recommended
  {
    name: '@eslint/js/recommended',
    ...eslint.configs.recommended,
  },

  // normal Typescript
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked.filter(
    (config) => config.name === 'typescript-eslint/stylistic-type-checked',
  ),
  {
    // enable linting with type information
    name: 'typescript-parser-options',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // React Typescript
  {
    name: 'eslint-plugin-react',
    files: ['**/*.tsx'],
    ...reactPlugin.configs.flat?.recommended,
    ...reactPlugin.configs.flat?.['jsx-runtime'],
    languageOptions: {
      ...reactPlugin.configs.flat?.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: React.version,
      },
    },
  },

  // Jest test files
  {
    name: 'eslint-plugin-jest',
    files: ['**/*.spec.ts', '**/*.test.ts'],
    ...pluginJest.configs['flat/all'],
  },

  // Prettier: turns off all rules that are unnecessary or might conflict with Prettier.
  {
    name: 'eslint-config-prettier',
    ...eslintConfigPrettier,
  },

  // global ignore, include only files in `src` directory
  {
    name: 'Global Ignore',
    ignores: ['*', '!src'],
  },
);
