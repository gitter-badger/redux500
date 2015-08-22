import fs from "fs";
import path from "path";
import getChunks from "./get-chunks";
import getCssModules from "./get-css-modules";
import getImages from "./get-images";

export default function writeStats(stats, env) {

  const publicPath = this.options.output.publicPath;

  const json = stats.toJson();

  const script = getChunks(json, publicPath, "main", "js");
  const cssFiles = getChunks(json, publicPath, "main", "css");

  const cssModules = getCssModules(json, env);

  const images = getImages(json, publicPath);

  const content = {
    script: script,
    css: {
      files: cssFiles,
      modules: cssModules
    },
    images: images
  };

  const fileName = `../../src/webpack-stats.json`;
  fs.writeFileSync(path.resolve(__dirname, fileName), JSON.stringify(content));

}
