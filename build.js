const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function runCommand(command) {
  execSync(command, { stdio: 'inherit' });
}

// Run TypeScript compiler
runCommand('npx tsc');

// Navigate to "client" directory
process.chdir(path.join(__dirname, 'client'));

// Run webpack
runCommand('npx webpack --config webpack.config.js');

// Navigate back to the root directory
process.chdir(__dirname);

// Copy index.js to the assets folder
fs.copyFileSync(
  path.join(__dirname, 'client', 'dist', 'index.js'),
  path.join(__dirname, 'assets', 'index.js')
);