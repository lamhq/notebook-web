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