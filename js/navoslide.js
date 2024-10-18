const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

const backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
backgroundImage.makeDraggable(canvas);

const overlay = new ImgWrapper("templateImages/NAVOSlide/overlay.png");

// Define layers here
let layers = [
    backgroundImage, 
    overlay,
];
