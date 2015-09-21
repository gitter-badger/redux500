const PhotoRoute = {

  path: "/photo/:id",

  getComponents(location, callback) {
    if (process.env.BROWSER) {
      require.ensure([], (require) => {
        callback(null, require("../components/PhotoPage"));
      }, "photo");
    }
    else {
      callback(null, require("../components/PhotoPage"));
    }
  }

};

export default PhotoRoute;
