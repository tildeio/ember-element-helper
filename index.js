'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(_type, registry) {
    registry.add('htmlbars-ast-plugin', {
      name: 'element-helper-syntax',

      plugin: require('./lib/element-helper-syntax-plugin'),

      baseDir: function() {
        return __dirname;
      }
    });
  }
};
