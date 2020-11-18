'use strict';

module.exports = {
  name: require('./package').name,

  setupPreprocessorRegistry(_type, registry) {
    let pluginObj  = this._buildPlugin();
    pluginObj.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildPlugin',
      params: {},
    };
    registry.add('htmlbars-ast-plugin', pluginObj);
  },

  _buildPlugin() {
    return {
      name: 'element-helper-syntax',
      plugin: require('./lib/element-helper-syntax-plugin'),
      baseDir: function() {
        return __dirname;
      }
    };
  }
};
