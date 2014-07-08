# Versal component runtime [![Build Status](https://travis-ci.org/Versal/component-runtime.svg?branch=master)](https://travis-ci.org/Versal/component-runtime)

Collection of polyfills for new web technologies, such as web components, for being used in production environments.

We aim to include polyfills that are stable enough to work well with different browsers ([Evergreen](http://eisenbergeffect.bluespire.com/evergreen-browsers/) Chrome/Firefox/Safari/IE>=10, Mobile Safari) and with other libraries. We want to be on the edge of modern web standards, but not the bleeding edge.

Feel free to request additions that you feel make sense by [filing an issue](https://github.com/Versal/component-runtime/issues/new).

**Included polyfills:**
- [Polymer HTML Imports](https://github.com/Polymer/HTMLImports)
- [Polymer Custom Elements](https://github.com/Polymer/CustomElements)
- [Custom Events](https://github.com/kaesetoast/customevent-polyfill)
- [TemplateElement](https://github.com/Versal/html-template-polyfill)
- [ES6 Promises](https://github.com/jakearchibald/es6-promise)
- [requestAnimationFrame](https://github.com/cagosta/requestAnimationFrame)

**Usage:**

    bower install versal-component-runtime

in your HTML file:

    <script src="bower_components/versal-component-runtime/dist/runtime.min.js"></script>

**To build:**

    npm install
    grunt

**To test:**

Set up a BrowserStack account and:

    export BROWSER_STACK_USERNAME=... BROWSER_STACK_ACCESS_KEY=...
    npm test
    
Or install custom karma runners and use them:
    
    npm install karma-chrome-runner
    karma start --browsers Chrome --no-single-run
