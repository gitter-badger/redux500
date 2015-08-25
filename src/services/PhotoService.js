import superagent from "superagent";

const PhotoService = {
  name: "photo",
  read: function(req, resource, { photoId }, config, done) {
    superagent
      .get(`https://api.500px.com/v1/photos/${photoId}`)
      .query({ consumer_key: "CLmpqnpwGLKetORtjc5gb9tC2hllfd6cqdfzHqFD" })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        done(null, res.body);
      });
  }
};

export default PhotoService;
