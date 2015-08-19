// Get the `fetchData` static property of a component (or its child component)
// wrapped by many parents. This property defines how data has to be fetched
// before rendering a "smart" component.

export default function getFetchDataStaticProperty (component={}) {

  if ("WrappedComponent" in component) {
    return getFetchDataStaticProperty(component.WrappedComponent)
  }

  return component.fetchData;
}
