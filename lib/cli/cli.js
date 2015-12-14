'use strict';

let rsvp = require('rsvp');

module.exports = class CLI {
    constructor(options) {

    }

    run(environment) {
        rsvp.hash(environment || {}).then(environment => {
            console.log(environment);
            console.log("I'm running!");
        });
    }
};
