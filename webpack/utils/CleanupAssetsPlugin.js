/* eslint no-console: 0 */

import fs from "fs";

class CleanupAssetsPlugin {

  constructor(options) {
    this.options = options;
  }

  apply(compiler) {

    compiler.plugin("done", (stats) => {
      const { assetsPath, exclude=[] } = this.options;
      const assets = stats.toJson().assets.map(asset => asset.name);
      const files = fs.readdirSync(assetsPath)
        .filter(file => exclude.indexOf(file) === -1 && assets.indexOf(file) === -1)
        .map(file => `${assetsPath}/${file}`);

      files.forEach(fs.unlinkSync);

      console.log("\n%s previous asset(s) deleted.", files.length);
    });

  }

}

export default CleanupAssetsPlugin;
