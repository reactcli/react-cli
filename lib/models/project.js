'use strict';

let findup = require('findup');

class Project {
  constructor(root) {
    this.root = root;
  }

  static closest() {
    return new Project(findup.sync(process.cwd(), 'package.json'));
  }
}

module.exports = Project;