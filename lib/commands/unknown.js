'use strict';

let Command = require('../models/command'),
    chalk   = require('chalk');

module.exports = class Unknown extends Command {
    constructor() {
        this.skipHelp = true;
    }

    printBasicHelp() {
        console.log('No help was provided.');
    }

    validateAndRun() {
        throw new Error(`The specified command name: ${this.commandName} is invalid.` +
                        `For available options, see ${chalk.green('react help')}`);
    }
}
