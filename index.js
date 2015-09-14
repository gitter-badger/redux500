/* eslint no-console: 0, no-var: 0 */

var stylus = require("stylus");

// Use production react on the server side for production builds
// https://gist.github.com/mridgway/778ecf55c317cf53eff3
// According to Yahoo, the version of react shipped with NPM is not optimized for production
if (process.env.NODE_ENV === "production") {
  require("react/dist/react-with-addons.min");
  require.cache[require.resolve("react")] =
      require.cache[require.resolve("react/dist/react-with-addons.min")];
  require.cache[require.resolve("react/addons")] =
      require.cache[require.resolve("react/dist/react-with-addons.min")];
}

// Register babel to have ES6 support on the server
require("babel/register");

// Enable css modules to be loaded on the server side
require("css-modules-require-hook")({
  extensions: [".styl"],
  rootDir: __dirname + "/src/style",
  preprocessCss: function(data) {
    var css = stylus(data)
                .set("paths", [ __dirname + "/src/style"])
                .render();
    return css;
  }
});

// Prevent issues with libraries using this var (see http://tinyurl.com/pcockwk)
delete process.env.BROWSER;

require("./src/server")(function (app) {
  console.log("Express %s server listening on %s:%s", app.get("env"), app.get("host"), app.get("port"));

  if (app.get("env") === "development") {
    require("./webpack/server")();
  }

});
