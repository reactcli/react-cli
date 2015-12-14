'use strict';

module.exports = class Command {
    constructor() {

    }

    validateAndRun(commandArgs) {
        this.run(commandArgs);
    }

    run(commandArgs) {
        throw new Error('command must implement run');
    }
}
