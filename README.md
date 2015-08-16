# redux500

The [redux](https://github.com/rackt/redux) version of [isomorphic500](http://github.com/gpbl/isomorphic500). Work in progress!

[![Build Status](https://travis-ci.org/gpbl/redux500.svg?branch=master)](https://travis-ci.org/gpbl/redux500)

## Development

### Babeljs

...

### Continuous integration

CI runs with [Travis](https://travis-ci.org/gpbl/redux500). See [.travis.yml](.travis.yml) for its config.

### Heroku

The production app is available at https://redux500.herokuapp.com. We configured
heroku to deploy the master branch when pushed: it runs the `npm postinstall` script
to build the app. For this reason, modules used for the build are included in the production
environment.

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
