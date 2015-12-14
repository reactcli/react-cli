'use strict';

let Command = require('../models/command'),
    InstallBlueprint = require('../tasks/install-blueprint');

class Init extends Command {
    run(options, args) {
        let installer = new InstallBlueprint();
        installer.run(['app', options[0]]);
    }
}

Init.nam = 'init';
Init.description = 'Creates a new React application in the current folder.';
Init.aliases = ['i'];
Init.works = 'everywhere';
Init.availableOptions = [
    { name: 'name', type: String, default: '', aliases: ['n'] }
];

module.exports = Init;
