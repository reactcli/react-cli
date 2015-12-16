'use strict';

let Command             = require('../models/command'),
    InstallBlueprint    = require('../tasks/install-blueprint'),
    StartCase           = require('lodash.startcase');

class Generate extends Command {
    run(options, args) {
        let installer = new InstallBlueprint();

        let params = options['argv']['remain'];
        let generator = params[0];
        let name = StartCase(params[1]).replace(/\s+/g, '');
        let replacements = { '__name__': name };
        let props = params.slice(2);
        return installer.run([generator, '.', replacements, props])
    }
}

Generate.nam = 'generate';
Generate.description = 'Generates a class';
Generate.aliases = ['g'];
Generate.works = 'insideProject';
Generate.availableOptions = [
    { type: 'type', type: String, default: '', aliases: ['t'] }
];
Generate.parameters = [];

module.exports = Generate;
