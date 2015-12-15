'use strict'

let Task    = require('../models/task'),
    fs      = require('fs'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    exec    = require('child_process').exec;

class Git extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            let destination = args[0];
            let command = args[1]
            let exec_command = `git ${command}`;
            console.log(chalk.green(`Running '${exec_command}'`))
            exec(exec_command, function(err, stdout, stderr) {
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

module.exports = Git;
