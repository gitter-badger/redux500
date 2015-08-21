/* eslint no-console: 0, no-var: 0 */

// Register babel to have ES6 support on the server
require("babel/register");

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;


// Create and run the express server
var createServer = require("./src/server/createServer");
var settings = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000
}
createServer(settings, function (app) {
  console.log("Express %s server listening on %s", app.get("env"), app.get("port"));
});
