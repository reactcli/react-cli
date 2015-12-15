'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk'),
    express = require('express');

class Server extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            console.log(chalk.green("Starting server"));
        });
    }

}

module.exports = Server;
