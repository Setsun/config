const fs = require('fs');

const files = [
  '.babelrc',
  '.eslintrc',
  '.prettierrc'
];

for (let file of files) {
  fs.copyFileSync(file, __dirname);
}
