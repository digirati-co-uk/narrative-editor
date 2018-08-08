const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'AnnotationStudio',
      externals: {
        react: 'React',
      },
    },
  },
  webpack: {
    extra: {
      // Unfortunately this only deals with the umd
      plugins: [
        new CopyWebpackPlugin(
          [
            {
              from: 'src/describing-outer.json',
              to: '@narrative-editor/describing-outer.json',
              toType: 'file',
            },
          ],
          {
            debug: true,
          }
        ),
      ],
    },
  },
};
