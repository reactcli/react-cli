'use strict'

let Task    = require('../models/task'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk');

class Builder extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            // TODO - build stuff!
            resolve();
        });
    }

}

module.exports = Builder;
