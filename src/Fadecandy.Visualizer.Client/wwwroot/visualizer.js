window.fadecandyVisualiser = {

    two: null,
    circles: null,
    isConfigured: false,

    logMessage: function (message) {
        alert(message);
    },

    configure: function (elementId, width, height, pixelsX, pixelsY) {

        if (this.isConfigured) {
            return;
        }

        var elem = document.getElementById(elementId);
        var params = { width: pixelsX * 30, height: pixelsY *30 };
        this.two = new Two(params).appendTo(elem);

        // two has convenience methods to create shapes.
        this.circles = [];

        for (var i = 1; i <= pixelsY; i++) {
            for (var j = 1; j <= pixelsX; j++) {
                circle = two.makeCircle(j * 25, i * 25, 12);
                circle.fill = 'rgb(0, 0, 0)';
                this.circles.push(circle);
                circle.noStroke();
            }
        }


        //for (var i = 0; i < numberOfPixels; i++) {

            // TODO: Calculate size
            //circle = two.makeCircle((i + 1) * 25, 24, 12);
            //circle.fill = 'rgb(0, 0, 0)';
            //this.circles.push(circle);
            //circle.noStroke();
        //}

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

        for (var i = 0; i < this.circles.length; i++) {
            try {
                this.circles[i].fill = 'rgb(' + data[(i*3)+4] + ', ' + data[(i*3) + 5] + ', ' + data[(i*3)+ 6] + ')';
            } catch(err) {
                alert('bummer');
            }
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

