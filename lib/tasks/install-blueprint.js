'use strict'
let Task = require('../models/task');

class InstallBlueprint extends Task {

    run() {
        console.log('running');
    }

}

module.exports = InstallBlueprint;
