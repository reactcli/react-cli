'use strict'

let Task    = require('../models/task'),
    Builder = require('../models/builder'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk');

class Build extends Task {
  run(args) {
    return new rsvp.Promise((resolve, reject) => {
      let builder = new Builder(
        this.project,
        this.environment,
        this.outputPath
      );

      return builder
        .build()
        .then((result) => {
          resolve(result);
        });
    });
  }
}

module.exports = Build;
