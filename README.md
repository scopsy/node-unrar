# node-unrar [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Unrar wrapper for Node-js.


# node-unrar

Created to unrar archives usin `unrar` library.

## Installation

`npm install node-unrarlib`

You must install `unrar` from rarlab website and put it in your PATH.

## Example

```js
var Unrar = require('node-unrarlib');

var rar = new Unrar('/path/to/file.rar');

archive.extract('/path/to/dest/', function (err) {
    //file extracted succesfully.
});
```



## License

Apache-2.0 © [Dima Grossman]()


[npm-image]: https://badge.fury.io/js/node-unrar.svg
[npm-url]: https://npmjs.org/package/node-unrar
[travis-image]: https://travis-ci.org/scopsy/node-unrar.svg?branch=master
[travis-url]: https://travis-ci.org/scopsy/node-unrar
[daviddm-image]: https://david-dm.org/scopsy/node-unrar.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/scopsy/node-unrar
