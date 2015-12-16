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
            let replacements = args[2];
            let blueprint = Blueprint.load(name);
            if(blueprint) {
                blueprint.install(destination, replacements);
                resolve();
            }
            else {
                reject();
            }
        });
    }

}

module.exports = InstallBlueprint;
