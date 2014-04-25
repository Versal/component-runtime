# Versal-runtime [![Build Status](https://travis-ci.org/Versal/versal-runtime.svg?branch=master)](https://travis-ci.org/Versal/versal-runtime)

Versal-runtime allows to launch Versal Elements. Essentially, this is a collection of polyfills + versal-element.

Includes:
- Polymer HTML Imports
- Polymer Custom Elements
- Custom Events
- TemplateElement

Usage:

	npm install -g browserify

    npm install versal-runtime --save

    in your HTML file:

    <script src="./node_modules/versal-runtime/versal-runtime.min.js"></script>

To build:

    npm run build

To test:

    npm test
