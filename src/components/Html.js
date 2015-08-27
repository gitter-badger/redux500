/* eslint react/no-danger:0 */

import React, { Component, PropTypes } from "react";
import serialize from "serialize-javascript";

const css = [];
const scripts = [];

if (process.env.NODE_ENV === "production") {
  // on production, include scripts and css from the webpack stats
  const config = require("../../webpack/prod.config");
  const stats = require("../../static/dist/stats.json");
  const main = stats.assetsByChunkName.main[0];
  scripts.push(`${config.output.publicPath}${main}`);
}
else {
  // on development, use the webpack dev server config
  // css are not needed since they are injected inline with webpack
  const config = require("../../webpack/dev.config");
  scripts.push(`${config.output.publicPath}${config.output.filename}`);
}

class Html extends Component {

  static propTypes = {
    content: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired
  }

  render() {
    const { content, store } = this.props;
    // TODO: grab title and description with react-helmet

    const title = "Redux500";
    const description = "Isomorphic500 implemented in Redux fashion";

    const state = store.getState();
    delete state.router;

    return (
      <html lang="en-us">
        <head>
          <meta charSet="utf-8"/>
          <title>{ title }</title>
          <meta property="og:site_name" content={ title } />
          <meta property="og:locale" content="en_US" />
          <meta property="og:title" content={ title } />
          <meta property="og:description" content={ description } />
          <meta property="twitter:title" content={ title } />
          <meta property="twitter:description" content={ description } />

          <link rel="shortcut icon" href="/favicon.ico" />

          { css.map((href, i) => <link href={ href } key={ i } rel="stylesheet" />) }

        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={ {__html: content} } />

          <script dangerouslySetInnerHTML={ {__html: `window.__INITIAL_DATA__=${serialize(state)};`} } />

          { scripts.map((src, i) => <script src={ src } key={ i } />) }

        </body>
      </html>
    );
  }
}

export default Html;
