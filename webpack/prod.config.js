// Webpack config for creating the production bundle.

/* eslint no-var: 0 */

require("babel/register");

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var writeStats = require("./utils/writeStats");
var settings = require("../settings");

module.exports = {
  devtool: "source-map",
  entry: "./src/client.js",
  output: {
    path: settings.distPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel?cacheDirectory"] }

      // { test: /\.(jpe?g|png|gif|svg)$/, loader: "url", query: { limit: 8000 } },
      // { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=2&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap") }

    ]
  },
  plugins: [

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css", {
      allChunks: true
    }),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        // Used to require CSS files with webpack as `if (process.env.BROWSER)...`
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("production")
      }
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // stats
    function () {
      this.plugin("done", function (stats) {
        writeStats.call(this, stats, "production");
      });
    }

  ]
};
