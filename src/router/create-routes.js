import React from "react";
import { Route } from "react-router";
import Home from "../components/pages/home";

export default function createRoutes() {
  return <Route path="/" component={ Home } />;
}
