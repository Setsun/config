module.exports = () => ({
  presets: [
    require.resolve('@babel/preset-typescript'),
    require.resolve('@babel/preset-react'),
    [
      require.resolve('@babel/preset-env'),
      {
        modules: 'auto',
        useBuiltIns: 'usage',
        corejs: { version: 3, proposals: true },
        targets: {
          browsers: [
            'last 2 versions',
            'safari >= 9',
            'ie >= 11'
          ]
        },
      },
    ],
  ],
  plugins: [
    [
      require.resolve('@babel/plugin-proposal-decorators'),
      { legacy: true },
    ],
    [
      require.resolve('@babel/plugin-proposal-class-properties'),
      { loose: true },
    ],
  ],
});
