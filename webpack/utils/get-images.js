// Find compiled images in modules,  used to map original filenames to the
// compiled ones for server side rendering

export default function getImages(json, publicPath) {

  const imagesRegex = /\.(jpe?g|png|gif|svg)$/;
  const images = json.modules
    .filter(function(module) {
      return imagesRegex.test(module.name);
    })
    .map(function(image) {
      const i = image.source.indexOf("\"");
      let imageSource = image.source.slice(i + 1, -1);
      imageSource = imageSource.lastIndexOf("data:image", 0) === 0 ? imageSource : publicPath + imageSource;

      return {
        original: image.name,
        compiled: imageSource
      };
    });

  return images;
}
