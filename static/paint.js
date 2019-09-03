
var cornflower = "#6495ED";

var mode="line";//brush, curve, rectangle, circle, etc.

var properties = {
    "brush":"circle",
    "width":10,
    "color":"#000000"
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


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

function clearCanvas(color="#ffffff"){
    if(color=="#ffffff"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else{
        drawRect({'top_left':[0, 0], 'bottom_right':[canvas.width, canvas.height]}, color)
    }
}


function drawLine(line,width=1,color="#000000"){
    ctx.beginPath(); 
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(line[0].x,line[0].y);
    ctx.lineTo(line[1].x,line[1].y);
    ctx.stroke();
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

document.getElementById('color_picker').addEventListener('change', function(event){
    properties.color = event.target.value;
});

document.querySelectorAll('input[name="brush"]').forEach(element => {    
    element.addEventListener('change', function(event){    
        properties.brush = document.querySelector('input[name="brush"]:checked').value;
    });
});

document.getElementById('brush_width').addEventListener('change', function(event){
    properties.width = event.target.value;
});

canvas.addEventListener('mousemove', function(event) {
    if(mouseDown){
        
        var mousePos = getMousePos(canvas, event);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //writeMessage(canvas, message);

        if(mode=="brush"){
    
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
            
        if(mode=="line"){

            if(line.begin){

            }

        }

    }
}, false);


  //TODO
  /*
- undo, redo
- better toolbar, copy paint
- shapes
- transparency
- 
  */