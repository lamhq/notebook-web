const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = (env) => {
  return {
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      clean: true,
      // performance best practice
      pathinfo: false,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      // Automatically generate an HTML5 file for you that includes all your webpack bundles
      new HtmlWebpackPlugin({
        title: 'Notebook',
        favicon: './src/favicon.svg',
        template: './src/index.html',
      }),

      // Create global constants which can be configured at compile time
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(process.env.npm_package_version),
      }),

      new WebpackPwaManifest({
        name: 'Notebook',
        short_name: 'Notebook',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '.',
        description: 'My note application',
        background_color: '#eff1f2',
        theme_color: '#296BE3',
        icons: [
          {
            src: path.resolve('src/favicon.svg'),
            sizes: [96, 128, 256, 512], // multiple sizes
          },
          {
            src: path.resolve('src/favicon.svg'),
            size: '512x512',
            purpose: 'maskable',
          },
        ],
      }),
    ],
    module: {
      rules: [
        // load image, font
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // load font
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        // load typescript file
        {
          test: /\.ts(x?)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /\.stories\./,
          // enable transpileOnly for build performance best practice
          use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          enforce: 'pre',
          loader: 'source-map-loader',
        },
        // load css file
        {
          test: /\.css$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            // extract CSS into separate files
            env.production ? MiniCssExtractPlugin.loader : 'style-loader',
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
};
