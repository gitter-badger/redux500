/* eslint no-console: 0, no-var: 0 */
var createServer = require("./src/server/createServer");

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel/register");

// Create and run the express server
createServer((server) => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});
