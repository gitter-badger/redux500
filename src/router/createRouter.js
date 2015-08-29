import React from "react";
import Router from "react-router";
import { Provider } from "react-redux";

import createRoutes from "./createRoutes";
import fireRouteAction from "./fireRouteAction";
import NotFoundPage from "../components/NotFoundPage";

// Create a Router as Promise. By returning a Promise, we can fetch the
// data required for a route before rendering it.

export default function createRouter(location, history, store) {

  const routes = createRoutes(store);

  return new Promise((resolve, reject) => {

    // Note: defining the "fireRouteAction" to be run here does not mean it gets run everytime the route changes
    // Putting here only guarantees that the first time the router loads the initial route, it passes through this hook first
    // for subsequent route changes on the client side, see "components/App.js"
    Router.run(routes, location, [fireRouteAction(store)], (err, initialState, transition) => {

      const isNotFound = (err && err.statusCode === 404) ||
        initialState.components.some(component => component === NotFoundPage);

      if (err && !isNotFound) {
        return reject(err);
      }

      if (transition && transition.redirectInfo) {
        return resolve({
          transition: transition,
          isRedirect: true
        });
      }

      if (history) {  // history is available only client-side
        initialState.history = history;
      }

      const component = (
        <Provider store={ store } key="provider">
          { () => <Router { ...initialState } children={ routes } /> }
        </Provider>
      );

      return resolve({
        component: component,
        isRedirect: false,
        isNotFound: isNotFound
      });

    });

  });

}
