import HomePage from "../components/HomePage";
import FeaturedRoute from "./featured-route";
import PhotoRoute from "./photo-route";

export default function createRoutes() {

  const rootRoute = {
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
  }

  return rootRoute;
}
