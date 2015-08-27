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

import Fetchr from "fetchr";

import handleServerRendering from "./utils/handleServerRendering";
import handleServerError from "./utils/handleServerError";

import PhotoService from "./services/PhotoService";

const staticPath = path.resolve(__dirname, "../static");

export default function (callback) {

  const app = express();

  app.set("env", process.env.NODE_ENV || "development");
  app.set("host", process.env.HOST || "0.0.0.0");
  app.set("port", process.env.PORT || 3000);

  // Usual express stuff
  app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(compression());
  app.use(favicon(`${staticPath}/assets/favicon.png`));
  app.set("json spaces", 2);

  // Use the `static` dir for serving static assets. On production, it contains the js
  // files built with webpack
  app.use(serveStatic(staticPath));

  // Enable fetchr services to the /api path
  Fetchr.registerService(PhotoService);
  app.use("/api", Fetchr.middleware());

  // Handle the app server-side rendering
  app.use(handleServerRendering);

  // Last middleware: handle generic errors
  app.use(handleServerError);

  // Finally, start the express application
  return app.listen(app.get("port"), () => callback(app));

}
