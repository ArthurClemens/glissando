const OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = {
  env: {
    browser: false,
    es6: true,
  },
  extends: ['prettier', 'plugin:jsx-a11y/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'prettier',
    'import',
    'jest-dom',
    'jsx-a11y',
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': ERROR,
    // ESLint rules
    'no-useless-computed-key': ERROR,
    'no-underscore-dangle': OFF,
    'arrow-parens': [ERROR, 'as-needed'],
    'no-nested-ternary': OFF,
    'import/prefer-default-export': OFF,
    'eol-last': [ERROR, 'always'],
    'import/extensions': [ERROR, { json: 'always' }],
    'import/no-unresolved': ERROR,
    'no-console': ['warn', { allow: ['error', 'info'] }],

    // Sorting rules
    'simple-import-sort/imports': ERROR,
    'sort-imports': OFF,
    'import/order': OFF,
    'import/first': ERROR,
    'import/newline-after-import': ERROR,
    'import/no-duplicates': ERROR,

    // TypeScript rules
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': [
      WARN,
      { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-function-return-type': OFF,

    // React rules
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
