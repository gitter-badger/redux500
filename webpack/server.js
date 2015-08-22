/* eslint no-console: 0 */

import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./dev.config";

export default function({host, port}) {

  const serverOptions = {
    contentBase: `http://${host}:${port}`,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  };

  const compiler = webpack(config);
  const webpackDevServer = new WebpackDevServer(compiler, serverOptions);

  return webpackDevServer.listen(port, host, function() {
    console.log("Webpack development server listening on %s:%s", host, port);
  });
}
