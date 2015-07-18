/*global dessert, troop, sntls, evan, shoeshine */
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

                this.elevateMethods(
                    'reRender',
                    'onBackgroundLoad',
                    'onAttributeChange');

                /**
                 * @type {shoeshine.Canvas}
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
             * @param {shoeshine.Canvas} canvas
             * @returns {shoeshine.CanvasContainer}
             */
            setCanvas: function (canvas) {
                var oldCanvas = this.canvas;

                this.canvas = canvas;

                if (oldCanvas) {
                    oldCanvas
                        .unsubscribeFrom(shoeshine.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                        .unsubscribeFrom(shoeshine.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);
                }

                canvas
                    .subscribeTo(shoeshine.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                    .subscribeTo(shoeshine.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);

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
