'use strict';

let Command   = require('../models/command'),
    WebServer = require('../tasks/server');

class Serve extends Command {
  run(options, args) {
    let params = options['argv']['remain'];
    let port = options['port'];

    if(params.length != 0) {
      this.printBasicHelp();
      return;
    }

    let server = new WebServer({ project: this.project });
    return server.run([port, './app']);
   }
}

Serve.nam = 'serve';
Serve.description = 'Serves the React application in the current folder.';
Serve.aliases = ['server', 's'];
Serve.works = 'insideProject';
Serve.availableOptions = [
 { name: 'port', type: String,  default: '8080', aliases: ['p'] },
];
Serve.parameters = [];
module.exports = Serve;
