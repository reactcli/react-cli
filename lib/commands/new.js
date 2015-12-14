'use strict';

let Command = require('../models/command'),
    chalk   = require('chalk');

class New extends Command {
}

New.nam = 'new';
New.description = `Creates a new directory and calls ${chalk.green('react init')} in it.`;
New.aliases = ['n'];
New.works = 'outsideProject';
New.availableOptions = [
    { name: 'name', type: String, default: '', aliases: ['n'] }
];

module.exports = New;
