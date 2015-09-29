'use strict';
var child_process = require('child_process');
var exec  = child_process.exec;

var UnrarModule = function(options){
  this._filePath = options.path || options;
};

UnrarModule.prototype.extract = function (dstPath, options, cb) {
  this._execute(['e'], dstPath, function(err, data){
    if(err) return;

    cb();
  });
}

UnrarModule.prototype._execute = function (args, dstPath, cb) {
  var args = args;
  var execCommand = "unrar " + args.join() + this._filePath;

  if(dstPath) execCommand += ' ' + dstPath;

  exec(execCommand, function (err, stdout, stderr) {
    if(err) cb(new Error(err));
    if (stdout.length > 0 && stdout.match(/.*not RAR archive.*/g)) { return done(new Error('Unsupported RAR.')); }

    cb(null, stdout);

  });
}

module.exports = UnrarModule;
