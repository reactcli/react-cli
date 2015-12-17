'use strict'

let chalk   = require('chalk'),
    watch   = require('watch');

class Watcher {

    constructor(dir, whatToDoWhenStuffChanges) {
        this.dir = dir;
        this.whatToDoWhenStuffChanges = whatToDoWhenStuffChanges;

        this.watcher = this.watcher || watch;
        console.log(chalk.green(`Watching directory ${dir} for changes`));

        this.watcher.watchTree(this.dir, (f, curr, prev) => {
            console.log(chalk.blue(`Watched ${f} ${curr} ${prev}`));
            this.whatToDoWhenStuffChanges(f);
        });

    }
}

module.exports = Watcher;
