localForage-typescript-plugin-boilerplate
==============================
[![npm](https://img.shields.io/npm/dm/localforage-typescript-plugin-boilerplate.svg)](https://www.npmjs.com/package/localforage-typescript-plugin-boilerplate)

A simple TypeScript plugin boilerplate for [localForage](https://github.com/mozilla/localForage).

## Requirements

* [localForage](https://github.com/mozilla/localForage) v1.5.0+

## Installation
`npm i localforage-typescript-plugin-boilerplate`

## API
The boilerplate makes the dummy `pluginMethod()` available to all localforage instances.
```js
localforage.pluginMethod().then(function(result) {
  console.log(result);
});
```

## Create your plugin

* Rename the occurrences  of `pluginMethod`, `localforagePluginBoilerplate` and `_pluginPrivateVariables` in the `lib/localforage-typescript-plugin-boilerplate.js` (and the file itself) to something more appropriate for your plugin.
* Change the respective names in:
  * `README.md`
  * `package.json`
  * `rollup.config.es6.js`
  * `rollup.config.umd.js`
* Provide a simple example in the `examples/index.html`
