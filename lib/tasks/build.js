'use strict'

let Task    = require('../models/task'),
    Builder = require('../models/builder'),
    rsvp    = require('rsvp'),
    chalk   = require('chalk');

class Build extends Task {
    constructor(environment, outputPath) {
        super();
        this.environment = environment;
        this.outputPath = outputPath;
    }

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            try {
                let builder = new Builder(this.environment, this.outputPath);

                return builder
                .build()
                .then((result) => {
                    resolve(result);
                })
                .catch(e => reject(e));
            }
            catch(e) {
                reject(e);
            }
        });
    }

}

module.exports = Build;
