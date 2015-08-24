# redux500

The [redux](https://github.com/rackt/redux) version of [isomorphic500](http://github.com/gpbl/isomorphic500). Work in progress!

[![Build Status](https://travis-ci.org/gpbl/redux500.svg?branch=master)](https://travis-ci.org/gpbl/redux500)
[![Coverage Status](https://coveralls.io/repos/gpbl/redux500/badge.svg?branch=master&service=github)](https://coveralls.io/github/gpbl/redux500?branch=master)

## Directory structure

```
.
├── index.js            # Starts the express server and the webpack dev server
├── src
│   ├── client.js       # Entry point for the browser
│   ├── server.js       # Starts the express server and render the pages server-side
│   ├── components      # React components
│   │   ├── ...
│   │   └── Html.js     # Component used to create the <html> page server-side
│   ├── constants       # Redux constants
│   ├── reducers        # Redux reducers
│   ├── redux
│   │   └── create.js   # Create the Redux instance
│   ├── router          # Utilities to make an universal react-router
│   └── routes          # Routes used by the router
├── static
│   ├── assets          # Contains static assets, such as images
│   └── dist            # Contains files built by webpack
├── tests               # Unit tests
└── webpack
    ├── dev.config.js   # Webpack config for dev environment
    ├── prod.config.js  # Webpack config for building the prod environment
    ├── server.js       # Runs the webpack dev server on dev environment
    └── utils           # Plugins and utilities for webpack
```

### Router

Routing is done using [react-router](http://rackt.github.io/react-router/) and abstracted in a `createRouter` function. `createRouter` runs on both the client & server side environment, returning the currently matched route handler. Within `createRouter`, we run a transition hook which will fire the static `fetchData` function on the route handler. This allows us to wait for data to be available before rendering the route.

## Development

### Babeljs

...

### Webpack

[Webpack](http://webpack.github.io) is used to enable hot-reload on development
and to build the static assets for production.

In the development environment, we use webpack-dev-server to compile, serve and reload the source files
as they are modified. The [main script](index.js) runs a [webpack-dev-server](./webpack/server.js)
with the [development config](./webpack/dev.config.js) and it includes the webpac's
client-side code for hot-reload. We load the bundle with a `<script>` tag
from the [Html](./src/components/Html.js) component.

> The devopment config uses the [webpack-error-notification](https://github.com/vsolovyov/webpack-error-notification)
> plugin. To get notified on errors while compiling the code, on Mac you must `brew install terminal-notifier`.

On production, we build the source for the client using the [production config](./webpack/prod.config.js).
You run the build with `npm run build` from the command line. Webpack places
the bundled files in the `static/dist` directory, adding an hash to skip the browsers
cache. Since the name of the bundle changes at each build, the [Html](./src/components/Html.js) component
extracts its name from a `stats.json` file (created with the [webpack-stats-plugin](https://www.npmjs.com/package/stats-webpack-plugin)).


### Testing

#### Unit tests

Unit Tests work with [mocha](https://mochajs.org) and [chai](chaijs.com/). To run the
unit tests, enter this command from the project's root:

```
$ npm run test
```

The `test` script runs mocha with the [babel compiler](https://babeljs.io/docs/setup/#mocha).

#### Test coverage

We use [istanbul](https://gotwarlost.github.io/istanbul/). To run the test coverage
report, enter:

```
$ npm run cover
$ open coverage/lcov-report/index.html  # opens the HTML report
```

### Linting

Linting code with [eslint](http://eslint.org) is a fondamental tool when writing JavaScript:

* eslint works in Sublime Text using the [SublimeLinter package](https://github.com/roadhump/SublimeLinter-eslint).
* [.travis.yml](.travis.yml) will stop the build if the code does not lint

To run the linter, enter this command from the project's root:

```
$ npm run lint
```

eslint is configured via [.eslintrc]([.eslintrc]) to extends the [recommended
rules](http://eslint.org/docs/rules).
It uses the [babel-eslint](https://github.com/babel/babel-eslint) parser to
make it working with babeljs, and the [eslint-plugin-react](github.com/yannickcr/eslint-plugin-react)
plugin to enable React-specific rules.

### Continuous integration

CI runs with [Travis](https://travis-ci.org/gpbl/redux500). See [.travis.yml](.travis.yml) for its config.

### Heroku

The production app is available at https://redux500.herokuapp.com. We configured
heroku to deploy the master branch when pushed: it runs the `npm postinstall` script
to build the app. For this reason, modules used for the build are included in the production
environment.

## Building a first class app

While redux500 suggests how to solve some of the common problems encountered when building a web application,
keep in mind that your application may have different needs. Here are some further things you could
explore:

* use a deployment server
* improve performances using Bluebird instead of native Promises

...
