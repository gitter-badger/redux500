import React, { PropTypes, Component } from "react";

class PhotoAttribution extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const { user } = this.props;
    return (
      <span>
        Photo by &nbsp;
        <a href={ `https://500px.com/${user.username}` }>{ user.fullname }</a>
      </span>
    );
  }

}

export default PhotoAttribution;
