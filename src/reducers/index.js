import { combineReducers } from "redux";
import router from "redux-universal-router/reducer";

import photos from "./photos";
import data from "./data";

export default combineReducers({
  router,
  photos,
  data
});
