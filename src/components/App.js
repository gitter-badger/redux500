import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

@connect(function mapStateToProps(state) {
  return {
    isTransitioning: state.transitions.isTransitioning
  };
})
class App extends Component {
  static propTypes = {
    isTransitioning: PropTypes.bool.isRequired
  }

  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  static defaultProps = {
    isTransitioning: false
  }

  render() {
    const { isTransitioning } = this.props;

    return (
      <div>
        {
          isTransitioning ?
          <h1>Loading...</h1> :
          this.props.children
        }
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    );
  }
}

export default App;
