module.exports = {
  'env': {
    node: true,
    browser: true,
    es2021: true,
  },
  'extends': [
    'next/core-web-vitals',
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:css-modules/recommended',
    'plugin:react-redux/recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  'plugins': ['@typescript-eslint', 'jsx-a11y', 'css-modules', 'react-redux'],
  'rules': {
    'react/react-in-jsx-scope': 0,
    'jsx-quotes': ['error', 'prefer-double'],
    'react/prop-types': 0,
    'object-curly-spacing': [2, 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'linebreak-style': 'off',
    'operator-linebreak': ['error', 'after'],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'always' }],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-closing-tag-location': ['error', 'always'],
    'react/jsx-closing-bracket-location': ['error', 'line-aligned'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        'multiline': {
          'delimiter': 'semi',
          'requireLast': true,
        },
        'singleline': {
          'delimiter': 'semi',
          'requireLast': false,
        },
      },
    ],
  },
};
