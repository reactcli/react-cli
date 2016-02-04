'use strict'

let Task    = require('../models/task'),
    process = require('process'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk');

class ChangeWorkingDirectory extends Task {

  run(args) {
    return new rsvp.Promise((resolve, reject) => {
      let directory = args[0];
      console.log(chalk.green(`Switching to directory ${directory}`));
      try {
        process.chdir(directory);
        console.log(chalk.green(`Done switching directory`));
        resolve();
      }
      catch(err) {
        console.log(chalk.red(err));
        reject();
      }
    });
  }
}

module.exports = ChangeWorkingDirectory;
