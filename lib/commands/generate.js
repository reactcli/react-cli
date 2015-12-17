'use strict';

let Command             = require('../models/command'),
    InstallBlueprint    = require('../tasks/install-blueprint'),
    StartCase           = require('lodash.startcase');

class Generate extends Command {
    run(options, args) {
        let params = options['argv']['remain'];

        if(params.length < 2) {
            this.printBasicHelp();
            return;
        }

        let installer = new InstallBlueprint();

        let generator = params[0];
        let name = StartCase(params[1]).replace(/\s+/g, '');
        let replacements = { '__name__': name };
        let props = params.slice(2);
        return installer.run([generator, '.', replacements, props])
    }
}

Generate.nam = 'generate';
Generate.description = 'Generates code using the specified blueprint';
Generate.aliases = ['g'];
Generate.works = 'insideProject';
Generate.availableOptions = [
    { name: 'blueprint', type: String, default: '', aliases: ['b'] },
    { name: 'name', type: String, default: '', aliases: ['n'] }
];
Generate.parameters = [];

module.exports = Generate;
