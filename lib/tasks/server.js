'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    express = require('express');

class Server extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            console.log(chalk.green("Starting server"));

            let directory = './'; // Eventuall this will point to the build output dir
            let app = express();
            app.use(express.static(directory));
            app.listen(8080);
        });
    }

}

module.exports = Server;
