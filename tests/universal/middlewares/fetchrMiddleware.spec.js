import fetchrMiddleware from "middlewares/fetchrMiddleware";

const fakeStore = fakeData => ({
  getState() {
    return fakeData;
  },
  dispatch() {

  }
});

const stubFetchrInstance = {
  create() {

  },

  read() {

  },

  update() {

  },

  delete() {

  }
};

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null;
                  // store => next
                  // next(action)
  const dispatch = fetchrMiddleware(stubFetchrInstance)(fakeStore(storeData))(next => dispatched = next);
  dispatch(action);
  return dispatched;
};

describe("fetchrMiddleware", () => {

  it("should dispatch when fetchr property is not supplied", function() {
    const expectedAction = {
      type: "NOTHING"
    };

    expect(
      dispatchWithStoreOf({}, expectedAction)
    ).to.equal(expectedAction);
  });
});
