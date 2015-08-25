import React, { Component } from "react";
import { Link } from "react-router";
import { getPhoto } from "../actions/photos";
import { connect } from "react-redux";

@connect((state) => {
  return {
    photo: state.photosById["119478695"]
  };
})
class HomePage extends Component {

  static fetchData(store) {
    return store.dispatch(getPhoto(119478695));
  }

  render() {
    const { photo } = this.props;

    return (
      <div>
        <nav>Nav</nav>
        <p>
          <Link to="/featured/upcoming">Upcoming Page</Link>
        </p>
        {
          photo ?
          <p>
            <Link to={ `/photo/${photo.id}` }>Link to Photo { photo.name }</Link>
          </p>
          : undefined
        }

        { this.props.children }
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;
