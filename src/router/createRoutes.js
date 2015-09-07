import App from "../components/App";
import FeaturedRoute from "../routes/featured";
import PhotoRoute from "../routes/photo";
import NotFoundRoute from "../routes/not-found";
import HomeRoute from "../routes/home";

export default function createRoutes() {

  const routes = {
    childRoutes: [
      {
        component: App,
        childRoutes: [
          HomeRoute,
          FeaturedRoute,
          PhotoRoute,
          NotFoundRoute
        ]
      }
    ]
  };

  return routes;
}
