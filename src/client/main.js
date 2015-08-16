/* eslint no-console: 0 */

import React from "react";
import BrowserHistory from "react-router/lib/BrowserHistory";
import Location from "react-router/lib/Location";
import createStore from "../redux/create";
import router from "../router";

const history = new BrowserHistory();
const store = createStore(window.__INITIAL_DATA__);
const location = new Location(document.location.pathname, document.location.search);
const dest = document.getElementById("content");

router(location, history, store)
  .then(({component}) => {
    React.render(component, dest);
  }, (error) => {
    console.error(error);
  });
