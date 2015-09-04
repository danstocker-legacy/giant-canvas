/*global require */
/** @namespace */
var giant = giant || require('giant-namespace');

if (typeof require === 'function') {
    require('giant-asset');
    require('giant-oop');
    require('giant-utils');
    require('giant-data');
    require('giant-event');
    require('giant-templating');
}

/**
 * @function
 * @see http://api.jquery.com
 */
var jQuery = jQuery || require('jquery');

if (typeof window === 'undefined') {
    /**
     * Built-in global window object.
     * @type {Window}
     */
    window = undefined;
}

if (typeof document === 'undefined') {
    /**
     * Built-in global document object.
     * @type {Document}
     */
    document = undefined;
}

/**
 * Native number class.
 * @name Number
 * @class
 */

/**
 * Native string class.
 * @name String
 * @class
 */

/**
 * Native array class.
 * @name Array
 * @class
 */

/**
 * @name giant.Hash
 * @class
 */
