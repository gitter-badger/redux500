const FeaturedRoute = {

  path: "/featured/:slug",

  getComponents(location, callback) {
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        callback(null, require("../components/FeaturedPage"));
      }, "featured");
    }
    else {
      callback(null, require("../components/FeaturedPage"));
    }
  }

};

export default FeaturedRoute;
