import { createStore, combineReducers } from "redux";
import * as reducers from '../reducers/index';

const reducer = combineReducers(reducers);

export default function create(){
  const store = createStore(reducer);

  return store;
}