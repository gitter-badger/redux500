/* eslint no-console: 0, no-var: 0 */

// Register babel to have ES6 support on the server
require("babel/register");

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

var settings = require("./settings");
var startServer = require("./src/server");

startServer(settings, function(app) {

  console.log("Express %s server listening on %s:%s", app.get("env"), app.get("host"), app.get("port"));

  if (app.get("env") === "development") {
    var startWebpackDevServer = require("./webpack/server");
    startWebpackDevServer({
      host: settings.host,
      port: settings.webpackPort
    });
  }

});
