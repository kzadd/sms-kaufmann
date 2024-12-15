import eslint from '@eslint/js'
import angular from 'angular-eslint'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import sortExports from 'eslint-plugin-sort-exports'
import globals from 'globals'
import tseslint from 'typescript-eslint'

/**
 * ESLint configuration.
 */
export default tseslint.config(
  {
    ignores: ['coverage', 'dist', 'node_modules'],
    settings: {
      angular: {
        version: 'detect'
      }
    }
  },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended
    ],
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      'sort-exports': sortExports
    },
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          prefix: 'app',
          style: 'kebab-case',
          type: 'element'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          prefix: 'app',
          style: 'camelCase',
          type: 'attribute'
        }
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          ignoreRestSiblings: false,
          vars: 'all'
        }
      ],
      eqeqeq: ['error', 'always'],
      'no-empty-pattern': 'warn',
      'no-var': 'error',
      'object-shorthand': ['warn', 'always'],
      'prefer-const': 'error',
      'prettier/prettier': 'error',
      'quote-props': ['warn', 'as-needed'],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            ['^\\u0000'],
            ['^@angular', '^node:', '^@?\\w'],
            ['^@core', '^@mocks', '^@presentation', '^@shared', '^\\.']
          ]
        }
      ],
      'sort-exports/sort-exports': [
        'warn',
        {
          ignoreCase: true,
          sortDir: 'asc',
          sortExportKindFirst: 'value'
        }
      ],
      'sort-keys': [
        'warn',
        'asc',
        {
          caseSensitive: false,
          minKeys: 2,
          natural: true
        }
      ]
    }
  },
  {
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    files: ['**/*.html']
  }
)
