import React, { PropTypes, Component } from "react";

class PhotoPage extends Component {

  static propTypes = {
    id: PropTypes.string
  }

  render() {
    return (
      <div>
        Photo page for id { this.props.id }
      </div>
    );
  }
}

export default PhotoPage;
