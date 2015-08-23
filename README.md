# redux500

The [redux](https://github.com/rackt/redux) version of [isomorphic500](http://github.com/gpbl/isomorphic500). Work in progress!

[![Build Status](https://travis-ci.org/gpbl/redux500.svg?branch=master)](https://travis-ci.org/gpbl/redux500)
[![Coverage Status](https://coveralls.io/repos/gpbl/redux500/badge.svg?branch=master&service=github)](https://coveralls.io/github/gpbl/redux500?branch=master)

## Directory structure

```
.
├── index.js            # Starts the express server and, on dev, the webpack dev server
├── settings.js         # Basic settings for the server, such as port, host, etc
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

