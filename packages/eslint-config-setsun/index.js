module.exports = {
  extends: ['eslint', 'babel-eslint', 'prettier'],
  plugins: ['import', 'react', 'prettier'],
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
