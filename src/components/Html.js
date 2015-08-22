/* eslint react/no-danger:0 */

import React, { Component, PropTypes } from "react";
import serialize from "serialize-javascript";
import settings from "../../settings";

let webpackStats;
if (process.env.NODE_ENV === "production") {
  webpackStats = require(`../webpack-stats.json`);
}

class Html extends Component {
  static propTypes = {
    content: PropTypes.string,
    store: PropTypes.object
  }

  render() {
    const { content, store } = this.props;
    // TODO grab title and description with react-helmet
    const title = "Redux500";
    const description = "Isomorphic500 implemented in Redux fashion";

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
          {
            webpackStats && webpackStats.css.files.map((css, i) => {
              return <link href={ css } key={ i } rel="stylesheet" />;
            })
          }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={ {__html: content} } />
          <script dangerouslySetInnerHTML={ {__html: `window.__INITIAL_DATA__=${serialize(store.getState())};`} } />
          {
            webpackStats && webpackStats.script.map((src, i) => {
              return <script src={ src } key={ i } />;
            })
          }
          {
            process.env.NODE_ENV === "development" &&
            <script
              src={ `http://${settings.host}:${settings.webpackPort}/dist/bundle.js` } />
          }
        </body>
      </html>
    );
  }
}

export default Html;
