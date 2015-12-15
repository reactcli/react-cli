'use strict';

let Command             = require('../models/command'),
    InstallBlueprint    = require('../tasks/install-blueprint'),
    NpmInstall          = require('../tasks/npm');

class Init extends Command {
    run(options, args) {
        let installer = new InstallBlueprint();
        let npmInstall = new NpmInstall();

        let appname = options[0];

        installer
        .run(['app', ''])
        .then(() => {
            return npmInstall.run([appname]);
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

module.exports = Init;
