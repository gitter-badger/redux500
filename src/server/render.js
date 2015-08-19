/* eslint no-console: 0 */

// Middleware to render the <html> document server-side

import Location from "react-router/lib/Location";
import React from "react";

import createRouter from "../router/createRouter";
import Html from "../components/Html";
import createStore from "../redux/create";

export default function render(req, res, next) {

  const webpackStats = require("./webpack-stats.json");

  if (process.env.NODE_ENV === "development") {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    delete require.cache[require.resolve("./webpack-stats.json")];
  }

  const location = new Location(req.path, req.query);

  const store = createStore();

  createRouter(location, undefined, store)
    .then(({ component, transition, isRedirect }) => {
      if (isRedirect) {
        res.redirect(transition.redirectInto.pathname);
        return;
      }

      const content = React.renderToString(component);

      const html = React.renderToStaticMarkup(
        <Html
          webpackStats={ webpackStats }
          content={ content }
          store={ store } />
      );

      res.send(`<!doctype html>${html}`);
    })
    .catch((err) => {
      if (err.redirect) {
        res.redirect(err.redirect);
        return;
      }
      console.error(`ROUTER ERROR: ${err}`);
      next(err);
    })
}
