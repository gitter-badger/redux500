// Webpack config for creating the production bundle.

/* eslint no-var: 0 */

require("babel/register");

var path = require("path");
var webpack = require("webpack");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var WebpackCleanupPlugin = require("webpack-cleanup-plugin");

var ExtractTextPlugin = require("extract-text-webpack-plugin");
var dist = path.resolve(__dirname, "../static/dist");

module.exports = {
  devtool: "source-map",
  entry: "./src/client.js",
  output: {
    path: dist,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["babel?cacheDirectory"] },
      { test: /\.jss$/, loader: ExtractTextPlugin.extract("style", "css?modules!jss") }

      // { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=2&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap") }
      // { test: /\.(jpe?g|png|gif|svg)$/, loader: "url", query: { limit: 8000 } }

    ]
  },
  plugins: [

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("style", "[name]-[chunkhash].css", {
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

    // Write out stats.json file to build directory.
    new StatsWriterPlugin(),

    // Cleanup extraneous files from the output directory
    new WebpackCleanupPlugin({
      exclude: ["stats.json"]
    })

  ]
};
