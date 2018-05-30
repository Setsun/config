module.exports = {
  parser: 'babel-eslint',
  plugins: ['import', 'react', 'prettier'],
  extends: ['eslint', 'babel-eslint', 'prettier'],
  rules: {
    'prettier': [
      'error',
      {
        'singleQuote': true,
        'bracketSpacing': true,
        'tabWidth': 2,
        'trailingComma': 'es5',
        'printWidth': 80
      }
    ]
  }
};
