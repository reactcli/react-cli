'use strict';

let chalk   = require('chalk'),
    EOL     = require('os').EOL,
    union   = require('lodash.union'),
    uniq    = require('lodash.uniq'),
    pluck   = require('lodash.pluck'),
    merge   = require('lodash.merge'),
    nopt    = require('nopt');

module.exports = class Command {
    constructor() {
        this.registerOptions();
    }

    registerOptions(options) {
        let extendedOptions = options && options.availableOptions || [],
            extendedParameters = options && options.parameters || [],
            ctor = this.__proto__.constructor;

        this.parameters = union((ctor.parameters || []).slice(0), extendedParameters);
        this.availableOptions = union((ctor.availableOptions || []).slice(0), extendedOptions);
    }

    parseArgs(commandArgs) {
        let opts = this.availableOptions.reduce((hash, o) => {
            hash[o.name] = o.type;
            return hash;
        }, {});

        let aliases = this.availableOptions.reduce((hash, o) => {
            hash[o.name] = o.aliases;
            return hash;
        }, {});

        let defaults = this.availableOptions.reduce((hash, o) => {
            if (typeof o.default === 'undefined' || o.default == null) return hash;
            hash[o.name] = o.default;
            return hash;
        }, {});

        let parsed = nopt(opts, aliases, commandArgs, 0);

        return merge(defaults, parsed);
    }

    validateAndRun(commandArgs) {
        var opts = this.parseArgs(commandArgs);
        return this.run(opts);
    }

    run(commandArgs) {
        throw new Error('command must implement run');
    }

    printBasicHelp() {
        let ctor = this.__proto__.constructor,
            output;

        if (this.isRoot) {
            output = `Usage: ${ctor.nam}`;
        } else {
            output = `react ${ctor.nam}`;
        }

        if (ctor.parameters.length > 0) {
            let parameters = ctor.parameters;

            if (parameters.join) {
                parameters = parameters.join(' ');
            }

            output = `${output} ${chalk.yellow(parameters)}`;
        }

        if (ctor.availableOptions.length > 0) {
            output = `${output} ${chalk.cyan('<options...>')}`;
        }

        output += EOL;

        if (ctor.description) {
            output = `${output}  ${ctor.description}${EOL}`;
        }

        if (ctor.aliases.length > 0) {
            let aliases = chalk.grey(`aliases: ${ctor.aliases.filter(a => a).join(', ')}`);
            output = `${output}  ${aliases}${EOL}`;
        }

        if (ctor.availableOptions.length > 0) {
            ctor.availableOptions.forEach(option => {
                let name = chalk.cyan(`--${option.name}`);
                output = `${output}  ${name}`;

                if (option.type) {
                    let type = Array.isArray(option.type) ?
                        option.type.map(t => typeof t === 'string' ? t : t.name) :
                        option.type.name;

                    type = chalk.cyan(`(${type})`);

                    output = `${output}  ${type}`;
                }

                if (option.required) {
                    output = `${output} ${chalk.cyan('(Required)')}`;
                }

                if (option.default !== undefined) {
                    let dfault = chalk.cyan(`(Default: ${option.default})`);
                    output = `${output} ${dfault}`
                }

                if (option.description) {
                    output = `${output} ${option.description}`;
                }

                if (option.aliases) {
                    let aliases = option.aliases.map(a => {
                        if (typeof a === 'string') {
                            return `- ${a} ${option.type === Boolean ? '' : ' <value>'}`;
                        } else {
                            let key = Object.keys(a)[0];
                            return `- ${key} (--${option.name}=${a[key]}`;
                        }
                    }).join(', ');

                    aliases = chalk.grey(`aliases: ${aliases}`);

                    output = `${output}${EOL}     ${aliases}`;
                }

                output = `${output}${EOL}`;
            });
        }

        console.log(output);
    }

    printDetailedHelp() {

    }
}
