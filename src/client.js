/* eslint no-console: 0 */

import React from "react";
import BrowserHistory from "react-router/lib/BrowserHistory";
import Location from "react-router/lib/Location";
import Fetchr from "fetchr";

import createRouter from "./router/createRouter";
import createStore from "./utils/createStore";

if (process.env.BROWSER) {
  require("./style/Application.styl");
}

const history = new BrowserHistory();
const fetcher = new Fetchr({
  xhrPath: "/api",
  xhrTimeout: 30000
});

const store = createStore({ fetcher }, window.__INITIAL_DATA__);
const location = new Location(document.location.pathname, document.location.search);
const mountNode = document.getElementById("content");

createRouter(location, history, store)
  .then(({ component }) => {
    React.render(component, mountNode);
  }, (err) => {
    console.error(err);
  });
