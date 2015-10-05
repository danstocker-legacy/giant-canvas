$oop.postpone($canvas, 'UnitUtils', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @class
     * @extends $oop.Base
     */
    $canvas.UnitUtils = self
        .addConstants(/** @lends $canvas.UnitUtils */{
            /**
             * @type {RegExp}
             * @constant
             */
            RE_PERCENTAGE: /^\s*(\d+(?:\.\d+)?)%\s*$/
        })
        .addMethods(/** @lends $canvas.UnitUtils# */{
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
