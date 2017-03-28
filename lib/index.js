'use strict';
var child_process   = require('child_process');
var shellEscape     = require('shell-escape');
var exec            = child_process.exec;

var UnrarModule = function(options) {
    this._filePath = options.path || options;
};

UnrarModule.prototype.extract = function(dstPath, options, cb) {
    var _self   = this;
    dstPath     = escape(dstPath);

    _self._execute(['e'], dstPath, function(err, data) {
        if (err) return cb(new Error(err));

        cb(null, data);
    });
};

UnrarModule.prototype.list = function(dstPath, options, cb) {
    var _self   = this;
    dstPath     = escape(dstPath);

    _self._execute(['l'], '', function(err, data) {
        if (err) return cb(new Error(err));
        var files = data.split('\n').map(function(line){ return line; }).filter(function(file){ return file.trim().length; }),
            split = [], positions = [], filespositions = null;
        files.forEach(function(file, index){
          if (file.match(/\-{2,}/g)){
            var a = file.replace(/\s/g,''), b = 0, c = {};
            for (b = 0; b < a.length; b++){
            	if (!c.hasOwnProperty(a.charAt(b))){
            		c[a.charAt(b)] = 0;
              }
            	c[a.charAt(b)]++;
            }
            if (Object.keys(c).length == 1 && Object.keys(c)[0] === '-'){
              split.push(index);
              positions = [];
              filespositions = file;
              var re = /\s+/g, match = null;
              while ((match = re.exec(file)) !== null) {
                positions.push(match.index);
              }
            }
          }
        });
        if (split.length == 2){
          files = files.slice(split[0]+1, split[1]);
        }
        files = files.map(function(file){
          file = {
            attributes: file.slice(0, positions[0]).trim(),
            size: parseInt(file.slice(positions[0], positions[1]).trim()),
            date: new Date(file.slice(positions[1], positions[3]).trim()),
            path: file.slice(positions[3]).trim()
          };
          file.extension = file.path.split('.')[file.path.split('.').length-1];
          return file;
        });
        cb(null, files);
    });
};

UnrarModule.prototype._execute = function(args, dstPath, cb) {
    var execCommand = "unrar " + args.join() + ' ' + escape(this._filePath);

    if(dstPath) execCommand += ' ' + dstPath;
    exec(execCommand, function(err, stdout) {
        if (err) cb(new Error(err));
        if (stdout.length > 0 && stdout.match(/.*not RAR archive.*/g)) {
            return cb(new Error('Unsupported RAR.'));
        }

        cb(null, stdout);
    });
};

function escape(input) {
    return shellEscape([input]);
}

module.exports = UnrarModule;
