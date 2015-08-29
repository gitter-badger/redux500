
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
    }, 5000);

  });

}

export function async404() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({statusCode: 404}), 5000);
  });
}

export function async500() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({statusCode: 500}), 5000);
  });
}
