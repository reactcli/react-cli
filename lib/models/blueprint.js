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
        try {

            let module = require(file);
            return Object.assign(new Blueprint(dir), module, {src: dir});
        }
        catch(e) {
            console.log(chalk.red(`Whoops, I couldn''t find the blueprint ${name}!`));
            return null;
        }
    }

    install(dest, replacements) {
        console.log(chalk.green(`Installing from ${this.src} to ${dest}`));

        let content_dir = path.resolve(this.src, 'files/');
        let files = walk(content_dir);
        for(let file of files) {

            console.log(chalk.yellow(`Copying ${file}`));

            let source_path = path.resolve(content_dir, file);
            let dest_path =  this.destPathFor(dest, file, replacements);
            let contents = fs.readFileSync(source_path, 'utf-8');
            let replaced_contents = this.apply_replacements(contents, replacements);
            fs.writeFileSync(dest_path, replaced_contents);
        }

        console.log(chalk.green('Done!'));
    }

    apply_replacements(string, replacements) {
        return string.replace(/__name__/g, replacements['name']);
    }

    destPathFor(dest_dir, file, replacements) {
        let fileName = file;

        if (file in this.filesToRename) {
            fileName = this.filesToRename[file];
        }

        let destPath = path.resolve(dest_dir, fileName);
        return this.apply_replacements(destPath, replacements);
    }
}

Blueprint.filesToRename = [];

module.exports = Blueprint;
