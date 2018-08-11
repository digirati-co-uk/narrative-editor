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
};
