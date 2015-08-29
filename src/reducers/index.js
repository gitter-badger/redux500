import { combineReducers } from "redux";
import { reducer as router } from "redux-universal-router"; // reducer must be saved as `router` in the store

import photos from "./photos";
import data from "./data";

export default combineReducers({
  router,
  photos,
  data
});
