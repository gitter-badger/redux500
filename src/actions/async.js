
export function async200() {

  return new Promise((resolve, reject) => {

    setTimeout(() => {
      const data = {
        woot: true
      };
      resolve({
        type: "DATA_SUCCESS",
        payload: data
      });
    }, 1000);

  });

}

export function async404() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({statusCode: 404}), 1000);
  });
}

export function async500() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({statusCode: 500}), 1000);
  });
}
