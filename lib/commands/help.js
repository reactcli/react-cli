'use strict';

let chalk   = require('chalk'),
    EOL     = require('os').EOL,
    Command = require('../models/command');

class RootCommand extends Command {
    constructor() {
        super();
        this.isRoot = true;
    }
};

RootCommand.nam = 'react';
RootCommand.parameters = [
    '<command: (Default: help)>'
];

class Help extends Command {
    constructor(commands) {
        super();
        this.commands = commands;
    }

    run(options) {
        let rootCommand = new RootCommand();

        if (options.argv.remain.length === 0) {
            rootCommand.printBasicHelp();
            console.log(`Available commands in react-cli:${EOL}`);

            Object.keys(this.commands).forEach(c => {
                let command = new this.commands[c]();
                if (!command.skipHelp) command.printBasicHelp();
            });
        } else {
            console.log(`Requested react-cli commands:${EOL}`);
            options.argv.remain.forEach(c => {
                let Command = this.commands[c];
                if (typeof Command === 'undefined' || Command === null) {
                    console.log(chalk.red(`Requested command not found: ${c}${EOL}`));
                    return;
                }

                let command = new Command();
                command.printBasicHelp();
            })
        }
    }
};

Help.nam = 'help';
Help.description = 'Outputs the usage instructions for all commands or the provided command.';
Help.aliases = [undefined, 'h', '-h', '--help'];
Help.works = 'everywhere';
Help.availableOptions = [
    { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
    { name: 'json', type: Boolean, default: false }
];
Help.parameters = [
    '<command-name Default: (all)>'
];

module.exports = Help;
