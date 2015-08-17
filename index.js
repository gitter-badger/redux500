// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

// Register babel to have ES6 support on the server
require("babel/register");

// Start the server app
require("./src/server/express");
