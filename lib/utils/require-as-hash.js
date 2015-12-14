'use strict';

/**
    Includes all matching files of the given subclass into a hash.

    Base Source from: https://github.com/ember-cli/ember-cli/blob/master/lib/utilities/require-as-hash.js
*/

let globSync      = require('glob').sync,
    path          = require('path'),
    S             = require('string'),
    getCallerFile = require('./get-caller-file');

module.exports = function(pattern, type) {
    let callerFileDir = path.dirname(getCallerFile());

    return globSync(pattern, { cwd: callerFileDir }).reduce((hash, file) => {
        let klass = require(callerFileDir + '/' + file);
        if (!type || (klass.prototype instanceof type)) {
            hash[S(path.basename(file, '.js')).camelize()] = klass;
        }

        return hash;
    }, {});
}
