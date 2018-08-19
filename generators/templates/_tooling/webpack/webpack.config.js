const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {};
PATHS.root = path.resolve(__dirname, '../..');
PATHS.src = path.resolve(PATHS.root, 'src');
PATHS.dist = path.resolve(PATHS.root, 'dist');
PATHS.htmlTemplate = path.resolve(PATHS.src, 'index.html');

module.exports = {
  entry: ['babel-polyfill', path.resolve(PATHS.src, 'main.jsx')],
  output: {
    path: PATHS.dist,
    filename: 'app.bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          fix: true,
        },
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
            },
          },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.htmlTemplate,
      filename: 'index.html',
    }),
    new DashboardPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
  },
};
