import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "redux-universal-router";

@connect(state => ( { router: state.router } ))
class Application extends Component {

  render() {

    const { router } = this.props;
    const { currentRoute, nextRoute } = router;
    const Handler = currentRoute.config.handler;
    return (
      <div>
        <Link href="/photo/4000">TEST</Link>
        { " " } <Link href="/notfound">not found</Link>
        { " " } <Link href="/ok">ok page</Link>
        { " " } <Link href="/error">error page</Link>
        { nextRoute && <span> loading route { nextRoute.name }...</span> }

        <p>
          Current route is? { currentRoute.name }
        </p>
        <div>
          <Handler {...currentRoute.params } />
        </div>

      </div>
    );
  }
}

export default Application;
