'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    exec    = require('child_process').exec;

class ShellCommand extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            let command = args[0];
            console.log(chalk.green(`Running '${command}'`))
            exec(command, function(err, stdout, stderr) {
                if(err) {
                    console.log(chalk.red(stdout));
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

module.exports = ShellCommand;
