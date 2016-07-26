# node-unrar [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Unrar wrapper for Node-js.


# node-unrar

Created to unrar archives using `unrar` library.

## Installation

`npm install node-unrar`

You must install `unrar` from rarlab website and put it in your PATH.

## Example

```js
var Unrar = require('node-unrar-update');

var rar = new Unrar('/path/to/file.rar');

/// Create '/path/to/dest/' before rar.extract()

rar.extract('/path/to/dest/', null, function (err) {
    //file extracted succesfully.
});
```

## TODO
Utilize a second argument as an options object for password protected rar's and other avilable options.


## License

Apache-2.0 ©


[npm-image]: https://badge.fury.io/js/node-unrar.svg
[npm-url]: https://npmjs.org/package/node-unrar
[travis-image]: https://travis-ci.org/alice-em/node-unrar.svg?branch=master
[travis-url]: https://travis-ci.org/alice-em/node-unrar
[daviddm-image]: https://david-dm.org/alice-em/node-unrar.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/alice-em/node-unrar
