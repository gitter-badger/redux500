import React, { PropTypes, Component } from "react";

import PhotoAttribution from "./PhotoAttribution";
import PhotoRating from "./PhotoRating";
import PhotoCreatedAt from "./PhotoCreatedAt";
import styles from "../style/PhotoMeta.styl";

class PhotoMeta extends Component {

  static propTypes = {
    photo: PropTypes.object.isRequired
  }

  render() {
    const { photo } = this.props;

    return (
      <div className={ styles.PhotoMeta }>
        <PhotoAttribution user={ photo.user } />
        <PhotoCreatedAt date={ photo.created_at } />
        <PhotoRating rating={ photo.rating } />
      </div>
    );
  }

}

export default PhotoMeta;