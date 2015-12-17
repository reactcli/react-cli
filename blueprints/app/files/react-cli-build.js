'use strict';

let ReactApp = require('react-cli/lib/broccoli/react-app');

module.exports = function() {
    let app = new ReactApp({

    });

    return app.toTree();
};
