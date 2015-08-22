import path from "path";

export default function getCssModules(json, env) {
  const cssModules = {};

  json.modules
    .filter(function(m) {
      if (env === "production") {
        return /\.scss$/.test(m.name);
      }
      //filter by modules with '.scss' inside name string, that also have name and moduleName that end with 'ss'(allows for css, less, sass, and scss extensions)
      //this ensures that the proper scss module is returned, so that namePrefix variable is no longer needed
      return (/\.scss$/.test(m.name) && m.name.slice(-2) === "ss" && m.reasons[0].moduleName.slice(-2) === "ss");
    })
    .forEach(function(m) {
      //find index of '/src' inside the module name, slice it and resolve path
      const srcIndex = m.name.indexOf("/src");
      let name = path.resolve(__dirname, "../../", m.name.slice(srcIndex + "/src".length));
      if (name) {
        // Resolve the e.g.: "C:\"  issue on windows
        const i = name.indexOf(":");
        if (i >= 0) {
          name = name.slice(i + 1);
        }
      }
      //end
      if (m.source) {
        const regex = env === "production" ? /module\.exports = ((.|\n)+);/ : /exports\.locals = ((.|\n)+);/;
        const match = m.source.match(regex);
        cssModules[name] = match ? JSON.parse(match[1]) : {};
      }
    });

  return cssModules;
}
