'use strict'

let Task        = require('../models/task'),
    fs          = require('fs'),
    rsvp        = require('rsvp'),
    chalk       = require('chalk');

class CreateDirectory extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            let directory = args[0];
            console.log(chalk.green(`Creating directory ${directory}`));
            fs.mkdirSync(directory);
            console.log(chalk.green(`Done creating directory`));
            resolve();
        });
    }

}

module.exports = CreateDirectory;
