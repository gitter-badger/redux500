export default function promiseMiddleware(client) {
  // signature of middleware: 
  // store => next => action => ...
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;
      // straight away dispatch the action if promise is not supplied
      if (!promise) {
        return next(action);
      }

      // otherwise, dispatch 3 different types of actions base on the promise state
      // this allows our UI to respond base on the following states:
      // requesting (loading), success, or failure
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });
      return promise(client).then(
        (result) => next({ ...rest, result, type: SUCCESS }),
        (error) => next({ ...rest, error, type: FAILURE })
      );
    };
  };
}
