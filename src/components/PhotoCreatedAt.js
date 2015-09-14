import React, { PropTypes, Component } from "react";

class PhotoCreatedAt extends Component {

  static propTypes = {
    date: PropTypes.string.isRequired
  }

  render() {
    const { date } = this.props;

    return (
      <div>
        { new Date(date).toString() }
      </div>
    );
  }

}

export default PhotoCreatedAt;
