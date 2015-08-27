import { PHOTO_LOAD_REQUEST, PHOTO_LOAD_SUCCESS, PHOTO_LOAD_FAILURE } from "../constants/ActionTypes";

export function getPhoto(photoId) {
  return {
    types: {
      request: PHOTO_LOAD_REQUEST,
      success: PHOTO_LOAD_SUCCESS,
      failure: PHOTO_LOAD_FAILURE
    },

    fetchr: {
      service: "photo",
      method: "read",
      params: { photoId }
    }

  };
}
