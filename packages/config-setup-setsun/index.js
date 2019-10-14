const path = require('path');
const { copyFile } = require('fs');
const { exec } = require('child_process');

const corePackages = [
  '@babel/core',
  'core-js',
  'eslint',
  'prettier',
  'typescript',
  'webpack',
  'webpack-cli',
  'webpack-dev-server'
];

const configPackages = [
  'babel-preset-setsun',
  'eslint-config-setsun',
  'webpack-config-setsun'
];

const configFiles = [
  '.eslintrc.js',
  '.prettierrc.js',
  'babel.config.js',
  'tsconfig.json'
];

// install packages
exec(`yarn install --dev ${configPackages.join(' ')} ${corePackages.join(' ')}`);

// setup and copy config files
for (let file of configFiles) {
  copyFile(file, `./${file}`, (err) => {
    const message = err ? err : `Copied ${file}.`
    console.log(message);
  });
}