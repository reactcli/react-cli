'use strict';

let Command     = require('../models/command'),
    parseArgs   = require('minimalist');

class Help extends Command {
    run(options, args) {
        console.log('You need help? Tough shit. We ain\'t got none of that here.');
    }
}

Help.nam = 'help';
Help.description = 'Outputs the usage instructions for all commands or the given command.';
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
