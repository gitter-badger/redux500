const getFetchData = (component={}) => {
  return component.WrappedComponent ?
    getFetchData(component.WrappedComponent) :
    component.fetchData;
};

export default function fetchComponentData(store) {
  // this allows us to run route-specific actions before transitioning
  
  return (nextState, transition, callback) => {
    const promises = nextState.branch
      .map(route => route.component)                          // pull out individual route components
      .filter((component) => getFetchData(component))         // only look at ones with a static fetchData()
      .map(getFetchData)                                      // pull out fetch data methods
      .map(fetchData => fetchData(store, nextState.params));  // call fetch data methods and save promises
    Promise.all(promises)
      .then(() => {
        callback(); // can't just pass callback to then() because callback assumes first param is error
      }, (error) => {
        callback(error);
      });
  };
}
