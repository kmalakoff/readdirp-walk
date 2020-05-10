'use strict';

module.exports = {
  root: true,
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'script',
  },
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'array-callback-return': 'error',
    'no-empty': [
      'error',
      {
        allowEmptyCatch: true,
      },
    ],
    'no-else-return': [
      'error',
      {
        allowElseIf: false,
      },
    ],
    'no-lonely-if': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: true,
      },
    ],
    'prefer-const': [
      'error',
      {
        ignoreReadBeforeAssign: true,
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
    'prefer-spread': 'error',
    'prefer-template': 'error',
    radix: 'error',
    semi: 'error',
    strict: 'error',
    quotes: ['error', 'single'],
  },
};
