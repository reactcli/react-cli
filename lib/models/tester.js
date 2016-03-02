'use strict';

let Watcher     = require('./watcher'),
    Mocha       = require('mocha/lib/mocha'),
    mochaUtils  = require('mocha/lib/utils'),
    path        = require('path'),
    resolver    = require('resolve'),
    Promise     = require('rsvp').Promise,
    mocha       = new Mocha();

class Tester {
  test(args) {
    let resolvePromise = this._promisizeResolve('babel-core/register');

    return resolvePromise.then((babelCoreRegister) => {
      require(babelCoreRegister);
    }).then(() => {
      let watchFiles = mochaUtils.files(
        path.join(process.cwd(), 'app'),
        ['js', 'jsx']
      );

      this._test();

      if(args.watch) {
        let watcher = new Watcher('app', () => {
          watchFiles.forEach(f => {
            delete require.cache[f];
          });

          Mocha.call(mocha, mocha.options);
          this._test();
        });
      }
    });
  }

  _test() {
    let files = mochaUtils.lookupFiles('app/tests', ['js','jsx'], true);
    files = files.map(f => path.resolve(f));
    mocha.files = files;
    mocha.run();
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