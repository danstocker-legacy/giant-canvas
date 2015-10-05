$oop.postpone($canvas, 'CanvasContainer', function (ns, className) {
    "use strict";

    var base = $widget.Widget,
        self = base.extend(className);

    /**
     * @name $canvas.CanvasContainer.create
     * @function
     * @returns {$canvas.CanvasContainer}
     */

    /**
     * @class
     * @extends $widget.Widget
     */
    $canvas.CanvasContainer = self
        .addConstants(/** @lends $canvas.CanvasContainer */{
            /** @constant */
            EVENT_CANVAS_UPDATE: 'canvas-update'
        })
        .addPrivateMethods(/** @lends $canvas.CanvasContainer# */{
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
        .addMethods(/** @lends $canvas.CanvasContainer# */{
            /** @ignore */
            init: function () {
                base.init.call(this);

                this.elevateMethods(
                    '_updateCanvas',
                    'onBackgroundLoad',
                    'onAttributeChange');

                /**
                 * @type {$canvas.Canvas}
                 */
                this.canvas = undefined;

                /**
                 * @type {$utils.Debouncer}
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
             * @param {$canvas.Canvas} canvas
             * @returns {$canvas.CanvasContainer}
             */
            setCanvas: function (canvas) {
                var oldCanvas = this.canvas;

                this.canvas = canvas;

                if (oldCanvas) {
                    oldCanvas
                        .unsubscribeFrom($canvas.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                        .unsubscribeFrom($canvas.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);
                }

                canvas
                    .subscribeTo($canvas.Canvas.EVENT_BACKGROUND_LOAD, this.onBackgroundLoad)
                    .subscribeTo($canvas.Canvas.EVENT_ATTRIBUTE_CHANGE, this.onAttributeChange);

                this._updateCanvas();

                return this;
            },

            /**
             * Retrieves a list of Canvas instances inside the current container matching the specified name.
             * @param {string} canvasName
             * @returns {$data.Collection}
             */
            getCanvasByName: function (canvasName) {
                $assertion.isString(canvasName, "Invalid canvas name");

                var canvas = this.canvas;

                return canvas ?
                    canvas.getAllDescendants()
                        .filterBySelector(function (canvas) {
                            return canvas.childName === canvasName;
                        }) :
                    $data.Collection.create();
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
