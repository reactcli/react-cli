'use strict';

let Mocha       = require('mocha/lib/mocha'),
    mochaUtils  = require('mocha/lib/utils'),
    path        = require('path'),
    resolver    = require('resolve'),
    Promise     = require('rsvp').Promise,
    mocha       = new Mocha();

class Tester {
  test() {
    let resolvePromise = this._promisizeResolve('babel-core/register');

    return resolvePromise.then((babelCoreRegister) => {
      require(babelCoreRegister);
    }).then(() => {
      let files = mochaUtils.lookupFiles('app/tests', ['js','jsx'], true);
      files = files.map(f => path.resolve(f));

      mocha.files = files;
      mocha.run();
    });
  }

  _promisizeResolve(p) {
    return new Promise((resolve, reject) => {
      resolver(p, {
        basedir: process.cwd()
      }, function(error, localPackage) {
        if (error) {
          return reject(error);
        }

        resolve(localPackage);
      });
    });
  }
}

module.exports = Tester;