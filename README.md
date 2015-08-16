# redux500

The [redux](https://github.com/rackt/redux) version of [isomorphic500](http://github.com/gpbl/isomorphic500). Work in progress!


## Development

### Babeljs

...

### Travis CI

...

### Linting

Linting code with [eslint](http://eslint.org) is a fondamental tool when writing JavaScript:

* integrate eslint in Sublime Text using the [SublimeLinter package](https://github.com/roadhump/SublimeLinter-eslint).
* [configure](.travis.yml) Travis to stop the build if the code does not lint

To run the linter, enter this command from the project's root

```
$ npm run lint
```

eslint is configured via [.eslintrc]([.eslintrc]) to extends the [recommended
rules](http://eslint.org/docs/rules).
It uses the [babel-eslint](https://github.com/babel/babel-eslint) parser to
make it working with babeljs, and the [eslint-plugin-react](github.com/yannickcr/eslint-plugin-react)
plugin to enable React-specific rules.

### Router

Routing is done using [react-router](http://rackt.github.io/react-router/) and abstracted in a `createRouter` function. `createRouter` runs on both the client & server side environment, returning the currently matched route handler. Within `createRouter`, we run a transition hook which will fire the static `fetchData` function on the route handler. This allows us to wait for data to be available before rendering the route. 
