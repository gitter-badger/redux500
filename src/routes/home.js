const HomeRoute = {

  path: "/",

  getComponents(location, callback) {
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        callback(null, require("../components/HomePage"));
      }, "home");
    }
    else {
      callback(null, require("../components/HomePage"));
    }
  }

};

export default HomeRoute;
