const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

function fixLayerIndirection() {
    layers = layers.map(layer => {
        if (typeof layer === 'string') {
            return new ImgWrapper(layer);
        }
        return layer;
    });
    layers.forEach(layer => {
        if(layer instanceof ImgWrapper){
            let width = layer.img.width;
            let height = layer.img.height;
            if (canvas.width < width){
                canvas.width = width;
            }
            if (canvas.height < height){
                canvas.height = height;
            }
        }
    });
}

function drawTemplate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    layers.forEach(item => {
        if (item instanceof HTMLImageElement) {
            context.drawImage(item, 0, 0, item.width, item.height);
        } else {
            item.draw(context);
        }
    });
}


function download(template_name) {
    let dataURL = canvas.toDataURL('image/png');

    // Create a link element
    let link = document.createElement('a');
    link.href = dataURL;
    link.download = template_name + '.png';

    // Trigger a click on the link to start the download
    link.click();
}

let imgInput = document.getElementById('imageInput');
if(imgInput != null){
    imgInput.addEventListener('change', handleImageUpload);
}
function handleImageUpload(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
          backgroundImage.img.src = e.target.result;
          backgroundImage.size.width = backgroundImage.img.width;
          backgroundImage.size.height = backgroundImage.img.height;
          backgroundImage.position.x = 0;
          backgroundImage.position.y = 0;
          drawTemplate();
      };
  
      reader.readAsDataURL(file);
    }
  }

function getCanvasCoordinates(canvas, clientX, clientY) {
    let rect = canvas.getBoundingClientRect();
    let x = clientX - rect.left;
    let y = clientY - rect.top;
    
    let xScale = this.canvas.width/this.canvas.offsetWidth;
    let yScale = this.canvas.height/this.canvas.offsetHeight;

    return {x: x*xScale, y: y*yScale}
}

function handleDragStart(clientX, clientY){
    const canvasCoords = getCanvasCoordinates(canvas, clientX, clientY);
    //Loop reversed, from top shown layer first when finding drag. Bubble down.
    for (let index = layers.length - 1; index >= 0; index--) {
        const layer = layers[index];
        let acceptedDrag = layer.startDrag(canvasCoords.x, canvasCoords.y);
        if(acceptedDrag){
            //Do not drag multiple items
            return;
        }
    }
}


function handleDragMove(clientX, clientY){
    const canvasCoords = getCanvasCoordinates(canvas, clientX, clientY);
    layers.forEach(x => x.drag(canvasCoords.x, canvasCoords.y));
    drawTemplate();
}

function handleDragEnd(){
    layers.forEach(x => x.stopDrag())
}

function onStartup(){
    fixLayerIndirection();
    drawTemplate();
}

// Event listeners
canvas.addEventListener('mousedown', (event) => {
    handleDragStart(event.clientX, event.clientY);
});
canvas.addEventListener('touchstart', (event) => {
    console.log("Drag with touch!");
    //assume single touches
    touch = event.changedTouches[0];
    handleDragStart(touch.clientX, touch.clientY);
});

document.addEventListener('mousemove', (event) => {
    handleDragMove(event.clientX, event.clientY);
});
document.addEventListener('touchmove', (event) => {
    //assume single touches
    touch = event.changedTouches[0];
    handleDragMove(touch.clientX, touch.clientY);
});

document.addEventListener('mouseup', () => {
    handleDragEnd();
});
document.addEventListener('touchend', () => {
    handleDragEnd();
});

document.addEventListener('DOMContentLoaded', onStartup);
