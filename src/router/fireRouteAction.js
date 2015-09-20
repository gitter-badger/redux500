/**
  * Factory that returns a transition hook for use by react-router
  * 
*/
export default function fireRouteAction(store, renderProps, callback) {
  const matchedRoute = renderProps.routes[ renderProps.routes.length - 1 ];

  if (typeof matchedRoute.runAction === "function") {
    // only run the routeAction if its defined
    // routeAction must return a promise
    // - it does because store.dispatch() returns a promise with our fetchrMiddleware
    // - TODO this may not apply for some case, to be refactored later when use case expands
    // - TODO we have to make sure the route action does not fire again after bootstrap from server data
    return matchedRoute
      .runAction(store, renderProps.params) // passing store instance so action can run dispatch calls
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
}


