'use strict';

let findup = require('findup');

class Project {
  constructor(root) {
    this.root = root;
  }

  static closest() {
    try {
      return new Project(findup.sync(process.cwd(), 'package.json'));
    } catch(err) {
      return null;
    }
  }
}

module.exports = Project;