/*global shoeshine */
(function () {
    "use strict";

    var red = shoeshine.Canvas.create()
            .setChildName('red')
            .setCanvasAttributes({
                height         : 200,
                width          : 200,
                backgroundColor: '#ff0000'
            }),
        green = shoeshine.Canvas.create()
            .setChildName('green')
            .setCanvasAttributes({
                height         : 100,
                width          : 100,
                top            : 10,
                left           : 20,
                backgroundColor: '#00ff00',
                backgroundImage: 'logo.png'
            }),
        blue = shoeshine.Canvas.create()
            .setChildName('blue')
            .setCanvasAttributes({
                height         : 50,
                width          : 50,
                top            : 'center',
                left           : 'center',
                backgroundColor: '#0000ff'
            }),
        teal = shoeshine.Canvas.create()
            .setChildName('teal')
            .setCanvasAttributes({
                height         : 75,
                width          : 75,
                top            : 100,
                left           : 100,
                backgroundColor: '#00ffff'
            });

    shoeshine.CanvasContainer.create()
        .renderInto(document.body)
        .setCanvas(red
            .addChild(green)
            .addChild(teal));

    green
        .addChild(blue)
        .setCanvasAttributes({
            height: 200
        });
}());
