/* eslint no-console: 0 */

import React from "react";
import createBrowserHistory from "history/lib/createBrowserHistory";
import createLocation from "history/lib/createLocation";
import Fetchr from "fetchr";
import createRouter from "./router/createRouter";
import createStore from "./utils/createStore";
import { endTransition, startTransition } from "./actions/transitions";

const fetcher = new Fetchr({
  xhrPath: "/api",
  xhrTimeout: 30000
});

const store = createStore({ fetcher }, window.__INITIAL_DATA__);
const history = createBrowserHistory();
const location = createLocation(document.location.pathname, document.location.search);
const mountNode = document.getElementById("content");

export function renderToDOM(location, history, store, mountNode, preload) {
  return createRouter(location, history, store, preload)
    .then(({ component }) => {
      React.render(component, mountNode);
    }, (err) => {
      console.error(err);
    });
}

renderToDOM(location, history, store, mountNode);

// TODO - inspect the efficiency of this
// this appears to be recreating the entire virtual DOM tree on transition
history.registerTransitionHook((location, callback) => {
  store.dispatch(startTransition());
  renderToDOM(location, history, store, mountNode, true)
    .then(() => {
      store.dispatch(endTransition());
      callback();
    });
});
