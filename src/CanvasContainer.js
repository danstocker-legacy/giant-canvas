/*global giant */
giant.postpone(giant, 'CanvasContainer', function (ns, className) {
    "use strict";

    var base = giant.Widget,
        self = base.extend(className);

    /**
     * @name giant.CanvasContainer.create
     * @function
     * @returns {giant.CanvasContainer}
     */

    /**
     * @class
     * @extends giant.Widget
     */
    giant.CanvasContainer = self
        .addMethods(/** @lends giant.CanvasContainer# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this.elevateMethods(
                    'reRender',
                    'onBackgroundLoad',
                    'onAttributeChange');

                /**
                 * @type {giant.Canvas}
                 */
                this.canvas = undefined;

                /**
                 * @type {giant.Debouncer}
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
             * @param {giant.Canvas} canvas
             * @returns {giant.CanvasContainer}
             */
            setCanvas: function (canvas) {
                var oldCanvas = this.canvas;

                this.canvas = canvas;

                if (oldCanvas) {
                    oldCanvas
                        .unsubscribeFrom(giant.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                        .unsubscribeFrom(giant.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);
                }

                canvas
                    .subscribeTo(giant.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                    .subscribeTo(giant.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);

                if (this.getElement()) {
                    this.reRender();
                }

                return this;
            },

            /**
             * @param {giant.Event} event
             * @ignore
             */
            onBackgroundLoad: function (event) {
                var link = giant.pushOriginalEvent(event);
                this.reRenderDebouncer.runDebounced(16);
                link.unLink();
            },

            /**
             * @param {giant.Event} event
             * @ignore
             */
            onAttributeChange: function (event) {
                var link = giant.pushOriginalEvent(event);
                this.reRenderDebouncer.runDebounced(16);
                link.unLink();
            }
        });
});
