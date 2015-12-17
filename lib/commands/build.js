'use strict';

let Command = require('../models/command'),
    Builder = require('../tasks/builder');

class Build extends Command {
    run(options, args) {
        let params = options['argv']['remain'];

        if(params.length != 0) {
            this.printBasicHelp();
            return;
        }

        let builder = new Builder();
        builder.run([]);
   }
}

Build.nam = 'build';
Build.description = 'Builds the React application in the current folder.';
Build.aliases = ['b'];
Build.works = 'insideProject';
Build.availableOptions = [];
Build.parameters = [];
module.exports = Build;
