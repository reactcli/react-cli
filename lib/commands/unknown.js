'use strict';

let Command = require('../models/command'),
    chalk   = require('chalk');

module.exports = class Unknown extends Command {
    constructor(commandName) {
        super(...arguments);
        this.skipHelp = true;
        this.commandName = commandName;
    }

    printBasicHelp() {
        console.log('No help was provided.');
    }

    validateAndRun() {
        console.log(chalk.red(`The specified command name: ${this.commandName} is invalid. ` +
                              `For available options, see 'react help'.`));
    }
}
