/* eslint no-console: 0 */

import React from "react";
import { Provider } from "react-redux";
import Router from "redux-universal-router";
import Fetchr from "fetchr";

import routes from "../routes";
import createStore from "./createStore";

import Html from "../components/Html";
import Application from "../components/Application";

export default function(req, res, next) {

  const store = createStore({
    fetcher: new Fetchr({ req })
  });

  const router = new Router({ store, routes });

  router({ store, routes })
    .navigate({ url: req.url })
    .then(navigationResult => {

      const content = React.renderToString(
        <Provider store={ store }>
          { () => <Application /> }
        </Provider>
      );

      let html = React.renderToStaticMarkup(
        <Html content={ content } store={ store } />
      );
      html = `<!doctype html>${html}`;

      if (navigationResult.isNotFound) {
        res.status(404);
      }
      // res.json(store.getState());
      res.send(`<!doctype html>${html}`);

    })
    .catch(err => {
      console.log("\nRouter error requesting %s, current store state is:\n", req.url, store.getState());
      next(err);
    });

}
