'use strict'

module.exports = class Task {
  constructor(opts) {
    Object.assign(this, opts);
  }

  run(commandArgs) {
    throw new Error('Task must implement run');
  }
}
