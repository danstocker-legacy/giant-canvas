/*global dessert, troop, sntls, evan, shoeshine */
troop.postpone(shoeshine, 'ColorUtils', function () {
    "use strict";

    var base = troop.Base,
        self = base.extend();

    /**
     * TODO: Add RGB parsing methods.
     * @class
     * @extends troop.Base
     */
    shoeshine.ColorUtils = self
        .addMethods(/** @lends shoeshine.ColorUtils */{
            /**
             * Converts an RGB color value to HSV. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
             * Assumes r, g, and b are contained in the set [0, 255] and
             * returns h, s, and v in the set [0, 1].
             *
             * @see http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
             *
             * @param   {number}  r       The red color value
             * @param   {number}  g       The green color value
             * @param   {number}  b       The blue color value
             *
             * @return  {object}          The HSV representation
             */
            rgbToHsv: function (r, g, b) {
                /*jshint eqeqeq:false */

                r = r / 255;
                g = g / 255;
                b = b / 255;
                var max = Math.max(r, g, b), min = Math.min(r, g, b);
                var h, s;

                var d = max - min;
                s = max == 0 ? 0 : d / max;

                if (max == min) {
                    h = 0; // achromatic
                } else {
                    switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                    }
                    h /= 6;
                }

                return {h: h, s: s, v: max};
            },

            /**
             * Converts an HSV color value to RGB. Conversion formula
             * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
             * Assumes h, s, and v are contained in the set [0, 1] and
             * returns r, g, and b in the set [0, 255].

             * @see http://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
             *
             * @param   {number}  h       The hue
             * @param   {number}  s       The saturation
             * @param   {number}  v       The value
             *
             * @return  {object}           The RGB representation
             */
            hsvToRgb: function (h, s, v) {
                var r, g, b;

                var i = Math.floor(h * 6);
                var f = h * 6 - i;
                var p = v * (1 - s);
                var q = v * (1 - f * s);
                var t = v * (1 - (1 - f) * s);

                switch (i % 6) {
                case 0:
                    r = v;
                    g = t;
                    b = p;
                    break;
                case 1:
                    r = q;
                    g = v;
                    b = p;
                    break;
                case 2:
                    r = p;
                    g = v;
                    b = t;
                    break;
                case 3:
                    r = p;
                    g = q;
                    b = v;
                    break;
                case 4:
                    r = t;
                    g = p;
                    b = v;
                    break;
                case 5:
                    r = v;
                    g = p;
                    b = q;
                    break;
                }

                return {r: r * 255, g: g * 255, b: b * 255};
            }
        });
});
