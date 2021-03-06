/**
  * Factory that returns a transition hook for use by react-router
  * In this case, we create a hook that runs the routeAction defined on the last matched route
*/
export default function fireRouteAction(store) {

  return (nextState, transition, callback) => {

    const matchedRoute = nextState.branch[ nextState.branch.length - 1 ];

    if (typeof matchedRoute.runAction === "function") {
      // only run the routeAction if its defined
      // routeAction must return a promise
      // - it does because store.dispatch() returns a promise with our fetchrMiddleware
      // - TODO this may not apply for some case, to be refactored later when use case expands
      // - TODO we have to make sure the route action does not fire again after bootstrap from server data
      matchedRoute
        .runAction(store, nextState.params) // passing store instance so action can run dispatch calls
        .then(() => {
          callback();
        })
        .catch((err) => {
          callback(err);
        });
    }
    else {
      // otherwise yield to next hook or render
      callback();
    }
  };
}
