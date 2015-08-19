// Fetch the data before transitioning to a new route

import getFetchDataStaticProperty from "./getFetchDataStaticProperty";

export default function fetchComponentData(store) {

  return (nextState, transition, callback) => {
    const promises = nextState.branch
      .map(route => route.component)                              // pull out individual route components
      .filter(component => getFetchDataStaticProperty(component)) // only look at ones with a static fetchData()
      .map(getFetchDataStaticProperty)                            // pull out fetch data methods
      .map(fetchData => fetchData(store, nextState.params));      // call fetch data methods and save promises

    Promise.all(promises)
      .then(() => {
        callback(); // can't just pass callback to then() because callback assumes first param is error
      }, err => {
        callback(err);
      });
  };
}
