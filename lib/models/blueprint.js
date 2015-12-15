'use strict'

let fs      = require('fs'),
    path    = require('path'),
    chalk   = require('chalk'),
    walk  = require('walk-sync');

module.exports = class Blueprint {

    constructor(src) {
        this.src = src;
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
            let dest_path =  path.resolve(dest, file);

            let contents = fs.readFileSync(source_path, 'utf-8');
            let replaced_contents = contents.replace(/<%= name %>/g, dest);
            fs.writeFileSync(dest_path, replaced_contents);
        }

        console.log(chalk.green('Done!'));
    }
}
