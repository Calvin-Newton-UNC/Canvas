var data_ /* not yet used */ = {
    "polyline":[
        [10,10],[100,100]
    ],
    "circle":{
        "center":[100,100],
        "radius":50
    },
    "region":[
        [0,0],[100,0],[100,100],[0,100]  
    ],
    "rect":{
        "top_left":[50,50],
        "bottom_right":[150,150]
    },
    "background":"0xff0000ff"
};

var data2 = [
    {   
        "type":"circle",
        "center":{"x":125,"y":125},
        "radius":25
    },   
    {
        "type":"line",
        "p1":{"x":0,"y":0},
        "p2":{"x":400,"y":400}

    },
    {
        "type":"rect",
        "top_left":[50,50],
        "bottom_right":[100,100]
    },    
    {
        "type":"rect",
        "top_left":[150,50],
        "bottom_right":[200,100]
    },    
    {
        "type":"rect",
        "top_left":[50,150],
        "bottom_right":[100,200]
    },    
    {
        "type":"rect",
        "top_left":[150,150],
        "bottom_right":[200,200]
    }
];

var shapes=[];

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function draw(data){
    for (let shape of data) {
        switch (shape.type) {
            case "rect":
                drawRect(shape);
                break;      
            case "circle":
                drawCircle(shape);                
                break;  
            case "line":
                drawLine(shape);
                break;    
            default:
                break;
        }
    }
}

function drawRect(rect,color="#000000"){
    ctx.fillStyle = color;
    ctx.fillRect(rect.top_left[0],rect.top_left[1],rect.bottom_right[0]-rect.top_left[0],rect.bottom_right[1]-rect.top_left[1]);
}

function drawCircle(circle){

    var circlePath= new Path2D();
    circlePath.arc(circle.center.x, circle.center.y, circle.radius, 0, 2*Math.PI);
    ctx.fill(circlePath);

}

function drawPolygon(){

}

function drawLine(line){
    ctx.beginPath();
    ctx.moveTo(line.p1.x,line.p1.y);
    ctx.lineTo(line.p2.x,line.p2.y);
    ctx.stroke();
}

function drawEllipse(ellipse){


}

function drawArc(arc){

}

function drawText(){

}

function drawBezier(bezier){

}

function drawImage(image){

}

function getData2(){

    const request = new Request('http://127.0.0.1:5000/api/data');
    
    const URL = request.url;
    const method = request.method;
    const credentials = request.credentials;
    
    fetch(request)
    .then(response => {
        if (response.status === 200) {
            var data = response.json();
            draw(data);
        } else {
            throw new Error('Something went wrong on api server!');
        }
    });

}

function getData(){

    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = requestHandler;
    httpRequest.open('GET', 'http://127.0.0.1:5000/api/data');
    httpRequest.send();

    function requestHandler() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                data = JSON.parse(httpRequest.responseText);
                draw(data);
                document.addEventListener("mousemove", mouseMoveHandler, false);
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
}

function intersects(point, rectangle){
    return point.x > rectangle.top_left[0]     && point.y > rectangle.top_left[1] &&
           point.x < rectangle.bottom_right[0] && point.y < rectangle.bottom_right[1];
}

getData();


function mouseMoveHandler(e){
    console.log('('+e.clientX+','+e.clientY+')');

    
    for (let shape of data) {
        switch (shape.type) {
            case "rect":    

                /*
                chacnge rects to red on hover
                if(intersects({"x":e.clientX,"y":e.clientY},shape)){
                    console.log('intersects');
                    drawRect(shape,color="#FF0000");
                }
                */

                break;      
            case "circle":
                              
                break;  
            case "line":

                break;    
            default:
                break;
        }
    }

}

/*
main(){

}

setInterval(main, 16);
*/

/*  Features

    panning
    zooming
    
    draw
        point
        dependency object
        linestring


*/