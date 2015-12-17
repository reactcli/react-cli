'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    express = require('express'),
    livereload = require('express-livereload'),
    ncp         = require('ncp').ncp,
    Watcher = require('../models/watcher');

class Server extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {

            let serveDirectory = args[0];
            let port = args[1];
            let watchDirectory = args[2];

            console.log(chalk.green(`Starting server on port ${port} for directory ${serveDirectory}`));
            let app = express();
            app.use(express.static(serveDirectory));
            livereload(app, {'watchDir': serveDirectory});

            let watcher = new Watcher(watchDirectory, () => {
                console.log("Stuff changed, rebuilding!");
            });

            ncp('./dist', serveDirectory, () => {
                app.listen(port);
            });
        });
    }

}

module.exports = Server;
