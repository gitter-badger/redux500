const FeaturedRoute = {

  path: "featured/:slug",

  getComponents(callback) {
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        callback(null, require("../components/FeaturedPage"));
      }, "featured-route");
    }
    else {
      callback(null, require("../components/FeaturedPage"));
    }
  }

}

export default FeaturedRoute;
