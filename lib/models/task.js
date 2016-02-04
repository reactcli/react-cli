'use strict'

module.exports = class Task {
  constructor() {

  }

  run(commandArgs) {
    throw new Error('Task must implement run');
  }
}
