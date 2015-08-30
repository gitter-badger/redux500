import { getPhoto } from "actions/photos";
import { PHOTO_LOAD_REQUEST, PHOTO_LOAD_SUCCESS, PHOTO_LOAD_FAILURE } from "constants/ActionTypes";

describe("Photo Actions Creators", function(){
  it("should should create an action to load a photo", function() {
    const photoId = 1;
    const expectedAction = {
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
    }

    expect(getPhoto(photoId)).to.deep.equal(expectedAction);
  });
})
