import fetchrMiddleware from "../../../src/middlewares/fetchrMiddleware";
import { expect } from "chai";

const dummyError = { status: 400, statusCode: 400 };

const dummyResult = { hello: "world" };

const multiTypeAction = {
  types: {
    success: "TEST_SUCCESS",
    request: "TEST_REQUEST",
    failure: "TEST_FAILURE"
  },
  fetchr: {
    method: "read",
    service: "test"
  }
};

const fakeStore = fakeData => ({
  getState() {
    return fakeData;
  },
  dispatch() {

  }
});


class StubFetchr {
  constructor({ forceError = false, timeout= 10 }) {
    this.forceError = forceError;
    this.timeout = timeout;
  }

  read() { return this; }

  params() { return this; }

  clientConfig() { return this; }

  body() { return this; }

  end(callback) {
    setTimeout(() => {
      if (this.forceError) {
        callback(dummyError);
      }
      else {
        callback(null, dummyResult);
      }
    }, this.timeout);
  }
}

const dispatchWithStoreOf = (fetchrInstance, storeData, action) => {
  let dispatched = null;
                  // store => next
                  // next(action)
  const dispatch = fetchrMiddleware(fetchrInstance)(fakeStore(storeData))(next => dispatched = next);
  dispatch(action);
  return dispatched;
};

const dispatchAndRecordActions = (fetchrInstance, storeData, action, callback) => {

  // why is es6 detecting this as unused?
  let actionsCalled = [];

  function next(action) {
    actionsCalled.push(action);
  }

  const chainedNext = fetchrMiddleware(fetchrInstance)(fakeStore(storeData));

  chainedNext(next)(action)
    .then(function() {
      callback(actionsCalled);
    })
    .catch(function() {
      callback(actionsCalled);
    })
    ;
};

describe("fetchrMiddleware", () => {

  it("should dispatch when fetchr property is not supplied", function() {

    const stubFetchrSuccess = new StubFetchr({});

    const expectedAction = {
      type: "NOTHING"
    };

    expect(
      dispatchWithStoreOf(stubFetchrSuccess, {}, expectedAction)
    ).to.equal(expectedAction);
  });

  it("should dispatch request and success actions", function(done) {

    const stubFetchrSuccess = new StubFetchr({});

    const expectedActions = [
      { type: "TEST_REQUEST" },
      { type: "TEST_SUCCESS", data: dummyResult }
    ];

    
    dispatchAndRecordActions(stubFetchrSuccess, {}, multiTypeAction, function(actionsCalled) {

      // we need to wrap into a try block otherwise when the assertion fails, mocha never reaches the done() callback
      try {
        expect(
          actionsCalled[0]
        ).to.deep.equal(expectedActions[0]);

        expect(
          actionsCalled[1]
        ).to.deep.equal(expectedActions[1]);

        done();
      }
      catch (e) {
        done(e);
      }

    });

  });

  it("should dispatch request and failure actions", function(done) {

    const stubFetchrFailure = new StubFetchr({ forceError: true });

    const expectedActions = [
      { type: "TEST_REQUEST" },
      { type: "TEST_FAILURE", error: dummyError }
    ];

    
    dispatchAndRecordActions(stubFetchrFailure, {}, multiTypeAction, function(actionsCalled) {

      // we need to wrap into a try block otherwise when the assertion fails, mocha never reaches the done() callback
      try {      
        expect(
          actionsCalled[0]
        ).to.deep.equal(expectedActions[0]);

        expect(
          actionsCalled[1]
        ).to.deep.equal(expectedActions[1]);
        done();
      }
      catch (e) {
        done(e);
      }

    });

  });
});
