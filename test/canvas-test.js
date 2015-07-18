/*global shoeshine */
(function () {
    "use strict";

    shoeshine.CanvasContainer.create()
        .setCanvas(shoeshine.Canvas.create()
            .setWidth(200)
            .setHeight(200)
            .fillWithColor('#ff0000')
            .addChild(shoeshine.Canvas.create()
                .setWidth(100)
                .setHeight(100)
                .fillWithColor('#00ff00')))
        .renderInto(document.body);
}());
