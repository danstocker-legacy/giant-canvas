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
        .addConstants(/** @lends giant.CanvasContainer */{
            /** @constant */
            EVENT_CANVAS_UPDATE: 'canvas-update'
        })
        .addPrivateMethods(/** @lends giant.CanvasContainer# */{
            /** @private */
            _updateCanvas: function () {
                var canvas = this.canvas,
                    element = this.getElement(),
                    canvasElement = canvas && canvas.canvasElement;

                if (canvas && element) {
                    canvasElement.width = element.clientWidth;
                    canvasElement.height = element.clientHeight;
                    canvas.render();
                    element.appendChild(canvasElement);

                    this.triggerSync(this.EVENT_CANVAS_UPDATE);
                }
            }
        })
        .addMethods(/** @lends giant.CanvasContainer# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this.elevateMethods(
                    '_updateCanvas',
                    'onBackgroundLoad',
                    'onAttributeChange');

                /**
                 * @type {giant.Canvas}
                 */
                this.canvas = undefined;

                /**
                 * @type {giant.Debouncer}
                 */
                this.updateCanvasDebouncer = this._updateCanvas.toDebouncer();
            },

            /** @ignore */
            afterRender: function () {
                base.afterRender.call(this);
                this._updateCanvas();
            },

            /**
             * Sets the Canvas instance that will manifest in the DOM.
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

                this._updateCanvas();

                return this;
            },

            /**
             * Retrieves a list of Canvas instances inside the current container matching the specified name.
             * @param {string} canvasName
             * @returns {giant.Collection}
             */
            getCanvasByName: function (canvasName) {
                giant.isString(canvasName, "Invalid canvas name");

                var canvas = this.canvas;

                return canvas ?
                    canvas.getAllDescendants()
                        .filterBySelector(function (canvas) {
                            return canvas.childName === canvasName;
                        }) :
                    giant.Collection.create();
            },

            /**
             * @ignore
             */
            onBackgroundLoad: function () {
                return this.updateCanvasDebouncer.runDebounced(16);
            },

            /**
             * @ignore
             */
            onAttributeChange: function () {
                return this.updateCanvasDebouncer.runDebounced(16);
            }
        });
});
