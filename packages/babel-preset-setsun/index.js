module.exports = function (context, options) {
  const modules = options && options.modules === true;

  return {
    presets: [
      [
        require.resolve('babel-preset-env'),
        {
          targets: {
            browsers: [
              "last 2 versions",
              "safari >= 9",
              "ie >= 11"
            ]
          },
          modules: modules
        },
      ],
      require.resolve('babel-preset-stage-2'),
      require.resolve('babel-preset-react'),
      require.resolve('babel-preset-flow')
    ]
  };
}
