import React from "react";
import { RoutingContext, match } from "react-router";
import { Provider } from "react-redux";
import createRoutes from "./createRoutes";
import { Resolver } from "react-resolver";

// import NotFoundPage from "../components/NotFoundPage";

// Create a Router as Promise. By returning a Promise, we can fetch the
// data required for a route before rendering it.

export function createRoutingHandler(store, renderProps) {
  const component = (
    <Provider store={ store } key="provider">
      { () => <RoutingContext { ...renderProps }/> }
    </Provider>
  );

  return component;
}

export default function createRouter(location, history, store, preload) {

  const routes = createRoutes(store);

  return new Promise((resolve, reject) => {
    match({ routes, history, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        return reject(error);
      }

      if (redirectLocation) {
        return resolve({
          redirectLocation
        });
      }

      if (history) {
        renderProps.history = history;
      }

      if (preload) {
        Resolver
          .resolve(() => {
            return createRoutingHandler(store, renderProps);
          })
          .then(({ Resolved, data }) => {
            resolve({
              component: <Resolved />,
              resolverData: data
            });
          });
      }
      else {
        resolve({
          component: createRoutingHandler(store, renderProps)
        });
      }
    });
  });

}
