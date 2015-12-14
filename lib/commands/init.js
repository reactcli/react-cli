'use strict';

let Command = require('../models/command');

class Init extends Command {
}

Init.nam = 'init';
Init.description = 'Creates a new React application in the current folder.';
Init.aliases = ['i'];
Init.works = 'everywhere';
Init.availableOptions = [
    { name: 'name', type: String, default: '', aliases: ['n'] }
];

module.exports = Init;
