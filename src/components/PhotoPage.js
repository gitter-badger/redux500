import React, { Component } from "react";
import { connect } from "react-redux";

@connect(function mapStateToProps(state, routerNextState) {
  const photoId = routerNextState.params.id;

  return {
    photo: state.photosById[photoId]
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
