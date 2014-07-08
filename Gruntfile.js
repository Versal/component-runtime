/**
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
module.exports = function(grunt) {
  var readManifest = require('./bower_components/tools/loader/readManifest.js');

  grunt.initConfig({
    concat_sourcemap: {
      Platform: {
        options: {
          sourcesContent: true,
          nonull: true
        },
        files: {
          'build/runtime.concat.js': readManifest('build.json')
        }
      }
    },
    uglify: {
      options: {
        nonull: true,
        compress: {
          unsafe: false
        },
        beautify: {
          ascii_only: true
        }
      },
      Platform: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/runtime.min.js.map',
          sourceMapIn: 'build/runtime.concat.js.map',
          sourceMapIncludeSources: true,
        },
        files: {
          'dist/runtime.min.js': 'build/runtime.concat.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-concat-sourcemap');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat_sourcemap', 'uglify'])
};
