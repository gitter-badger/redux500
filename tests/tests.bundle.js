// If you use webpack-specific features in your modules (e.g., loaders, plugins) you will need to use webpack to build a test bundle. The fastest and simplest approach is to create a single, test-specific entry file.

var context = require.context(
  "./universal",            // context folder
  true,           // include subdirectories
  /.+\.spec\.js/  // file pattern to match
);

context.keys().forEach(context);

module.exports = context;
