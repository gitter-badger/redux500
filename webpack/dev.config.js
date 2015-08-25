// This is the webpack config to use during development.
// It enables the hot module replacement, the source maps and inline CSS styles.

/* eslint no-var: 0, no-console: 0 */

import path from "path";
import webpack from "webpack";
import WebpackErrorNotificationPlugin from "webpack-error-notification";

const host = process.env.HOST || "0.0.0.0";
const port = (process.env.PORT + 1) || 3001;
const dist = path.resolve(__dirname, "../static/dist");

const config = {
  devtool: "source-map",
  entry: [
    "webpack-dev-server/client?http://" + host + ":" + port,
    "webpack/hot/only-dev-server",
    "./src/client.js"
  ],
  output: {
    filename: "bundle.js",
    chunkFilename: "[name].bundle.js",
    path: dist,
    publicPath: "http://" + host + ":" + port + "/dist/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?cacheDirectory"] }

      // { test: /\.scss$/, loader: "style!css?modules&importLoaders=2&sourceMap&localIdentName=[name]-[local]-[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap" },
      // { test: /\.(jpe?g|png|gif|svg)$/, loader: "url", query: { limit: 8000 } }
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
    }),
    new WebpackErrorNotificationPlugin()

  ]

};

export default config;
