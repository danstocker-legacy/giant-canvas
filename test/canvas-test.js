/*global giant */
(function () {
    "use strict";

    var red = giant.Canvas.create()
            .setChildName('red')
            .setCanvasAttributes({
                height         : 300,
                width          : 300,
                backgroundColor: '#ff0000'
            }),
        green = giant.Canvas.create()
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
        blue = giant.Canvas.create()
            .setChildName('blue')
            .setCanvasAttributes({
                height         : 50,
                width          : 'parent',
                top            : 'center',
                left           : 'center',
                backgroundColor: '#0000ff'
            }),
        teal = giant.Canvas.create()
            .setChildName('teal')
            .setCanvasAttributes({
                height         : 'background',
                width          : 'background',
                left           : 150,
                backgroundColor: '#00ffff',
                backgroundImage: 'logo.png'
            });

    giant.CanvasContainer.create()
        .renderInto(document.body)
        .setCanvas(red
            .addChild(green)
            .addChild(teal));

    green
        .addChild(blue)
        .setCanvasAttributes({
            height: 150
        });

    teal.setCanvasAttributes({
        hue: 1.1
    });
}());
