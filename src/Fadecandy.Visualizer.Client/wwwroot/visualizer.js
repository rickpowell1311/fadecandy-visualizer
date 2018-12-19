window.fadecandyVisualiser = {

    two: null,
    circles: null,
    isConfigured: false,

    logMessage: function (message) {
        alert(message);
    },

    configure: function (elementId, width, height, numberOfPixels) {

        if (this.isConfigured) {
            return;
        }

        var elem = document.getElementById(elementId);
        var params = { width: width, height: height };
        this.two = new Two(params).appendTo(elem);

        // two has convenience methods to create shapes.
        this.circles = [];

        for (var i = 0; i < numberOfPixels; i++) {

            // TODO: Calculate size
            circle = two.makeCircle((i + 1) * 25, 24, 12);
            circle.fill = 'rgb(0, 0, 0)';
            this.circles.push(circle);
            circle.noStroke();
        }

        this.isConfigured = true;
        this.two.update();
    },

    update: function (data) {
        length: null;

        if (data.length / 3 >= this.circles.length) {
            length = this.circles.length;
        }
        else {
            length = data.length;
        }

        for (var i = 0; i < length * 3; i = i + 3) {
            this.circles[i/3].fill = 'rgb(' + data[i] + ', ' + data[i + 1] + ', ' + data[i + 2] + ')';
        }

        this.two.update();
    },

    listen: function () {
        var websocket = new WebSocket("ws://localhost:7891");
        websocket.binaryType = "arraybuffer";
        websocket.onmessage = function (event) {
            var uintArray = new Uint8Array(event.data);

            var data = [];
            for (var i = 0; i < uintArray.length; i++) {
                data[i] = uintArray[i];
            }

            DotNet.invokeMethodAsync('Fadecandy.Visualizer.Client', 'OnDataReceived', JSON.stringify(data));
        };
    }
};

