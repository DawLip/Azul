const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const htmlPlugin = new HtmlWebPackPlugin({
  filename: './index.html',
  template: './src/index.html',
  inject: false,
  minify: {
    html5: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributese: true,
    useShortDoctype: true
  }
});

module.exports = [
  {
    entry: './src/index.jsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    devtool: 'inline-source-map',
    node: { fs: 'empty' },
    plugins: [htmlPlugin],
    externals: ['uws', 'net'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.sass$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader',
          options: { name: '/static/[name].[ext]' }
        }
      ]
    }
  },
  {
    entry: './server/index.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js'
    },
    devtool: 'inline-source-map',
    node: { fs: 'empty' },
    externals: ['uws', 'net'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  }
];
