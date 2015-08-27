// Create a redux store with middlewares

import { createStore, applyMiddleware } from "redux";

import reducer from "../reducers/index";
import fetchrMiddleware from "../middlewares/fetchrMiddleware";

export default function({ fetcher }, data) {

  const createStoreWithMiddleware = applyMiddleware(

    // apply the fetchr-middleware to interact with fetchr services
    fetchrMiddleware(fetcher),

  )(createStore);

  return createStoreWithMiddleware(reducer, data);
}
