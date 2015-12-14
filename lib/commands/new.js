'use strict';

let Command = require('../models/command'),
    chalk   = require('chalk');

module.exports = class New extends Command {
    constructor() {
        this.name = 'new';
        this.description = `Creates a new directory and calls ${chalk.green('react init')} in it.`;
        this.aliases = ['n'];
        this.works = 'outsideProject';
        this.availableOptions = [
            { name: 'name', type: String, default: '', aliases: ['n'] }
        ];
    }
}
