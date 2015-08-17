/* eslint no-console: 0 */

import path from "path";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import serveStatic from "serve-static";
import favicon from "serve-favicon";
import morgan from "morgan";
import render from "./render";

// Initialize express server

const server = express();

// Usual express stuff

server.use(morgan(server.get("env") === "production" ? "combined" : "dev"));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(compression());
server.use(favicon(path.resolve(__dirname, "../../static/assets/favicon.png")));

// TODO locales - we may want to consider i18n-node?

// Use the `static` dir for serving static assets. On production, it contains the js
// files built with webpack
server.use(serveStatic)(path.resolve(__dirname, "../../static"));

// ...while on development, serve the js files with a webpack dev server.
if (server.get("env") === "development") {
  require("../../webpack/webpack-dev-server");
}

// Render the app server-side and send it as response
server.use(render);

// Generic server errors (e.g. not caught by components)
server.use((err, req, res, next) => {                         // eslint-disable-line no-unused-vars
  console.log("Error on request %s %s", req.method, req.url);
  console.log(err);
  console.log(err.stack);
  res.status(500).send("Something bad happened");
});

// Finally, start the express server
server.set("port", process.env.PORT || 3000);

server.listen(server.get("port"), () => {
  console.log(`Express ${server.get("env")} server listening on ${server.get("port")}`);
});
