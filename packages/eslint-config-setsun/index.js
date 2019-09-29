module.exports = {
  env: {
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion:  2020,
    sourceType:  'module'
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  ecmaFeatures: {
    jsx:  true
  },
  rules: {},
  settings: {
    react: {
      version: 'detect'
    }
  }
};
