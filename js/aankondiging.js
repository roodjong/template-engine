
const textInput = document.getElementById("textInput");
const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let backgroundImage = new DraggableResizableObject(document.createElement('img'), 0, 0, 0, 0);
let topText = new TextDrawable("Some test\ntext", "10px Bebas Neue", 0.2, "white", context, 0, 0, 2000, 500);

let layers = [backgroundImage, "frame.png", topText];



document.getElementById('imageInput').addEventListener('change', handleImageUpload);
document.addEventListener('DOMContentLoaded', onStartup);

function onStartup(){
    fixLayerIndirection();

    // Event listeners
    canvas.addEventListener('mousedown', (event) => {
        backgroundImage.startDrag(event);
    });

    document.addEventListener('mousemove', (event) => {
        if (backgroundImage.isDragging) {
            backgroundImage.drag(event);
        }
    });

    document.addEventListener('mouseup', () => {
        backgroundImage.stopDrag();
    });

    backgroundImage.onChange = drawTemplate
    backgroundImage.canvas = canvas;

    //Set up slider to scalar link
    slider = document.getElementById("imageSize");
    backgroundImage.getScale = () => slider.value;
    slider.addEventListener('input', drawTemplate)

    const titelInput = document.getElementById("titelText");
    titelInput.addEventListener("input", x => topText.setText(titelInput.value));
    topText.setText(titelInput.value);
    titelInput.addEventListener("input", drawTemplate);

    drawTemplate();
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



