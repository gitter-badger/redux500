import React, { PropTypes, Component } from "react";
import { Link } from "react-router";
import fireRouteAction from "../router/fireRouteAction";
import styles from "./App.jss";

class App extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { router, store } = this.context;

    // this has to be done here for any client side navigations to trigger hooks
    this.transitionHook = fireRouteAction(store);
    router.addTransitionHook(this.transitionHook);
  }

  componentWillUnmount() {
    const { router } = this.context;
    // clean up any hooks to prevent leaks
    router.removeTransitionHook(this.transitionHook);
  }

  render() {
    const { isTransitioning } = this.props;

    return (
      <div id={ styles.root } className={ styles["test-class"] }>
        { 
          isTransitioning ?
          <h2>Loading...</h2>
          :
          this.props.children
        }
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    );
  }
}

export default App;
