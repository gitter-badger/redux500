import React from "react";
import Router from "react-router";
import { Provider } from "react-redux";

import createRoutes from "./createRoutes";
import fetchComponentData from "./fetchComponentData";

export default function createRouter(location, history, store) {
  const routes = createRoutes(store);
  // this allows us to us to run any kind of hooks before routing,
  // catches any kind of transition problems,
  // before resolving with the route handlers to be rendered on the server and client side

  return new Promise((resolve, reject) => {
    Router.run(routes, location, [fetchComponentData(store)], (error, initialState, transition) => {

      if (error) {
        return reject(error);
      }

      if (transition && transition.redirectInfo) {
        return resolve({
          transition,
          isRedirect: true
        });
      }

      if (history) {  // only on client side
        initialState.history = history;
      }

      const Component = (
        <Provider store={ store } key="provider">
          { () => <Router { ...initialState } children={ routes } /> }
        </Provider>
      );

      return resolve({
        Component,
        isRedirect: false
      });
    });
  });
}
