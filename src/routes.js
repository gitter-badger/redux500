import { async200, async404, async500 } from "./actions/async";

import HomePage from "./components/HomePage";
import PhotoPage from "./components/PhotoPage";
import NotFoundPage from "./components/NotFoundPage";
import ErrorPage from "./components/ErrorPage";
import OkPage from "./components/OkPage";

export default {
  home: {
    path: "/",
    method: "get",
    handler: HomePage
  },
  "notfound": {
    path: "/notfound",
    method: "get",
    fetchData: async404,
    handler: NotFoundPage
  },
  "error": {
    path: "/error",
    method: "get",
    fetchData: async500,
    handler: ErrorPage
  },
  "ok": {
    path: "/ok",
    method: "get",
    fetchData: async200,
    handler: OkPage
  },
  photo: {
    path: "/photo/:id",
    method: "get",
    handler: PhotoPage
  },
  featured: {
    path: "/featured/:slug",
    method: "get"
  }
};
