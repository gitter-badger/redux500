import React, { Component, PropTypes } from "react";

let styles = {};
if (process.env.NODE_ENV !== "test") {
  styles = require("../style/Page.styl");
}

class Page extends Component {

  static propTypes = {
    footer: PropTypes.bool
  }

  static defaultProps = {
    footer: true
  }

  render() {

    return (
      <div className={ styles.Page }>

        <div className={ styles["Page-body"] }>
          { this.props.children }
        </div>

      </div>
    );
  }

}

export default Page;
