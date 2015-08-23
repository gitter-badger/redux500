import React from "react";
import Router from "react-router";
import { Provider } from "react-redux";

import createRoutes from "./createRoutes";
import fetchComponentData from "./fetchComponentData";
import NotFoundPage from "../components/NotFoundPage";

// Create a Router as Promise. By returning a Promise, we can fetch the
// data required for a route before rendering it.

export default function createRouter(location, history, store) {

  const routes = createRoutes(store);

  return new Promise((resolve, reject) => {

    Router.run(routes, location, [fetchComponentData(store)], (err, initialState, transition) => {

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
