import React, { PropTypes, Component } from "react";

class Photo extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired,
    imageSize: PropTypes.number
  }

  static defaultProps = {
    imageSize: 1600
  }

  render() {
    const { photo } = this.props;
    return (
      <a href={ `https://500px.com/photo/${photo.id}` }>
        <img style={ {width: "100%", height: "auto"} } src={ photo.images[0].url } />
      </a>
    );
  }

}

export default Photo;
