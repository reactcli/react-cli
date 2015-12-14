'use strict'

let fs      = require('fs'),
    path    = require('path'),
    chalk   = require('chalk');

module.exports = class Blueprint {

    static load(name) {
        let dir = path.resolve(__dirname, '../../blueprints/', name);
        let file = path.resolve(dir, 'index.js');

        console.log(chalk.green(`Loading blueprint ${name} from ${file}`));
        let module = require(file);
        return Object.assign(new Blueprint(), module);
    }

    install(dest) {
        console.log(chalk.green(`Installing to ${dest}`));
        console.log(chalk.green('Done!'));
    }
}
