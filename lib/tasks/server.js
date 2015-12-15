'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    express = require('express');

class Server extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {

            let directory = args[0];
            let port = args[1];

            console.log(chalk.green(`Starting server on port ${port} for directory ${directory}`));

            let app = express();
            app.use(express.static(directory));
            app.listen(8080);
        });
    }

}

module.exports = Server;
