'use strict';

let Command   = require('../models/command'),
    BuildTask = require('../tasks/build'),
    rsvp      = require('rsvp'),
    chalk     = require('chalk'),
    path      = require('path');

class Build extends Command {
  run(options) {
    let buildTask = new BuildTask({
      environment: options.environment,
      outputPath: options['output-path'],
      project: this.project
    });

    buildTask.run(options)
   }
}

Build.nam = 'build';
Build.description = 'Builds the React application in the current folder.';
Build.aliases = ['b'];
Build.works = 'insideProject';
Build.availableOptions = [
  { name: 'environment', type: String,  default: 'development', aliases: ['e', { 'dev': 'development' }, { 'prod': 'production' }] },
  { name: 'output-path', type: path,    default: 'dist/',       aliases: ['o'] },
  { name: 'watch',       type: Boolean, default: false,         aliases: ['w'] },
  { name: 'watcher',     type: String }
];

module.exports = Build;
