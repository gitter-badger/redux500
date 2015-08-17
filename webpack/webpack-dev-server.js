/* eslint no-console: 0 */

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./dev.config";

const WEBPACK_HOST = process.env.HOST || "localhost";
const WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

const serverOptions = {
  contentBase: `http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: {"Access-Control-Allow-Origin": "*"},
  stats: {colors: true}
}

const compiler = webpack(config, function(err, stats){
  const json = stats.toJson();
  if (json.errors.length)
    console.error(json.errors[0])
});

const webpackDevServer = new WebpackDevServer(compiler, serverOptions);

webpackDevServer.listen(WEBPACK_PORT, WEBPACK_HOST, function() {
  console.log("🚧 Webpack development server listening on %s:%s", WEBPACK_HOST, WEBPACK_PORT);
});
