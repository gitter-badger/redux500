import { combineReducers } from "redux";

import photos from "./photos";
import data from "./data";

export default combineReducers({
  photos,
  data
});
