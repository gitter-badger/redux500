import React, { Component } from "react";
import { connect } from "react-redux";
import Photo from "./Photo";
import PhotoMeta from "./PhotoMeta";

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
        <h1>{ photo.name }</h1>
        <PhotoMeta photo={ photo } />
        <Photo imageSize={ 4 } photo={ photo } />
      </div>
    );
  }
}

export default PhotoPage;
