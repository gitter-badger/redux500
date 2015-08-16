import path from "path";

// get chunks by name and extensions
export default function getChunks(json, publicPath, name, ext) {
  ext = ext || "js";
  var chunk = json.assetsByChunkName[name];

  // a chunk could be a string or an array, so make sure it is an array
  if (!(Array.isArray(chunk))) {
    chunk = [chunk];
  }

  return chunk
    // filter by extension
    .filter(function(chunkName) {
      return path.extname(chunkName) === "." + ext;
    })
    .map(function(chunkName) {
      return publicPath + chunkName;
    });
}