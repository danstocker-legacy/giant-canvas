/*global candystore */
(function () {
    "use strict";

    var red = candystore.Canvas.create()
            .setChildName('red')
            .setCanvasAttributes({
                height         : 200,
                width          : 200,
                backgroundColor: '#ff0000'
            }),
        green = candystore.Canvas.create()
            .setChildName('green')
            .setCanvasAttributes({
                height         : 100,
                width          : 100,
                top            : 10,
                left           : 20,
                backgroundColor: '#00ff00',
                backgroundImage: 'logo.png',
                overlayColor   : [255, 0, 0],
                overlayAlpha   : 0.2
            }),
        blue = candystore.Canvas.create()
            .setChildName('blue')
            .setCanvasAttributes({
                height         : 50,
                width          : 50,
                top            : 'center',
                left           : 'center',
                backgroundColor: '#0000ff'
            }),
        teal = candystore.Canvas.create()
            .setChildName('teal')
            .setCanvasAttributes({
                height         : 75,
                width          : 75,
                top            : 100,
                left           : 100,
                backgroundColor: '#00ffff',
                backgroundImage: 'logo.png'
            });

    candystore.CanvasContainer.create()
        .renderInto(document.body)
        .setCanvas(red
            .addChild(green)
            .addChild(teal));

    green
        .addChild(blue)
        .setCanvasAttributes({
            height: 200
        });

    teal.setCanvasAttributes({
        hue: 1.1
    });
}());
