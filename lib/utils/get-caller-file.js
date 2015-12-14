'use strict';

/**
    Gets the filename of the file where the function was called from.

    Lifted from: http://stackoverflow.com/questions/13227489
*/

module.exports = function() {
    let ph = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, s) => s;
    let stack = new Error().stack;
    Error.prepareStackTrace = ph;

    return stack[2] ? stack[2].getFileName() : null;
}
