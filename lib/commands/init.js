'use strict';

let Command             = require('../models/command'),
    InstallBlueprint    = require('../tasks/install-blueprint'),
    NpmInstall          = require('../tasks/npm');

class Init extends Command {
    run(options, args) {
        let params = options['argv']['remain'];

        if(params.length != 0) {
            this.printBasicHelp();
            return;
        }

        let installer = new InstallBlueprint();
        let npmInstall = new NpmInstall();

        return installer
        .run(['app', '', {'__name__': 'MyApp'}])
        .then(() => {
            return npmInstall.run([]);
        });
    }
}

Init.nam = 'init';
Init.description = 'Creates a new React application in the current folder.';
Init.aliases = ['i'];
Init.works = 'everywhere';
Init.availableOptions = [];
Init.parameters = [];

module.exports = Init;
