'use strict';

let Command     = require('../models/command'),
    WebServer   = require('../tasks/server');

class Serve extends Command {
    run(options, args) {
        let params = options['argv']['remain'];

        if(params.length != 0) {
            this.printBasicHelp();
            return;
        }

        let server = new WebServer();
        return server.run([8080, './app']);
   }
}

Serve.nam = 'serve';
Serve.description = 'Serves the React application in the current folder.';
Serve.aliases = ['server', 's'];
Serve.works = 'insideProject';
Serve.availableOptions = [];
Serve.parameters = [];
module.exports = Serve;
