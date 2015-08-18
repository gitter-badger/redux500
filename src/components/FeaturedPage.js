import React, { Component } from "react";
import { Link } from "react-router";

class FeaturedPage extends Component {
  render() {
    return (
      <div>
        Upcoming
        <p>
          <Link to="/photo/1">See photo</Link>
        </p>
      </div>
    )
  }
}

export default FeaturedPage;
