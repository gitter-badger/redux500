const featuredRoute = {

  path: "photo/:id",
  
  getComponents(cb) {
    // only asynchronously load the dependencies on client side
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        cb(null, require("../components/PhotoPage"));
      });
    }
    else {
      cb(null, require("../components/PhotoPage"));
    }
  }
}

export default featuredRoute;
