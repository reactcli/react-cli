'use strict';

let rsvp            = require('rsvp'),
    chalk           = require('chalk'),
    lookupCommand   = require('../utils/lookup-command');

module.exports = class CLI {
  constructor(options) {

  }

  run(environment) {
    rsvp.on('error', (e) => {
      console.log(chalk.red(e.stack));
    });

    rsvp.hash(environment || {}).then(environment => {
      let args = environment.args,
        commandName = args.shift(),
        commandArgs = args,
        Command = lookupCommand(environment.commands, commandName, commandArgs),
        command = new Command({
          commands: environment.commands,
          name: commandName,
          project: environment.project
        });

      if (environment.project) {
        process.chdir(environment.project.root);
      }

      return command.validateAndRun(commandArgs);
    });
  }
};
