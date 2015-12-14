#! /usr/bin/env node --harmony
'use strict';

let cli         = require('../lib/cli'),
    resolve     = require('resolve'),
    exit        = require('exit');

process.title = 'react';

resolve('react-cli', {
    basedir: process.cwd()
}, (error, localCli) => {
    let cli;

    if (error) {
        cli = require('../lib/cli');
    } else {
        cli = require(localCli);
    }
});

cli({
    args: process.argv.slice(2)
});
