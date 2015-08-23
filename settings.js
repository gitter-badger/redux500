import path from "path";

export default {

  host: process.env.HOST || "0.0.0.0",
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  webpackPort: parseInt(process.env.PORT) + 1 || 3001,

  distPath: path.resolve(__dirname, "./static/dist"),
  staticPath: path.resolve(__dirname, "./static")

};
