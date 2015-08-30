import { PHOTO_LOAD_REQUEST, PHOTO_LOAD_SUCCESS, PHOTO_LOAD_FAILURE } from "constants/ActionTypes";
import photosById from "reducers/photosById";

describe("photosById reducer", () => {
  it("should return the initial state", () => {
    const expectedInitialState = {};

    expect(
      photosById(undefined, {})
    ).to.deep.equal(
      expectedInitialState
    );
  });

  it("should handle PHOTO_LOAD_REQUEST", () => {
    const expectedInitialState = {};

    expect(
      photosById({}, {
        type: PHOTO_LOAD_REQUEST
      })
    ).to.deep.equal(
      expectedInitialState
    );
  });

  it("should handle PHOTO_LOAD_FAILURE", () => {
    const expectedInitialState = {};

    expect(
      photosById({}, {
        type: PHOTO_LOAD_FAILURE
      })
    ).to.deep.equal(
      expectedInitialState
    );
  });

  it("should handle PHOTO_LOAD_SUCCESS", () => {
    const photoId = 1;
    const photoData = {
      id: photoId
    };

    const expectedState = {
      [photoId]: photoData
    };

    expect(
      photosById({}, {
        type: PHOTO_LOAD_SUCCESS,
        data: {
          photo: photoData
        }
      })
    ).to.deep.equal(
      expectedState
    );
  });


});
