import HomePage from "../components/HomePage";
import FeaturedRoute from "./FeaturedRoute";
import PhotoRoute from "./PhotoRoute";

export default function createRoutes() {

  const routes = {
    childRoutes: [
      {
        path: "/",
        component: HomePage,
        childRoutes: [
          FeaturedRoute,
          PhotoRoute
        ]
      }
    ]
  };

  return routes;
}
