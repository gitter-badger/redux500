import { createStore, combineReducers, applyMiddleware } from "redux";
import fetchrMiddleware from "../middlewares/fetchrMiddleware";
import * as reducers from "../reducers/index";

const reducer = combineReducers(reducers);

export default function buildStore(fetchr, data) {
  
  const _fetchrMiddleware = fetchrMiddleware(fetchr);

  // applies the middleware and returns the new createStore function
  const createStoreWithMiddleware = applyMiddleware(
    _fetchrMiddleware
  )(createStore);

  const store = createStoreWithMiddleware(reducer, data);

  return store;
}
