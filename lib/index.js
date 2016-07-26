'use strict';
var child_process = require('child_process');
var exec = child_process.exec;
var escape = function(input) {
    return require('shell-escape')([input])
}

var UnrarModule = function(options) {
    this._filePath = options.path || options;
};

UnrarModule.prototype.extract = function(dstPath, options, cb) {
    var _self = this;
    dstPath = escape(dstPath);

    _self._execute(['e'], dstPath, function(err, data) {
        if (err) return;

        cb();
    });
}

UnrarModule.prototype._execute = function(args, dstPath, cb) {
    var args = args;
    var execCommand = "unrar " + args.join() + ' ' + escape(this._filePath);

    if (dstPath) execCommand += ' ' + dstPath;

    exec(execCommand, function(err, stdout, stderr) {
        if (err) cb(new Error(err));
        if (stdout.length > 0 && stdout.match(/.*not RAR archive.*/g)) {
            return done(new Error('Unsupported RAR.'));
        }

        cb(null, stdout);
    });
}

module.exports = UnrarModule;
