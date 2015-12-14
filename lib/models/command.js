'use strict';

module.exports = class Command {
    constructor() {

    }

    validateAndRun() {
        this.run();
    }

    run(commandArgs) {
        throw new Error('command must implement run');
    }
}
