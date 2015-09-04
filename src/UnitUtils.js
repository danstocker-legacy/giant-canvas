/*global giant, app */
giant.postpone(giant, 'UnitUtils', function () {
    "use strict";

    var base = giant.Base,
        self = base.extend();

    /**
     * @class
     * @extends giant.Base
     */
    giant.UnitUtils = self
        .addConstants(/** @lends giant.UnitUtils */{
            /**
             * @type {RegExp}
             * @constant
             */
            RE_PERCENTAGE: /^\s*(\d+(?:\.\d+)?)%\s*$/
        })
        .addMethods(/** @lends giant.UnitUtils# */{
            /**
             * @param {string|number} dimension
             * @param {number} parentDimension
             * @returns {number}
             */
            parseDimension: function (dimension, parentDimension) {
                var parsedDimension;
                switch (typeof dimension) {
                case 'string':
                    parsedDimension = this.RE_PERCENTAGE.exec(dimension);
                    return parsedDimension ?
                        parseFloat(parsedDimension[1]) * parentDimension / 100 :
                        undefined;

                case 'number':
                    return dimension;

                default:
                    return undefined;
                }
            }
        });
});
