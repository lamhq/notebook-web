const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config) => {
    // First we prevent webpack from using Storybook CSS rules to process CSS modules
    config.module.rules.find(
      rule => rule.test.toString() === '/\\.css$/'
    ).exclude = /\.module\.css$/;

    // Then we tell webpack what to do with CSS modules
    config.module.rules.push({
      test: /\.module\.css$/,
      include: path.resolve(__dirname, '../src'),
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: {
              localIdentName: '[local]-[hash:base64:5]',
            },
          },
        },
      ],
    });

    // use typescript loader for ts(x) file
    const idx = config.module.rules.findIndex(
      rule => rule.test.toString() === '/\\.(mjs|tsx?|jsx?)$/'
    );
    if (idx !== -1) {
      config.module.rules[idx] = {
        test: /\.(t|j)s(x?)$/,
        exclude: /node_modules/,
        use: [
          'ts-loader',
          {
            loader: 'react-docgen-typescript-loader',
            options: {
              // Provide the path to your tsconfig.json so that your stories can
              // display types from outside each individual story.
              tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
            },
          },
        ],
      };
    }

    // Return the altered config
    return config;
  },
}