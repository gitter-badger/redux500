// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

/* eslint no-var: 0 */

import webpack from "webpack";

import {host, webpackPort, distPath} from "../settings";

module.exports = {
  devtool: "source-map",
  entry: [
    "webpack-dev-server/client?http://" + host + ":" + webpackPort,
    "webpack/hot/dev-server",
    "./src/client.js"
  ],
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    path: distPath,
    publicPath: "http://" + host + ":" + webpackPort + "/dist/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory"] }

      // { test: /\.(jpe?g|png|gif|svg)$/, loader: "url", query: { limit: 8000 } },
      // { test: /\.scss$/, loader: "style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap" }
    ]
  },
  plugins: [

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify("development"),
        DEVTOOLS: true
      }
    })

  ]

};
