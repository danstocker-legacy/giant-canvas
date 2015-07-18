/*jshint node:true */
module.exports = function (grunt) {
    "use strict";

    var params = {
        files: [
            'src/namespace.js',
            'src/ColorUtils.js',
            'src/CanvasUtils.js',
            'src/Canvas.js',
            'src/CanvasContainer.js',
            'src/exports.js'
        ],

        test: [
        ],

        globals: {}
    };

    // invoking common grunt process
    require('common-gruntfile')(grunt, params);
};
