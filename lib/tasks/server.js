'use strict'

let Task        = require('../models/task'),
    rsvp        = require('rsvp'),
    chalk       = require('chalk'),
    express     = require('express'),
    livereload  = require('express-livereload'),
    Watcher     = require('../models/watcher'),
    Build       = require('../tasks/build');

class Server extends Task {
  run(args) {
    return new rsvp.Promise((resolve, reject) => {

      let port = args[0];
      let watchDirectory = args[1];
      let builder = new Build({
        environment: 'development',
        project: this.project
      });

      builder
      .run([])
      .then((result) => {
        let directory = result.directory;
        console.log(chalk.green(`Starting server on port ${port} for directory ${directory}`));

        let app = express();
        app.use(express.static(directory));

        livereload(app, {'watchDir': directory});

        let watcher = new Watcher(watchDirectory, () => {
          new Build('development', directory)
          .run()
        });

        app.listen(port);
      });
    });
  }
}

module.exports = Server;
