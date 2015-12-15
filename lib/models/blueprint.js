'use strict'

let fs      = require('fs'),
    path    = require('path'),
    chalk   = require('chalk'),
    walk  = require('walk-sync');

class Blueprint {

    constructor(src) {
        this.src = src;
        this.filesToRename = [];
    }

    static load(name) {
        let dir = path.resolve(__dirname, '../../blueprints/', name);
        let file = path.resolve(dir, 'index.js');

        console.log(chalk.green(`Loading blueprint ${name} from ${file}`));
        let module = require(file);
        return Object.assign(new Blueprint(dir), module, {src: dir});
    }

    install(dest) {
        console.log(chalk.green(`Installing from ${this.src} to ${dest}`));

        let content_dir = path.resolve(this.src, 'files/');
        let files = walk(content_dir);
        for(let file of files) {

            console.log(chalk.yellow(`Copying ${file}`));

            let source_path = path.resolve(content_dir, file);
            let dest_path =  this.destPathFor(dest, file);

            let contents = fs.readFileSync(source_path, 'utf-8');
            let replaced_contents = contents.replace(/<%= name %>/g, dest);
            fs.writeFileSync(dest_path, replaced_contents);
        }

        console.log(chalk.green('Done!'));
    }

    destPathFor(dest_dir, file) {
        let fileName = file;

        if (file in this.filesToRename) {
            fileName = this.filesToRename[file];
        }

        return path.resolve(dest_dir, fileName);
    }
}

Blueprint.filesToRename = [];

module.exports = Blueprint;
