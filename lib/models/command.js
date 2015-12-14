'use strict';

module.exports = class Command {
    constructor() {

    }

    run(commandArgs) {
        throw new Error('command must implement run');
    }
}
