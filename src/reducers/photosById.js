import { PHOTO_LOAD_REQUEST, PHOTO_LOAD_SUCCESS, PHOTO_LOAD_FAILURE } from "../constants/ActionTypes";

export default function photosById(state = {}, action = {}) {
  switch (action.type) {
    case PHOTO_LOAD_REQUEST:
      return {
        ...state
      };
    case PHOTO_LOAD_SUCCESS:
      return {
        ...state,
        [action.data.photo.id]: action.data.photo
      };
    case PHOTO_LOAD_FAILURE:
      return {
        ...state
      };
    default:
      return state;
  }
}
