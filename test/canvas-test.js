(function () {
    "use strict";

    var canvasContainer = $canvas.CanvasContainer.create()
        .renderInto(document.body)
        .setCanvas($canvas.Canvas.create()
            .setChildName('red')
            .setCanvasAttributes({
                width          : 300,
                height         : 300,
                backgroundColor: '#ff0000'
            })
            .addChild($canvas.Canvas.create()
                .setChildName('green')
                .setCanvasAttributes({
                    width          : 100,
                    height         : 100,
                    childWidth     : '30%',
                    top            : 10,
                    left           : 20,
                    backgroundColor: '#00ff00',
                    backgroundImage: 'logo.png',
                    overlayColor   : [255, 0, 0],
                    overlayAlpha   : 0.2
                }))
            .addChild($canvas.Canvas.create()
                .setChildName('teal')
                .setCanvasAttributes({
                    width          : 'background',
                    height         : 'background',
                    childWidth     : 100,
                    top            : 'center',
                    left           : 'center',
                    backgroundColor: '#00ffff'
                })));

    canvasContainer.getCanvasByName('green')
        .getFirstValue()
        .addChild($canvas.Canvas.create()
            .setChildName('blue')
            .setCanvasAttributes({
                width          : '75%',
                height         : '50%',
                top            : '25%',
                left           : 'center',
                backgroundColor: '#0000ff'
            }))
        .setCanvasAttributes({
            height: 150
        });

    setTimeout(function () {
        canvasContainer.getCanvasByName('teal')
            .getFirstValue()
            .setCanvasAttributes({
                hue            : 1.1,
                backgroundImage: 'logo.png'
            });
    }, 200);
}());
