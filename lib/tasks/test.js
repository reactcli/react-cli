'use strict';

let Task        = require('../models/task'),
    Mocha       = require('mocha/lib/mocha'),
    mochaUtils  = require('mocha/lib/utils'),
    path        = require('path'),
    resolve     = require('resolve'),
    mocha       = new Mocha();

class Test extends Task {
  run(args) {
    resolve('babel-core/register', {
      basedir: process.cwd()
    }, function(error, babelCoreRegister) {
      require(babelCoreRegister);

      let files = mochaUtils.lookupFiles('app/tests', ['js','jsx'], true);
      files = files.map(f => path.resolve(f));

      mocha.files = files;
      mocha.run();
    });
  }
}

module.exports = Test;