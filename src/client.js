/* eslint no-console: 0 */

import React from "react";
import createBrowserHistory from "history/lib/createBrowserHistory";
import createLocation from "history/lib/createLocation";
import Fetchr from "fetchr";
import { Resolver } from "react-resolver";
import createRouter from "./router/createRouter";
import createStore from "./utils/createStore";

const fetcher = new Fetchr({
  xhrPath: "/api",
  xhrTimeout: 30000
});

const store = createStore({ fetcher }, window.__INITIAL_DATA__);
const history = createBrowserHistory();
const location = createLocation(document.location.pathname, document.location.search);
const mountNode = document.getElementById("content");

// history.registerTransitionHook(function(location, callback) {
//   console.log(location)
//   callback();
// });



createRouter(location, history, store)
  .then(({ component }) => {
    Resolver.render(() => component, mountNode);
  }, (err) => {
    console.error(err);
  });
