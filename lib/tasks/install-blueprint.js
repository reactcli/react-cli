'use strict'

let Task        = require('../models/task'),
    fs          = require('fs'),
    rsvp        = require('rsvp'),
    Blueprint   = require('../models/blueprint');

class InstallBlueprint extends Task {

    run(args) {
        return new rsvp.Promise((resolve, reject) => {
            let name = args[0];
            let destination = args[1];
            let blueprint = Blueprint.load(name);
            blueprint.install(destination);
            resolve();
        });
    }

}

module.exports = InstallBlueprint;
