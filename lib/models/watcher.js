'use strict'

let chalk   = require('chalk'),
    watch   = require('watch'),
    some    = require('lodash.some');

class Watcher {

    constructor(dir, whatToDoWhenStuffChanges) {
        this.dir = dir;
        this.whatToDoWhenStuffChanges = whatToDoWhenStuffChanges;

        this.watcher = this.watcher || watch;
        console.log(chalk.green(`Watching directory ${dir} for changes`));

        this.ignoredExtensions = ['.tmp', '.swp'];

        this.watcher.watchTree(this.dir, (f, curr, prev) => {
            if(typeof f === 'string' && !some(this.ignoredExtensions, ext => f.endsWith(ext))) {
                console.log(chalk.blue(`Watched ${f} ${curr} ${prev}`));
                this.whatToDoWhenStuffChanges(f);
            }
        });

    }
}

module.exports = Watcher;
