'use strict';

let ReactApp = require('react-cli/lib/broccoli/react-app');

let app = new ReactApp({

});

module.exports = app.toTree();
