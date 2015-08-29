/* eslint no-console: 0 */

import React from "react";
import Fetchr from "fetchr";
import "babel-core/polyfill";
import Router from "redux-universal-router";
import { Provider } from "react-redux";

import createStore from "./utils/createStore";
import routes from "./routes";

import Application from "./components/Application";

window.debug = require("debug");
const debug = window.debug("redux500");

const fetcher = new Fetchr({
  xhrPath: "/api",
  xhrTimeout: 30000
});

const store = createStore({ fetcher }, window.__INITIAL_DATA__);
const url = document.location.pathname;
const mountNode = document.getElementById("content");

const router = new Router({ store, routes });
router.listen();  // Make router listen to browser's history
router.navigate({ url: url })
  .then(() => {

    React.render(
      <Provider store={ store }>
        { () => <Application /> }
      </Provider>,
      mountNode
    );


    debug("Application has been mounted");

  })
  .catch(err => {
    console.error(err);
  });
