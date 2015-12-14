'use strict';

let Command = require('../models/command');

class Help extends Command {
    constructor() {
        super();
        this.isRoot = true;
    }

    run(options, args) {
        this.printBasicHelp();
    }
}

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
