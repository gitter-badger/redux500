import { PHOTO_LOAD_REQUEST, PHOTO_LOAD_SUCCESS, PHOTO_LOAD_FAILURE } from "../constants/ActionTypes";

export function getPhoto(id) {
  return {
    types: [
      PHOTO_LOAD_REQUEST,
      PHOTO_LOAD_SUCCESS,
      PHOTO_LOAD_FAILURE
    ],

    promise: (client) => {
      return client.get(`/photos/${id}`);
    }

  };
}
