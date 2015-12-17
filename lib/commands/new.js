'use strict';

let Command                 = require('../models/command'),
    chalk                   = require('chalk'),
    InstallBlueprint        = require('../tasks/install-blueprint'),
    CreateDirectory         = require('../tasks/create-directory'),
    ChangeWorkingDirectory  = require('../tasks/change-working-directory'),
    ShellCommand            = require('../tasks/shell-command'),
    rsvp                    = require('rsvp');

class New extends Command {
    run(options, args) {
        let params = options['argv']['remain'];

        if(params.length != 1) {
            this.printBasicHelp();
            return;
        }

        let appname = params[0];

        let directoryCreator = new CreateDirectory()
        let directoryChanger = new ChangeWorkingDirectory();
        let installer = new InstallBlueprint();
        let shell = new ShellCommand();

        return directoryCreator
        .run([appname])
        .then(() => {
            return installer.run(['app', appname, {'__name__': appname}]);
        })
        .then(() => {
           return directoryChanger.run([appname]);
        })
        .then(() => {
            return shell.run(['git init']);
        })
        .then(() => {
            return shell.run(['git add .']);
        })
        .then(() => {
            return shell.run(["git commit -m 'Initial commit'"]);
        })
        .then(() => {
            return shell.run(['npm install']);
        });
    }
}

New.nam = 'new';
New.description = `Creates a new directory and calls ${chalk.green('react init')} in it.`;
New.aliases = ['n'];
New.works = 'outsideProject';
New.availableOptions = [
    { name: 'name', type: String, default: '', aliases: ['n'] }
];
New.parameters = [];

module.exports = New;
