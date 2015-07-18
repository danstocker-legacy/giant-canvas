/*global shoeshine */
(function () {
    "use strict";

    shoeshine.CanvasContainer.create()
        .setCanvas(shoeshine.Canvas.create()
            .setCanvasAttributes({
                height         : 200,
                width          : 200,
                backgroundColor: '#ff0000'
            })
            .addChild(shoeshine.Canvas.create()
                .setCanvasAttributes({
                    height         : 100,
                    width          : 100,
                    backgroundColor: '#00ff00'
                })))
        .renderInto(document.body);
}());
