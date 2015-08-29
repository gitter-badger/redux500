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
        <p>
          <Link to={ `/photo/119478695` }>Link to Photo</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;
