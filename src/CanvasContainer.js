/*global dessert, troop, sntls, evan, candystore, shoeshine */
troop.postpone(candystore, 'CanvasContainer', function (ns, className) {
    "use strict";

    var base = shoeshine.Widget,
        self = base.extend(className);

    /**
     * @name candystore.CanvasContainer.create
     * @function
     * @returns {candystore.CanvasContainer}
     */

    /**
     * @class
     * @extends shoeshine.Widget
     */
    candystore.CanvasContainer = self
        .addMethods(/** @lends candystore.CanvasContainer# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this.elevateMethods(
                    'reRender',
                    'onBackgroundLoad',
                    'onAttributeChange');

                /**
                 * @type {candystore.Canvas}
                 */
                this.canvas = undefined;

                /**
                 * @type {sntls.Debouncer}
                 */
                this.reRenderDebouncer = this.reRender.toDebouncer();
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
             * @param {candystore.Canvas} canvas
             * @returns {candystore.CanvasContainer}
             */
            setCanvas: function (canvas) {
                var oldCanvas = this.canvas;

                this.canvas = canvas;

                if (oldCanvas) {
                    oldCanvas
                        .unsubscribeFrom(candystore.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                        .unsubscribeFrom(candystore.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);
                }

                canvas
                    .subscribeTo(candystore.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                    .subscribeTo(candystore.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);

                if (this.getElement()) {
                    this.reRender();
                }

                return this;
            },

            /**
             * @param {evan.Event} event
             * @ignore
             */
            onBackgroundLoad: function (event) {
                var link = evan.pushOriginalEvent(event);
                this.reRenderDebouncer.runDebounced(16);
                link.unLink();
            },

            /**
             * @param {evan.Event} event
             * @ignore
             */
            onAttributeChange: function (event) {
                var link = evan.pushOriginalEvent(event);
                this.reRenderDebouncer.runDebounced(16);
                link.unLink();
            }
        });
});
