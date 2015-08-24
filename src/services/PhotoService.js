import superagent from "superagent";

const PhotoService = {
  name: "photo",
  read: function(req, resource, { photoId }, config, done) {
    superagent
      .get(`https://api.500px.com/v1/photos/${photoId}`)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done(null, res.body);
      });
  }
};

export default PhotoService;
