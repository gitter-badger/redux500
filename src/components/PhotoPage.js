import React, { Component } from "react";
import { connect } from "react-redux";
import { resolve, context } from "react-resolver";
import { getPhoto } from "../actions/photos";

@context("store")
@resolve("photo", function({ store, routeParams }) {
  // do not fetch if already cached
  if (store.getState().photosById[routeParams.id]) {
    return;
  }
  // fetch and wait before rendering
  else {
    return store.dispatch(getPhoto(routeParams.id));
  }
})
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
