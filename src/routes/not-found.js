const NotFoundRoute = {

  path: "*",

  getComponents(callback) {
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        callback(null, require("../components/NotFoundPage"));
      }, "not-found");
    }
    else {
      callback(null, require("../components/NotFoundPage"));
    }
  }

};

export default NotFoundRoute;
