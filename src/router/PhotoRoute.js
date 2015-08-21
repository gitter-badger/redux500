const PhotoRoute = {

  path: "photo/:id",

  getComponents(callback) {
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        callback(null, require("../components/PhotoPage"));
      }, "photo-route");
    }
    else {
      callback(null, require("../components/PhotoPage"));
    }
  }
};

export default PhotoRoute;
