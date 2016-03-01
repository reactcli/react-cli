'use strict';

let Task    = require('../models/task'),
    Tester  = require('../models/tester');

class Test extends Task {
  run(args) {
    let tester = new Tester();
    return tester.test();
  }
}

module.exports = Test;