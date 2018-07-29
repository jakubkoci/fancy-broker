// @ts-check
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: './src/main.tsx',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    // overlay: true,
    stats: 'errors-only',
  },
  module: {
    rules: [
      {
        include: resolve(__dirname, 'src'),
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [new HTMLWebpackPlugin({ template: './src/index.html' })],
}

module.exports = config
