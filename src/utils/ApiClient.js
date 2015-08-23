/*
 * This class provides an isomorphic wrapper around superagent to handle api calls to external apis
*/

import superagent from "superagent";

class ApiClient {
  constructor(req) {
    const verbs = ["get", "post", "put", "patch", "del"];
    this._req = req;
    this._apiPrefix = "/api";

    // creates the class methods .get, .post, etc. 
    verbs.forEach(this._createMethod.bind(this));
  }

  _createMethod(verb) {
    this[verb] = (path, options) => {       
      return new Promise((resolve, reject) => {

        const request = superagent[verb](`${this._apiPrefix}${path}`);

        // add query parameters
        if (options && options.params) {
          request.query(options.params);
        }

        // forward cookies when performing server side api requests
        if (!process.env.BROWSER) {
          const cookie = this._req.get("cookie");
          if (cookie) {
            request.set("cookie", cookie);
          }
        }

        // inform superagent to forward data supplied.
        if (options && options.data) {
          request.send(options.data);
        }

        // finally wrap around the request's success / failure results using promises
        request.end((err, res) => {
          if (err) {
            reject(res.body || err);
          }
          else {
            resolve(res.body);
          }
        });

      });
    };
  }
}

export default ApiClient;
