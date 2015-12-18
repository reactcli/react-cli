'use strict'

let chalk       = require('chalk'),
    chokidar    = require('chokidar'),
    some        = require('lodash.some');

class Watcher {

    constructor(dir, whatToDoWhenStuffChanges) {
        this.dir = dir;
        this.whatToDoWhenStuffChanges = whatToDoWhenStuffChanges;

        console.log(chalk.green(`Watching directory ${dir} for changes`));

        this.ignoredExtensions = ['.tmp', '.swp', '.DS_Store'];

        chokidar
        .watch(this.dir, {ignoreInitial: true})
        .on('all', (event, path) => {
            let f = path;
            if(!some(this.ignoredExtensions, ext => f.endsWith(ext))) {
                console.log(chalk.blue(`Watched ${f}`));
                this.whatToDoWhenStuffChanges(f);
            }
        });
    }
}

module.exports = Watcher;
