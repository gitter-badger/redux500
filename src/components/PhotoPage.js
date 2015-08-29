import React, { Component } from "react";
import { connect } from "react-redux";

@connect(function mapStateToProps(state) {
  return {
    photo: state.photosById[119478695]
  };
})
class PhotoPage extends Component {

  render() {
    const { photo } = this.props;

    return (
      <div>
        <img src={ photo.image_url } />
      </div>
    );
  }
}

export default PhotoPage;
