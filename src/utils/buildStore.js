import { createStore, combineReducers, applyMiddleware } from "redux";
import promiseMiddleware from "../middlewares/promiseMiddleware";
import * as reducers from "../reducers/index";

const reducer = combineReducers(reducers);

export default function buildStore(client, data) {
  
  const _promiseMiddleware = promiseMiddleware(client);

  // applies the middleware and returns the new createStore function
  const createStoreWithMiddleware = applyMiddleware(
    _promiseMiddleware
  )(createStore);

  const store = createStoreWithMiddleware(reducer, data);

  return store;
}
