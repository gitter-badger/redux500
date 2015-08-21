import React, { Component } from "react";
import { Link } from "react-router";

class HomePage extends Component {
  render() {
    return (
      <div>
        <nav>Nav</nav>
        <p>
          <Link to="/featured/upcoming">Upcoming Page</Link>
        </p>
        { this.props.children }
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;
