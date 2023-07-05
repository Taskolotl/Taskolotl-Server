const path = require('path');

const rootConfig = {
  entry: './dist/index.js', // Entry point for the root source files
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Add any necessary loaders, plugins, and other configuration options for the root source files
};

const clientConfig = {
  entry: './client/dist/index.js', // Entry point for the client source files
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // Add any necessary loaders, plugins, and other configuration options for the client source files
};

module.exports = [rootConfig, clientConfig];