import fs from "fs";
import path from "path";
import getChunks from "./get-chunks";
import getCssModules from "./get-css-modules";
import getImages from "./get-images";

const filepath = path.resolve(__dirname, "../../src/server/webpack-stats.json");

export default function writeStats(stats, env) {

  const publicPath = this.options.output.publicPath;

  const json = stats.toJson();

  const script = getChunks(json, publicPath, "main", "js");
  const cssFiles = getChunks(json, publicPath, "main", "css");

  const cssModules = getCssModules(json, env);

  const images = getImages(json);

  const content = {
    script: script,
    css: {
      files: cssFiles,
      modules: cssModules
    },
    images: images
  };

  fs.writeFileSync(filepath, JSON.stringify(content));

}
