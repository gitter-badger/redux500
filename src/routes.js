import { async200, async404, async500 } from "./actions/async";

import HomePage from "./components/HomePage";

export default {
  home: {
    path: "/",
    method: "get",
    handler: HomePage
  },
  "notfound": {
    path: "/notfound",
    method: "get",
    fetchData: async404
  },
  "error": {
    path: "/error",
    method: "get",
    fetchData: async500
  },
  "ok": {
    path: "/ok",
    method: "get",
    fetchData: async200
  },
  photo: {
    path: "/photo/:id",
    method: "get"
  },
  featured: {
    path: "/featured/:slug",
    method: "get"
  }
};