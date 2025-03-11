import js from '@eslint/js';
import vitestPlugin from '@vitest/eslint-plugin';
import vueConfig from '@vue/eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import vuePlugin from 'eslint-plugin-vue';
import globals from 'globals';
import vueParser from 'vue-eslint-parser';

export default [
  {
    ignores: ['**/dist/**', '**/node_modules/**', '**/coverage/**'],
  },
  js.configs.recommended,
  {
    ...vueConfig,
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['apps/client/**/*.{js,vue}'],
    plugins: {
      vue: vuePlugin,
      import: importPlugin,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/attribute-hyphenation': ['error', 'always'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
        },
      ],
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/first': 'error',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.vue'],
        },
      },
    },
  },
  {
    files: ['**/*.test.js', '**/*.spec.js', '**/tests/**/*.js'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      'vitest/expect-expect': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/valid-expect': 'error',
    },
  },
  {
    files: ['apps/server/**/*.js'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      'import/extensions': ['error', 'ignorePackages'],
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-unresolved': 'error',
      'import/no-absolute-path': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
