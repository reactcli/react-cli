'use strict'

let Task      = require('../models/task'),
    fs        = require('fs'),
    rsvp      = require('rsvp'),
    Blueprint = require('../models/blueprint');

class InstallBlueprint extends Task {
  run(args) {
    return new rsvp.Promise((resolve, reject) => {
      let name = args[0];
      let destination = args[1];
      let replacements = args[2];
      let params = args[3];
      let blueprint = Blueprint.load(name);
      if(blueprint) {
        let additionalReplacements = (blueprint.generateReplacements && blueprint.generateReplacements(params)) || {};
        let computedReplacements = Object.assign(additionalReplacements, replacements);
        blueprint.install(destination, computedReplacements);
        resolve();
      }
      else {
        reject();
      }
    });
  }
}

module.exports = InstallBlueprint;
