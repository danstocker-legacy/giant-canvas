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
            /** @private */
            _applyDimensions: function () {
                var canvasElement = this.canvasElement,
                    canvasAttributes = this.canvasAttributes,
                    width = canvasAttributes.getItem('width'),
                    height = canvasAttributes.getItem('height');

                if (width) {
                    canvasElement.width = width;
                }

                if (height) {
                    canvasElement.height = height;
                }
            },

            /** @private */
            _applyBackground: function () {
                var canvasAttributes = this.canvasAttributes,
                    backgroundColor = canvasAttributes.getItem('backgroundColor');

                if (backgroundColor) {
                    shoeshine.CanvasUtils.fillWithColor(this, backgroundColor);
                }
            },

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

                /**
                 * @type {HTMLElement}
                 */
                this.canvasElement = document.createElement('canvas');

                /**
                 * @type {sntls.Collection}
                 */
                this.canvasAttributes = sntls.Collection.create();
            },

            /**
             * @param {object} canvasAttributes
             * @returns {shoeshine.Canvas}
             */
            setCanvasAttributes: function (canvasAttributes) {
                this.canvasAttributes = this.canvasAttributes.mergeWith(sntls.Collection.create(canvasAttributes));
                return this;
            },

            /**
             * @returns {shoeshine.Canvas}
             */
            render: function () {
                console.log("rendering canvas", this.instanceId);

                this._applyDimensions();
                this._applyBackground();

                this.children
                    .callOnEachItem('render')
                    .passEachItemTo(this._drawChildCanvas, this);

                return this;
            }
        });
});
