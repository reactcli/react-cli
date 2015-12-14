'use strict';

let rsvp            = require('rsvp'),
    lookupCommand   = require('../utils/lookup-command');

module.exports = class CLI {
    constructor(options) {

    }

    run(environment) {
        rsvp.hash(environment || {}).then(environment => {
            let args = environment.args,
                commandName = args.shift(),
                commandArgs = args,
                command = lookupCommand(environment.commands, commandName, commandArgs);

            command.validateAndRun(commandArgs);
        });
    }
};
