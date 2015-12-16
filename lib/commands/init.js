'use strict';

let Command             = require('../models/command'),
    InstallBlueprint    = require('../tasks/install-blueprint'),
    NpmInstall          = require('../tasks/npm');

class Init extends Command {
    run(options, args) {
        let installer = new InstallBlueprint();
        let npmInstall = new NpmInstall();

        return installer
        .run(['app', '', {'__name__': 'My App'}])
        .then(() => {
            return npmInstall.run([]);
        });
    }
}

Init.nam = 'init';
Init.description = 'Creates a new React application in the current folder.';
Init.aliases = ['i'];
Init.works = 'everywhere';
Init.availableOptions = [
    { name: 'name', type: String, default: '', aliases: ['n'] }
];
Init.parameters = [];

module.exports = Init;
