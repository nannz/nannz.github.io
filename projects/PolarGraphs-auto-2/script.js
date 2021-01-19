//version log:
//size/radius will change according to sinwave(bad)
//positionX and positionY is changing based on frameRate
//add the gradient color changes, with the transparent bg.
//
//Nan Zhao | nannz @github
//2020.11

//const playButton = document.getElementById('playButton');
var changeThis = 1;
var maximJs = maximilian();
var maxiAudio = new maximJs.maxiAudio();

 maxiAudio.init();
var osc = new maximJs.maxiOsc();
var osc2 = new maximJs.maxiOsc();
var osc3 = new maximJs.maxiOsc();
var drawOutput = new Array(1024);
var drawCentre = new Array(1024);
var counter = 0;

//var canvas = document.getElementById("canvas");
var canvas = document.querySelector("canvas");
var width = window.innerWidth;
var height = window.innerHeight;
var context = canvas.getContext("2d");
canvas.setAttribute("width", width);
canvas.setAttribute("height", height);


// This works out a frequency we can use that matches the buffersize
var bufferFreq=44100/1024;

maxiAudio.play = function(){
    var wave = osc.sinewave(bufferFreq+osc2.sinewave(bufferFreq*changeThis)*osc3.sinewave(0.01)*1000);

    var wave2 = (osc.sawn(bufferFreq) - osc3.sawn(bufferFreq*10.01));
    counter++;
    drawOutput[counter % 1024] = wave;
    drawCentre[counter % 1024] = wave2;
    return wave * 0.00;
}

var positionBaseX = width/2;
var positionBaseY = height/2;
var frameCount = 0;
function draw() {
    context.fillStyle = 'rgba(0,0,0,0.05)';
    context.fillRect(0, 0, width, height);

    var spacing = ((Math.PI * 2) / 1024 );
    var colourSpacing = (255/1024);
    var size = 500;
    var sizeSpacing = size/1024;
    var changingSize = 0.0;
    for (var i = 0; i < 1024; i++) {

        changingSize = drawCentre[i]*sizeSpacing * i;

        positionX = positionBaseX + Math.sin(i*spacing)*i* sizeSpacing *drawCentre[i];
        positionY = positionBaseY + Math.cos(i*spacing)*i* sizeSpacing * drawCentre[i];

        var startPathX = positionBaseX + (Math.cos(i * spacing) * changingSize * drawOutput[i]);
        var startPathY = positionBaseY + (Math.sin(i * spacing) * changingSize * drawOutput[i]);

        context.beginPath();
        context.moveTo(startPathX,startPathY);
        context.lineTo(positionX,positionY);

        context.stroke();
        context.strokeStyle= 'rgba('+ i*colourSpacing + ', 200, 225, 0.1)';
        context.closePath();
    }
    frameCount ++;
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);