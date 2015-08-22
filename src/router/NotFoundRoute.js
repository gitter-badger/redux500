const NotFoundRoute = {

  path: "*",

  getComponents(callback) {
    if (process.env.BROWSER) {
      require.ensure(["../components/NotFoundPage"], (require) => {
        callback(null, require("../components/NotFoundPage"));
      }, "not-found-route");
    }
    else {
      callback(null, require("../components/NotFoundPage"));
    }
  }

};

export default NotFoundRoute;
