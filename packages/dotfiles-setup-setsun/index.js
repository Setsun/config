const fs = require('fs');

const files = [
  '.babelrc',
  '.eslintrc',
  '.flowconfig',
  '.prettierrc'
];

for (let file of files) {
  fs.copyFileSync(file, __dirname);
}
