'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const packageJson = require('./package');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // Add options here
    autoImport: {
      watchDependencies: Object.keys(packageJson.dependencies),
    },
  });

  if (app.env === 'test') {
    app.import('node_modules/ember-source/dist/ember-template-compiler.js', {
      type: 'test',
    });
  }

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
