const importOrderRule = ['error', {
  'newlines-between': 'always',
  'groups': [
    ['type'],
    ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
  ],
}];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2021,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['import', 'import-newlines', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'new-cap': 'off',
    'object-curly-spacing': ['error', 'always'],
    'max-len': ['error', {
      code: 120,
    }],
    'no-multi-spaces': ['error'],
    'import-newlines/enforce': ['error',
      { items: 3 },
    ],
    'import/order': importOrderRule,
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'import/order': importOrderRule,
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['*Controller.ts'],
      rules: {
        'no-useless-catch': 'off',
      },
    },
  ],
};
