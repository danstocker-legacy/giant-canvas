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
     * TODO: Make evented. Event path = 'canvas' + lineage.
     * TODO: Trigger events on attribute changes and async operations (esp. image load).
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
            _renderBackground: function () {
                var canvasAttributes = this.canvasAttributes,
                    backgroundColor = canvasAttributes.getItem('backgroundColor');

                if (backgroundColor) {
                    shoeshine.CanvasUtils.fillWithColor(this, backgroundColor);
                }

                if (this.backgroundImageElement) {
                    shoeshine.CanvasUtils.setImage(this, this.backgroundImageElement);
                }
            },

            /**
             * @param {shoeshine.Canvas} childCanvas
             * @private
             */
            _renderChildCanvas: function (childCanvas) {
                var childPosition = childCanvas.getRelativePosition(),
                    childElement = childCanvas.canvasElement,
                    canvasElement = this.canvasElement,
                    ctx = canvasElement.getContext('2d');

                ctx.drawImage(childElement, childPosition.left, childPosition.top);
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

                /**
                 * @type {HTMLElement}
                 */
                this.backgroundImageElement = undefined;
            },

            /**
             * @param {object} canvasAttributes
             * @returns {shoeshine.Canvas}
             */
            setCanvasAttributes: function (canvasAttributes) {
                var that = this,
                    backgroundImage = canvasAttributes.backgroundImage;

                if (backgroundImage !== this.canvasAttributes.getItem('backgroundImage')) {
                    backgroundImage.toImageUrl().loadImage()
                        .then(function (imageUrl, imageElement) {
                            that.backgroundImageElement = imageElement;
                        });
                }

                this.canvasAttributes = this.canvasAttributes.mergeWith(sntls.Collection.create(canvasAttributes));

                return this;
            },

            /**
             * Retrieves the canvas' position relative to the parent Canvas instance.
             * @returns {{top: number, left: number}}
             */
            getRelativePosition: function () {
                var parentElement = this.parent.canvasElement,
                    canvasElement = this.canvasElement,
                    canvasAttributes = this.canvasAttributes,
                    top = canvasAttributes.getItem('top'),
                    left = canvasAttributes.getItem('left');

                return {
                    top : top === 'center' ?
                        (parentElement.height - canvasElement.height) / 2 :
                        top || 0,
                    left: left === 'center' ?
                        (parentElement.width - canvasElement.width) / 2 :
                        left || 0
                };
            },

            /**
             * Retrieves the canvas' position relative to the CanvasContainer.
             * @returns {{top: number, left: number}}
             */
            getAbsolutePosition: function () {
                var result = {
                        top : 0,
                        left: 0
                    },
                    canvas = this,
                    relativePosition;

                while (canvas.parent) {
                    relativePosition = canvas.getRelativePosition();
                    result.top += relativePosition.top;
                    result.left += relativePosition.left;
                    canvas = canvas.parent;
                }

                return result;
            },

            /**
             * @returns {shoeshine.Canvas}
             */
            render: function () {
                console.log("rendering canvas", this.childName);

                this._applyDimensions();
                this._renderBackground();

                this.children
                    .callOnEachItem('render')
                    .passEachItemTo(this._renderChildCanvas, this);

                return this;
            }
        });
});
