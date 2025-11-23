// Copilot: generate a complete ESLint configuration for a Next.js + React 19 project.
// Include eslint:recommended, react, @next/next, jsx-a11y, and prettier.
// Disable react/react-in-jsx-scope and react/prop-types. Enforce prettier formatting.

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@next/next/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Next.js does not require React in scope
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};