var path = require("path");

module.exports = function(config) {
  config.set({
    browsers: ["Chrome", "Firefox", "Safari"],
    // karma only needs to know about the test bundle files
    files: [
      "tests.bundle.js"
    ],
    frameworks: [ "chai", "mocha" ],
    client: {
      mocha: {
        reporter: "html",
        ui: "bdd"
      }
    },
    plugins: [
      "karma-safari-launcher",
      "karma-firefox-launcher",
      "karma-chrome-launcher",
      "karma-chai-plugins",
      "karma-mocha",
      "karma-sourcemap-loader",
      "karma-webpack",
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      "tests.bundle.js": [ "webpack", "sourcemap" ]
    },
    reporters: [ "dots" ],
    // singleRun: true,

    // webpack config object,
    webpack: {
      devtool: "source-map",
      resolve: {
        modulesDirectories: ["node_modules", "src"]
      },
      module: {
        loaders: [
          {
            exclude: /node_modules/,
            loader: "babel-loader",
            test: /\.js/
          }
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    autoWatch: true,
    colors: true
  });
}
