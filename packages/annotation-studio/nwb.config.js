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
    copy: {
      options: {
        debug: true,
      },
      patterns: [
        {
          from: 'src/describing-outer.json',
          to: 'es/',
          toType: 'file',
        },
      ],
    },
  },
};
