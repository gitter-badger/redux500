// Webpack config for creating the production bundle.

/* eslint no-var: 0 */

require("babel/register");

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var strip = require("strip-loader");

var relativeAssetsPath = "../static/dist";
var assetsPath = path.resolve(__dirname, relativeAssetsPath);

module.exports = {
  devtool: "source-map",
  entry: {
    "main": [
      "./src/client/main.js"
    ]
  },
  output: {
    path: assetsPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "url",
        query: {
          limit: 8000
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [strip.loader("debug"), "babel?cacheDirectory"]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      // enable css loading with special options for css module spec and define the class key for easier debugging
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=2&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap")
      }
    ]
  },
  progress: true,
  plugins: [

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin("[name]-[chunkhash].css", {
      allChunks: true
    }),

    new webpack.NoErrorsPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        // Mainly used to require CSS files with webpack, which can happen only on browser
        // Used as `if (process.env.BROWSER)...`
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development")
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
        writeStats.call(this, stats, "prod");
      });
    }

  ]
};
