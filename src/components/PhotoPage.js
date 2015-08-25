import React, { Component } from "react";
import { getPhoto } from "../actions/photos";
import { connect } from 'react-redux';

class PhotoPage extends Component {

  // TODO fetch data not being called here? but called on home page
  // static fetchData(store) {
  //   console.log('test')
  //   return store.dispatch(getPhoto(119478695));
  // }

  render() {

    return (
      <div>
        A photo
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    photo: state.photosById["119478695"]
  };
}

export default connect(mapStateToProps)(PhotoPage);
