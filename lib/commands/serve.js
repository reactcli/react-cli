'use strict';

let Command     = require('../models/command'),
    Builder     = require('../tasks/build'),
    WebServer   = require('../tasks/server');

class Serve extends Command {
    run(options, args) {
        let params = options['argv']['remain'];

        if(params.length != 0) {
            this.printBasicHelp();
            return;
        }

        let builder = new Builder();
        let server = new WebServer();

        builder
        .run([])
        .then(() => {
            return server.run(['./', 8080])
        });
   }
}

Serve.nam = 'serve';
Serve.description = 'Serves the React application in the current folder.';
Serve.aliases = ['server', 's'];
Serve.works = 'insideProject';
Serve.availableOptions = [];
Serve.parameters = [];
module.exports = Serve;
