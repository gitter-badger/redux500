export default function getImages(json){
  // Find compiled images in modules
  // it will be used to map original filename to the compiled one
  // for server side rendering

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
