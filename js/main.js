const canvas = document.querySelector('#draw'); //create canvas
const ctx = canvas.getContext('2d'); //create context so we can draw on it
canvas.width = window.innerWidth; 
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55'; //a color that will be created in css
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
/*ctx.globalCompositeOperation='multiply';*/ //Blend de efeitos interessantes


let isDrawing = false; // flag to draw or not draw
let lastX = 0; // initial draw point
let lastY = 0; // end draw point
let hue = 0; //initial color
let direction = true;

function draw(e) {
    if (!isDrawing) return; // stop the fn from running when there is no mouse down
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath(); //line start from
    ctx.moveTo(lastX, lastY); //line goes to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if (hue >=360) {
        hue = 0;
    }

    if(ctx.lineWidth >=100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }

    if(direction) {
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
// canvas.addEventListener('mouseout', () => isDrawing = false);

// to erase the canvas' context with a button
function cleaner() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
}




// Set up touch events for mobile, etc  - src: http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
let touch = e.touches[0];
let mouseEvent = new MouseEvent("mousedown", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
let mouseEvent = new MouseEvent("mouseup", {});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
let touch = e.touches[0];
let mouseEvent = new MouseEvent("mousemove", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
let rect = canvasDom.getBoundingClientRect();
return {
x: touchEvent.touches[0].clientX - rect.left,
y: touchEvent.touches[0].clientY - rect.top
};
}

// Prevent scrolling when touching the canvas
document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
