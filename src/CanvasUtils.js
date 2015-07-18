/*global dessert, troop, sntls, shoeshine */
troop.postpone(shoeshine, 'CanvasUtils', function () {
    "use strict";

    var base = troop.Base,
        self = base.extend();

    /**
     * @class
     * @extends troop.Base
     */
    shoeshine.CanvasUtils = self
        .addMethods(/** @lends shoeshine.CanvasUtils */{
            /**
             * @param {shoeshine.Canvas} canvas
             * @param {string} rgb
             * @returns {shoeshine.CanvasUtils}
             */
            fillWithColor: function (canvas, rgb) {
                var canvasElement = canvas.canvasElement,
                    ctx = canvasElement.getContext('2d');

                ctx.save();
                ctx.fillStyle = rgb;
                ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.restore();

                return this;
            },

            /**
             * @param {shoeshine.Canvas} canvas
             * @param {HTMLElement} imageElement
             * @returns {shoeshine.CanvasUtils}
             */
            setImage: function (canvas, imageElement) {
                var canvasElement = canvas.canvasElement,
                    ctx = canvasElement.getContext('2d');

                ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

                return this;
            }
        });
});
