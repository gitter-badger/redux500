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
          <Link to="/featured/popular">Popular Page</Link>
        </p>
        <p>
          <Link to={ `/photo/119478695` }>Link to Photo 1</Link>
        </p>
        <p>
          <Link to={ `/photo/2792334` }>Link to Photo 2</Link>
        </p>
      </div>
    );
  }
}

export default HomePage;
