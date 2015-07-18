/*global shoeshine */
(function () {
    "use strict";

    shoeshine.CanvasContainer.create()
        .setCanvas(shoeshine.Canvas.create()
            .setChildName('red')
            .setCanvasAttributes({
                height         : 200,
                width          : 200,
                backgroundColor: '#ff0000'
            })
            .addChild(shoeshine.Canvas.create()
                .setChildName('green')
                .setCanvasAttributes({
                    height         : 100,
                    width          : 100,
                    top            : 10,
                    left           : 20,
                    backgroundColor: '#00ff00'
                })
                .addChild(shoeshine.Canvas.create()
                    .setChildName('blue')
                    .setCanvasAttributes({
                        height         : 50,
                        width          : 50,
                        top            : 'center',
                        left           : 'center',
                        backgroundColor: '#0000ff'
                    }))
            )
            .addChild(shoeshine.Canvas.create()
                .setChildName('teal')
                .setCanvasAttributes({
                    height         : 75,
                    width          : 75,
                    top            : 100,
                    left           : 100,
                    backgroundColor: '#00ffff'
                })
            )
        )
        .renderInto(document.body);
}());
