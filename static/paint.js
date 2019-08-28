
var cornflower = "#6495ED";

var properties = {
    "brush":"circle",
    "width":10,
    "color":"#000000"
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const color_picker = document.getElementById('color_picker');

const color_picker = document.getElementById('color_picker');



function writeMessage(canvas, message) {
    var context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left-2, //for border width, TODO: fix
      y: evt.clientY - rect.top-2
    };
  }





function drawRect(rect,color="#000000"){
    ctx.fillStyle = color;
    ctx.fillRect(rect.top_left[0],rect.top_left[1],rect.bottom_right[0]-rect.top_left[0],rect.bottom_right[1]-rect.top_left[1]);
}

function drawCircle(circle,color="#000000"){

    ctx.fillStyle = color;
    var circlePath= new Path2D();
    circlePath.arc(circle.center.x, circle.center.y, circle.radius, 0, 2*Math.PI);
    ctx.fill(circlePath);

}

var mouseDown = 0;

canvas.addEventListener('mousedown', function(evt) {
    mouseDown = 1;
});

canvas.addEventListener('mouseup', function(evt) {
    mouseDown = 0;
});

color_picker.addEventListener('change', function(event){
    properties.color = event.target.value;
});

color_picker.addEventListener('change', function(event){
    properties.color = event.target.value;
});

canvas.addEventListener('mousemove', function(event) {
    if(mouseDown){
        var mousePos = getMousePos(canvas, event);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //writeMessage(canvas, message);

        switch (properties.brush) {
            case "circle":                       
                drawCircle({
                    "center": {"x":mousePos.x, "y":mousePos.y},
                    "radius": properties.width/2,
                },properties.color);
                break;

            case "square":                    
                drawRect({
                    "top_left": [mousePos.x-properties.width/2,
                                mousePos.y-properties.width/2],
                    "bottom_right": [mousePos.x+properties.width/2,
                                    mousePos.y+properties.width/2]
                },properties.color);
                break;        
            default:
                console.error("no brush type for "+properties.brush);
                break;
        }

    }
  }, false);