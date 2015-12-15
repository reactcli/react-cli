'use strict';

let Command = require('../models/command'),
    WebServer = require('../tasks/server');

class Serve extends Command {
    run(options, args) {
        let server = new WebServer();
        server.run();
   }
}

Serve.nam = 'serve';
Serve.description = 'Serves the React application in the current folder.';
Serve.aliases = ['server', 's'];
Serve.works = 'insideProject';

module.exports = Serve;
