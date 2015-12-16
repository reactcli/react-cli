'use strict';

let Command             = require('../models/command'),
    InstallBlueprint    = require('../tasks/install-blueprint');

class Generate extends Command {
    run(options, args) {
        let installer = new InstallBlueprint();

        let params = options['argv']['remain'];
        let generator = params[0];
        let name = params[1];
        let replacements = { 'name': name };
        installer.run([generator, '.', replacements])
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
