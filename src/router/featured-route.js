const featuredRoute = {

  path: "featured/:slug",

  getComponents(cb) {
    // only asynchronously load the dependencies on client side
    // unfortunately we can't make this code cleaner because webpack does not allow dynamic requires by passing in variables
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        cb(null, require("../components/FeaturedPage"));
      });
    }
    else {
      cb(null, require("../components/FeaturedPage"));
    }
  }

}

export default featuredRoute;
