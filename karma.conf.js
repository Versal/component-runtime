module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'dist/runtime.min.js',
      'test/*.html',
      'test/*_spec.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO, // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG

    singleRun: true,
    browserStack: {
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY
    },
    customLaunchers: {
      bs_chrome_win: { base: 'BrowserStack', browser: 'chrome', os: 'Windows', os_version: 'XP'},
      bs_firefox_mac: { base: 'BrowserStack', browser: 'firefox', os: 'OS X', os_version: 'Mavericks'},
      bs_safari_mac: { base: 'BrowserStack', browser: 'safari', os: 'OS X', os_version: 'Mountain Lion'},
      bs_ie11: { base: 'BrowserStack', browser: 'ie', browser_version: '11.0', os: 'Windows', os_version: '8.1'},
      bs_ie10: { base: 'BrowserStack', browser: 'ie', browser_version: '10.0', os: 'Windows', os_version: '7'},
      bs_iphone5: { base: 'BrowserStack', device: 'iPhone 5', os: 'ios', os_version: '6.0'}
    },
    browsers: ['bs_chrome_win', 'bs_firefox_mac', 'bs_safari_mac', 'bs_ie11', 'bs_ie10', 'bs_iphone5']
  });
};
