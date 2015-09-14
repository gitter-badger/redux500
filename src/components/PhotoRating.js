import React, { Component } from "react";

class PhotoRating extends Component {

  render() {
    const { rating } = this.props;

    return (
      <span>Rating { rating }</span>
    );

  }

}

export default PhotoRating;
