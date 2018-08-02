module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'JSONExport',
      externals: {
        react: 'React',
      },
    },
  },
};
