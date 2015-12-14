'use strict';

let Command = require('../models/command');

class Init extends Command {
    constructor() {
        this.name = 'init';
        this.description = 'Creates a new React application in the current folder.';
        this.aliases = ['i'];
        this.works = 'everywhere';
        this.availableOptions = [
            { name: 'name', type: String, default: '', aliases: ['n'] }
        ];
    }
}

module.exports = Init;
