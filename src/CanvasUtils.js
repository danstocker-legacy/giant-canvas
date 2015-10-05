$oop.postpone($canvas, 'CanvasUtils', function () {
    "use strict";

    var base = $oop.Base,
        self = base.extend();

    /**
     * @class
     * @extends $oop.Base
     */
    $canvas.CanvasUtils = self
        .addMethods(/** @lends $canvas.CanvasUtils */{
            /**
             * @param {$canvas.Canvas} canvas
             * @param {string} rgb
             */
            fillWithColor: function (canvas, rgb) {
                var canvasElement = canvas.canvasElement,
                    ctx;

                if (canvasElement.width && canvasElement.height) {
                    ctx = canvasElement.getContext('2d');
                    ctx.save();
                    ctx.fillStyle = rgb;
                    ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
                    ctx.restore();
                }
            },

            /**
             * @param {$canvas.Canvas} canvas
             * @param {HTMLElement} imageElement
             */
            drawImage: function (canvas, imageElement) {
                var canvasElement = canvas.canvasElement;

                if (!canvasElement.width || !canvasElement.height) {
                    return;
                }

                var ctx = canvasElement.getContext('2d');

                ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
            },

            /**
             * @param {$canvas.Canvas} canvas
             * @param {number} hue
             */
            makeMonochrome: function (canvas, hue) {
                var canvasElement = canvas.canvasElement;

                if (!canvasElement.width || !canvasElement.height) {
                    return;
                }

                var ctx = canvasElement.getContext('2d'),
                    imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height),
                    imageDataBuffer = imageData.data,
                    hsv, rgb;

                for (var i = 0; i < imageDataBuffer.length; i += 4) {
                    // setting hue to specified value on all pixels
                    hsv = $canvas.ColorUtils.rgbToHsv(imageDataBuffer[i], imageDataBuffer[i + 1], imageDataBuffer[i + 2]);
                    rgb = $canvas.ColorUtils.hsvToRgb(hue, hsv.s, hsv.v);

                    imageDataBuffer[i] = rgb.r;
                    imageDataBuffer[i + 1] = rgb.g;
                    imageDataBuffer[i + 2] = rgb.b;
                }

                ctx.putImageData(imageData, 0, 0);
            },

            /**
             * @param {$canvas.Canvas} canvas
             * @param {number[]} overlayRgb
             * @param {number} alpha
             */
            addColorOverlay: function (canvas, overlayRgb, alpha) {
                var canvasElement = canvas.canvasElement;

                if (!canvasElement.width || !canvasElement.height) {
                    return;
                }

                var ctx = canvasElement.getContext('2d'),
                    imageData = ctx.getImageData(0, 0, canvasElement.width, canvasElement.height),
                    imageDataBuffer = imageData.data;

                for (var i = 0; i < imageDataBuffer.length; i += 4) {
                    imageDataBuffer[i] = alpha * overlayRgb[0] + (1 - alpha) * imageDataBuffer[i];
                    imageDataBuffer[i + 1] = alpha * overlayRgb[1] + (1 - alpha) * imageDataBuffer[i + 1];
                    imageDataBuffer[i + 2] = alpha * overlayRgb[2] + (1 - alpha) * imageDataBuffer[i + 2];
                }

                ctx.putImageData(imageData, 0, 0);
            }
        });
});
