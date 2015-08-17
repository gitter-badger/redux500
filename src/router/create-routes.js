import React from "react";
import { Route } from "react-router";
import HomePage from "../components/HomePage";

export default function createRoutes() {
  return <Route path="/" component={ HomePage } />;
}
