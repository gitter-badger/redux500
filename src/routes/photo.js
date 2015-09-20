import { getPhoto } from "../actions/photos";

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
  },

  // special hook function detected by our "fireRouteAction" transition hook
  runAction(store, params) {
    return store.dispatch(getPhoto(params.id));
  }
};

export default PhotoRoute;
