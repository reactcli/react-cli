'use strict';

let broccoli    = require('broccoli'),
    rsvp        = require('rsvp'),
    cpd         = require('copy-dereference'),
    existsSync  = require('exists-sync'),
    findup      = require('findup'),
    path        = require('path'),
    fs          = require('fs'),
    rmdir       = require('rimraf');

class Builder {
  constructor(project, environment, outputPath) {
    this.project = project;
    this.environment = environment;
    this.outputPath = outputPath;
    this.signalsTrapped = false;

    this.trapSignals();
    this.configureBroccoliBuilder();
  }

  trapSignals() {
    if(this.signalsTrapped) return;
    process.on('SIGINT', this.onSIGINT.bind(this));
    process.on('SIGTERM', this.onSIGTERM.bind(this));
    process.on('message', this.onMessage.bind(this));
    this.signalsTrapped = true;
  }

  configureBroccoliBuilder() {
    let buildFile = this.getBuildFile(),
        tree = buildFile();

    this.builder = new broccoli.Builder(tree);
  }

  build() {
    console.log(`Building ${this.environment}`);

    return this.builder
      .build()
      .then((result) => {
        this.copyToOutputPath(result.directory);
        return rsvp.resolve(result);
      });
  }

  clearOutputPath() {
    // We should really check and make sure this isn't a parent of the app
    if (existsSync(this.outputPath)) {
      rmdir.sync(this.outputPath);
    }
  }

  copyToOutputPath(inputPath) {
    if(this.outputPath) {
      this.clearOutputPath();
      cpd.sync(inputPath, this.outputPath);
    }

    console.log('Build successful!');
  }

  cleanupAndExit() {
    process.exit();
  }

  onSIGINT() {
    this.cleanupAndExit();
  }

  onSIGTERM() {
    this.cleanupAndExit();
  }

  onMessage(message) {
    if (message.kill) {
      this.cleanupAndExit();
    }
  }

  getBuildFile() {
    let buildFilePath = path.join(this.project.root, 'react-cli-build.js');
    return require(buildFilePath);
  }
}

module.exports = Builder;
