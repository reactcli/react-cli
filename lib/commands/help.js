'use strict';

let Command     = require('../models/command'),
    parseArgs   = require('minimalist');

module.exports = class Help extends Command {
    constructor() {
        this.name = 'help';
        this.description = 'Outputs the usage instructions for all commands or the given command.';
        this.aliases = [undefined, 'h', '-h', '--help'];
        this.works = 'everywhere';
        this.availableOptions = [
            { name: 'verbose', type: Boolean, default: false, aliases: ['v'] },
            { name: 'json', type: Boolean, default: false }
        ];
        this.parameters = [
            '<command-name Default: (all)>'
        ];
    }

    run(options, args) {
        console.log('You need help? Tough shit. We ain\'t got none of that here.');
    }
}
