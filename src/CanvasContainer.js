/*global dessert, troop, sntls, shoeshine, candystore, app */
troop.postpone(shoeshine, 'CanvasContainer', function (/**shoeshine*/widgets, className) {
    "use strict";

    var base = shoeshine.Widget,
        self = base.extend(className);

    /**
     * @name shoeshine.CanvasContainer.create
     * @function
     * @returns {shoeshine.CanvasContainer}
     */

    /**
     * @class
     * @extends shoeshine.Widget
     */
    shoeshine.CanvasContainer = self
        .addMethods(/** @lends shoeshine.CanvasContainer# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                /**
                 * @type {shoeshine.Canvas}
                 */
                this.canvas = undefined;
            },

            /** @ignore */
            afterRender: function () {
                base.afterRender.call(this);

                var canvas = this.canvas,
                    element = this.getElement();

                if (canvas) {
                    canvas.render();
                    element.appendChild(canvas.canvasElement);
                }
            },

            /**
             * @param {shoeshine.Canvas} canvas
             * @returns {shoeshine.CanvasContainer}
             */
            setCanvas: function (canvas) {
                this.canvas = canvas;

                if (this.getElement()) {
                    this.reRender();
                }

                return this;
            }
        });
});
