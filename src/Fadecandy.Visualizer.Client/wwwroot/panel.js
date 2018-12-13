window.demoPanel = {

    listen: function () {
        // Make an instance of two and place it on the page.
        var elem = document.getElementById('panel');
        var params = { width: 285, height: 200 };
        var two = new Two(params).appendTo(elem);

        // two has convenience methods to create shapes.
        var circle = two.makeCircle(72, 100, 50);
        var rect = two.makeRectangle(213, 100, 100, 100);

        // The object returned has many stylable properties:
        circle.fill = 'rgb(0, 0, 0)';
        circle.stroke = 'orangered'; // Accepts all valid css color
        circle.linewidth = 5;

        rect.fill = 'rgb(0, 0, 0)';
        rect.opacity = 0.75;
        rect.noStroke();

        // Don't forget to tell two to render everything
        // to the screen
        two.update();

        var exampleSocket = new WebSocket("ws://localhost:7891");
        exampleSocket.onmessage = function (event) {
            for (var i = 4; i < i + 7; i + 3) {
                var color = 'rgb(' + event.data[i] + ',' + event.data[i + 1] + ',' + event.data[i + 2] + ')';
                circle.fill = color;
                rect.fill = color;
                two.update();
            }
        };
    },

    display: function () {

        // two has convenience methods to create shapes.
        var circle = two.makeCircle(72, 100, 50);
        var rect = two.makeRectangle(213, 100, 100, 100);

        // The object returned has many stylable properties:
        circle.fill = '#FF8000';
        circle.stroke = 'orangered'; // Accepts all valid css color
        circle.linewidth = 5;

        rect.fill = 'rgb(0, 200, 255)';
        rect.opacity = 0.75;
        rect.noStroke();

        // Don't forget to tell two to render everything
        // to the screen
        two.update();
    }
}

