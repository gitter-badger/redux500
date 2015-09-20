import React, { PropTypes, Component } from "react";

class FeaturedPage extends Component {

  static propTypes = {
    params: PropTypes.object.isRequired
  }

  static contextTypes = {
    // router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { params } = this.props;
    const { /*router,*/ store } = this.context;

    return (
      <div>
        <p>Slug provided: <strong>{ params.slug }</strong></p>
        {

        /*<p>Alternatively we can also retrieve from the router instance: <em>{ router.state.params.slug }</em></p>*/
        
        }
        <p>
          Printing redux state: 
          <strong>{ JSON.stringify(store.getState()) }</strong>
        </p>
      </div>
    );
  }
}

export default FeaturedPage;
