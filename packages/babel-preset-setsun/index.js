module.exports = function () {
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          targets: {
            browsers: [
              'last 2 versions',
              'safari >= 9',
              'ie >= 11'
            ]
          },
        },
      ],
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-typescript')
    ],
    plugins: [
      [
        require.resolve('@babel/plugin-proposal-decorators'),
        { legacy: true },
      ],
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      require.resolve('@babel/plugin-proposal-function-sent'),
      require.resolve('@babel/plugin-proposal-json-strings'),
      require.resolve('@babel/plugin-proposal-numeric-separator'),
      require.resolve('@babel/plugin-proposal-throw-expressions'),
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      require.resolve('@babel/plugin-syntax-import-meta'),
    ],
  };
}
