const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function runCommand(command) {
  execSync(command, { stdio: 'inherit' });
}

// Run TypeScript compiler
runCommand('npm run build');

// Run webpack
runCommand('npm run build:client');

// Copy index.js to the assets folder
fs.copyFileSync(
  path.join(__dirname, 'client', 'dist', 'index.js'),
  path.join(__dirname, 'assets', 'index.js')
);