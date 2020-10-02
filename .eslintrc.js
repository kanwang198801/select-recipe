module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
  plugins: ['simple-import-sort'],
  // add your custom rules here
  rules: {
    'react/prop-types': 1,
    'simple-import-sort/sort': 'error',
    'sort-imports': 'off',
  },
  overrides: [
    {
      files: 'server/**/*.js',
      env: { node: true },
      rules: {
        'simple-import-sort/sort': 'off',
        'import/order': ['error', { 'newlines-between': 'always' }],
      },
    },
  ],
}
