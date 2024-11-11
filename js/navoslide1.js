const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

const backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
backgroundImage.makeDraggable(canvas);

const topText = new TextDrawable({
    font: "OutfitBold",
    linespacing: 0.4,
    color: "white",
    allCaps: true,
    context,
    xPosition: 100,
    yPosition: 100,
    maxWidth: 1600,
    maxHeight: 400,
    inputID: "titelText",
    doCenter: false,
    doDynamicSize: false,
    fontSize: 120,
});
topText.makeDraggable();

const topTextSizeSlider = document.getElementById("titelSize");
topText.setFont(size=topTextSizeSlider.value);
topTextSizeSlider.addEventListener("input", _ => topText.setFont(topTextSizeSlider.value));

const overlay = new ImgWrapper("templateImages/NAVOSlide1/overlay.png");

// Define layers here
let layers = [
    backgroundImage,
    overlay,
    topText,
];
