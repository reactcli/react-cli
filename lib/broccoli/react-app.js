'use strict';

let broccoliSource              = require('broccoli-source'),
    mergeTrees                  = require('broccoli-merge-trees'),
    concat                      = require('broccoli-concat'),
    funnel                      = require('broccoli-funnel'),
    browserify                  = require('broccoli-fast-browserify'),
    extractSourceMaps           = require('broccoli-source-map').extract,
    babelify                    = require('babelify'),
    omit                        = require('lodash.omit'),
    merge                       = require('lodash.merge'),
    findup                      = require('findup'),
    path                        = require('path'),
    appDir                      = broccoliSource.WatchedDir('app'),
    babelOptions                = {
        filterExtensions: ['js', 'jsx', 'es6'],
        browserPolyfill: true
    };

class ReactApp {
    constructor(options) {
        this.options = options;
    }

    index() {
        return funnel('app/static', {
            files: ['index.html'],
            annotation: 'Funnel: index.html'
        });
    }

    appJavascript(thirdPartyDeps) {
        let appJs = funnel('app', {
            include: ['**/*.jsx', '**/*.js']
        });

        appJs = browserify(appJs, {
            browserify: {
                debug: true,
                extensions: ['.js', '.jsx']
            },
            bundles: {
                'scripts/app.js': {
                    transform: [
                        [babelify, {
                            presets: ['es2015', 'react']
                        }]
                    ],
                    entryPoints: ['index.jsx'],
                    externals: thirdPartyDeps
                }
            }
        });

        appJs = extractSourceMaps(appJs);

        return appJs;
    }

    vendorJavascript(thirdPartyDeps) {
        let vendorJs = browserify('node_modules', {
            browserify: {
                debug: false
            },
            bundles: {
                'scripts/vendor.js': {
                    entryPoints: [],
                    require: thirdPartyDeps
                }
            }
        });

        return vendorJs;
    }

    allJavascript() {
        let packagesPath = this.getPackagePath(),
            packages = require(packagesPath),
            thirdPartyKeys = Object.keys(packages.dependencies || {});

        return mergeTrees([this.vendorJavascript(thirdPartyKeys), this.appJavascript(thirdPartyKeys)]);
    }

    toTree() {
        return mergeTrees([
            this.allJavascript(),
            this.index()
        ]);
    }

    getPackagePath() {
        let directory = findup.sync(process.cwd(), 'package.json');
        return path.join(directory, 'package.json');
    }
}

module.exports = ReactApp;
