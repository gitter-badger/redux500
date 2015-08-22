/* eslint no-console: 0 */

// Create and start the express app. Export a function so we can test it

import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import serveStatic from "serve-static";
import favicon from "serve-favicon";
import morgan from "morgan";
import render from "./render";

/**
 * Create and run the express app.
 * @param  {Object}   settings Settings as specified in
 *                             http://expressjs.com/api.html#app.settings.table
 * @param  {Function} callback Function receiving the express app as first
 *                             argument
 * @return {http.Server}
 */
export default function createServer(settings, callback) {

  const app = express();

  for (const name in settings) {
    app.set(name, settings[name])
  }

  // Usual express stuff
  app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(favicon(path.resolve(__dirname, "../../static/assets/favicon.png")));

  // TODO locales - we may want to consider i18n-node?

  // Use the `static` dir for serving static assets. On production, it contains the js
  // files built with webpack
  app.use(serveStatic(path.resolve(__dirname, "../../static")));

  // ...while on development, serve the js files with a webpack dev server.
  if (app.get("env") === "development") {
    require("../../webpack/webpack-dev-server");
  }

  // Render the app server-side and send it as response
  app.use(render);

  // Generic server errors (e.g. not caught by components)
  app.use((err, req, res, next) => {                         // eslint-disable-line no-unused-vars
    console.log("Error on request %s %s", req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send("Something bad happened");
  });

  // Finally, start the express application
  app.set("port", process.env.PORT || 3000);

  return app.listen(app.get("port"), () => {
    callback(app);
  });

}

