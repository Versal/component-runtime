module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/runtime.min.js',
      'test/*.html',
      'test/*_spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    autoWatch: true,
    browsers: ['Firefox']
  });
};
