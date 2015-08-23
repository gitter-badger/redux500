import HomePage from "../components/HomePage";

import FeaturedRoute from "../routes/featured";
import PhotoRoute from "../routes/photo";
import NotFoundRoute from "../routes/not-found";

export default function createRoutes() {

  const routes = {
    childRoutes: [
      {
        path: "/",
        component: HomePage,
        childRoutes: [
          FeaturedRoute,
          PhotoRoute,
          NotFoundRoute
        ]
      }
    ]
  };

  return routes;
}
