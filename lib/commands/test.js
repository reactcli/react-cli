'use strict';

let Command   = require('../models/command'),
    TestTask  = require('../tasks/test');

class Test extends Command {
  run(options) {
    let testTask = new TestTask({
      watch: options.watch,
      project: this.project
    });

    testTask.run(options);
  }
}

Test.nam = 'test';
Test.description = 'Runs the Tests for the React application in the current folder.';
Test.aliases = ['t'];
Test.works = 'insideProject';
Test.availableOptions = [
  { name: 'watch', type: Boolean, default: false, aliases: ['w'] }
];

module.exports = Test;