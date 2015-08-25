// Create a redux store with middlewares

import { createStore, combineReducers, applyMiddleware } from "redux";
import fetchrMiddleware from "../middlewares/fetchrMiddleware";
import * as reducers from "../reducers/index";

const reducer = combineReducers(reducers);

export default function({ fetcher }, data) {

  const createStoreWithMiddleware = applyMiddleware(

    // apply the fetchr-middleware to interact with fetchr services
    fetchrMiddleware(fetcher)

  )(createStore);

  return createStoreWithMiddleware(reducer, data);
}
