export default function fetchrMiddleware(fetchrInstance) {
  // signature of middleware:
  // store => next => action => ...
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }

      const { fetchr, types, ...rest } = action;
      // straight away dispatch the action if service is not supplied
      if (!fetchr) {
        return next(action);
      }

      const { service, method, params, body, config } = fetchr;

      // otherwise, dispatch 3 different types of actions base on the promise state
      // this allows our UI to respond base on the following states:
      // requesting (loading), success, or failure
      const { request, success, failure } = types;
      next({ ...rest, type: request });

      return new Promise((resolve, reject) => {
        fetchrInstance[method](service)
          .params(params || {})
          .body(body || {})
          .clientConfig(config || {})
          .end((error, result) => {
            if (error) {
              failure && next({ ...rest, error, type: failure });
              reject(error);
            }
            else {
              success && next({ ...rest, data: result, type: success });
              resolve();
            }
          });
      });

    };
  };
}
