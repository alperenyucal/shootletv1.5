module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:jsx-a11y/recommended',
    'plugin:css-modules/recommended',
    'plugin:react-redux/recommended',
  ],
  plugins: [
    'jsx-a11y',
    'css-modules',
    'react-redux'
  ],
  rules: {
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  }
};