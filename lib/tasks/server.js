'use strict'

let Task        = require('../models/task'),
    rsvp        = require('rsvp'),
    chalk       = require('chalk'),
    express     = require('express'),
    livereload  = require('express-livereload'),
    path        = require('path'),
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
        app.set('views', path.join(process.cwd(), 'app/tests/views'));

        app.use(express.static(directory));
        app.use(express.static('node_modules'));

        app.get('/tests', function(req, res) {
          res.render('index.jade');
        });

        livereload(app, { watchDir: directory });

        let watcher = new Watcher(watchDirectory, () => {
          new Build({
            environment: 'development',
            project: this.project,
            outputPath: directory
          })
          .run();
        });

        app.listen(port);
      });
    });
  }
}

module.exports = Server;
