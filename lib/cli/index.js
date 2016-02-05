'use strict';

let requireAsHash   = require('../utils/require-as-hash'),
    Command         = require('../models/command'),
    Project         = require('../models/project'),
    commands        = requireAsHash('../commands/*.js', Command),
    CLI             = require('./cli');

module.exports = function(options) {
  let cli = new CLI(options);

  let environment = {
    args:     options.args,
    commands: commands,
    project:  Project.closest()
  };

  cli.run(environment);
}
