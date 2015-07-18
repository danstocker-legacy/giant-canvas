/*global dessert, troop, sntls, shoeshine */
troop.postpone(shoeshine, 'Canvas', function (ns, className) {
    "use strict";

    var base = troop.Base,
        self = base.extend()
            .addTrait(shoeshine.Progenitor)
            .extend(className);

    /**
     * @name shoeshine.Canvas.create
     * @function
     * @returns {shoeshine.Canvas}
     */

    /**
     * @class
     * @extends troop.Base
     * @extends shoeshine.Progenitor
     */
    shoeshine.Canvas = self
        .addPrivateMethods(/** @lends shoeshine.Canvas# */{
            /**
             * @param {shoeshine.Canvas} childCanvas
             * @private
             */
            _drawChildCanvas: function (childCanvas) {
                var ctx = this.canvasElement.getContext('2d');

                ctx.drawImage(childCanvas.canvasElement, 0, 0);
            }
        })
        .addMethods(/** @lends shoeshine.Canvas# */{
            /**
             * @ignore
             */
            init: function () {
                shoeshine.Progenitor.init.call(this);

                this.canvasElement = document.createElement('canvas');
            },

            /**
             * @param {number} width
             * @returns {shoeshine.Canvas}
             */
            setWidth: function (width) {
                this.canvasElement.width = width;
                return this;
            },

            /**
             * @returns {number}
             */
            getWidth: function () {
                return this.canvasElement.width;
            },

            /**
             * @param {number} height
             * @returns {shoeshine.Canvas}
             */
            setHeight: function (height) {
                this.canvasElement.height = height;
                return this;
            },

            /**
             * @returns {number}
             */
            getHeight: function () {
                return this.canvasElement.height;
            },

            /**
             * @returns {shoeshine.Canvas}
             */
            render: function () {
                console.log("rendering canvas");

                this.children
                    .callOnEachItem('render')
                    .passEachItemTo(this._drawChildCanvas, this);

                return this;
            },

            /**
             * @param {string} rgb RGB color in hash notation.
             * @returns {shoeshine.Canvas}
             */
            fillWithColor: function (rgb) {
                var canvasElement = this.canvasElement,
                    ctx = canvasElement.getContext('2d');

                ctx.save();
                ctx.fillStyle = rgb;
                ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                ctx.restore();

                return this;
            }
        });
});
