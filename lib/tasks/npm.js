'use strict'

let Task    = require('../models/task'),
    fs      = require('fs'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    exec    = require('child_process').exec;

class Npm extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            let command = 'npm install';
            console.log(chalk.green(`Running '${command}'`))
            exec(command, function(err, stdout, stderr) {
                if(err) {
                    console.log(chalk.red(err));
                    reject();
                }
                else {
                    console.log(chalk.yellow(stdout));
                    console.log(chalk.green('Done'));
                    resolve();
                }
            });
        });
    }

}

module.exports = Npm;
