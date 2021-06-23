const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const nodeEnv = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // Remove your build folder(s) before building
    new CleanWebpackPlugin(),

    // Automatically generate an HTML5 file for you that includes all your webpack bundles
    new HtmlWebpackPlugin({
      title: 'Admin App',
      favicon: './src/favicon.ico',
      template: './src/index.html',
    }),

    // Create global constants which can be configured at compile time
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
    }),
  ],
  module: {
    rules: [
      // load image, font
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      // load typescript file
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      // load css file
      {
        test: /\.css$/,
        use: [
          // extract CSS into separate files
          nodeEnv === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
