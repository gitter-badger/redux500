import React, { PropTypes, Component } from "react";
import { Link } from "react-router";
import fireRouteAction from "../router/fireRouteAction";

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { router, store } = this.context;
    this.transitionHook = fireRouteAction(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    return (
      <div>
        { this.props.children }
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    );
  }
}

export default App;
