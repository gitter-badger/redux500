import React, { Component } from "react";
import { connect } from "react-redux";

@connect(state => ( { router: state.router } ))

class Application extends Component {

  render() {

    const { router } = this.props;
    const Handler = router.currentRoute.config.handler;
    return (
      <div>
        Current route is: { router.currentRoute.name }
        <div>
          <Handler />
        </div>
      </div>
    );
  }
}

export default Application;
