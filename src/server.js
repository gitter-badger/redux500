/* eslint no-console: 0 */

// Create and start the express app. Export a function so we can test it

import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import serveStatic from "serve-static";
import favicon from "serve-favicon";
import morgan from "morgan";

import React from "react";
import Location from "react-router/lib/Location";

import { staticPath } from "../settings";
import createRouter from "./router/createRouter";
import Html from "./components/Html";
import buildStore from "./utils/buildStore";

import Fetchr from "fetchr";
import PhotoService from "./services/PhotoService";

Fetchr.registerService(PhotoService);

export default function (settings, callback) {

  const app = express();

  for (const name in settings) {
    app.set(name, settings[name]);
  }

  // Usual express stuff
  app.use(morgan(app.get("env") === "production" ? "combined" : "dev"));
  app.use(bodyParser.json());
  app.use("/api", Fetchr.middleware());
  app.use(cookieParser());
  app.use(compression());
  app.use(favicon(`${staticPath}/assets/favicon.png`));

  // TODO locales - we may want to consider i18n-node?

  // Use the `static` dir for serving static assets. On production, it contains the js
  // files built with webpack
  app.use(serveStatic(staticPath));

  // Render the app server-side and send it as response
  app.use((req, res, next) => {

    const location = new Location(req.path, req.query);
    const fetchr = new Fetchr({
      req: req
    });
    const store = buildStore(fetchr);

    createRouter(location, undefined, store)
      .then((payload) => {

        const { component, transition, isRedirect, isNotFound } = payload;

        if (isRedirect) {
          res.redirect(transition.redirectInto.pathname);
          return;
        }

        const content = React.renderToString(component);
        const html = React.renderToStaticMarkup(
          <Html
            content={ content }
            store={ store } />
        );
        res.status(isNotFound ? 404 : 200).send(`<!doctype html>${html}`);
      })
      .catch((err) => {
        err.redirect ? res.redirect(err.redirect) : next(err);
      });
  });

  // Generic server errors (e.g. not caught by components)
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log("Error on request %s %s", req.method, req.url);
    console.log(err);
    console.log(err.stack);
    res.status(500).send("Something bad happened");
  });

  // Finally, start the express application
  return app.listen(app.get("port"), () => {
    callback(app);
  });

}
