const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

const background = new ImgWrapper("templateImages/NAVOEvenement/background.png");

const topText = new TextDrawable({
    font: "OutfitBold",
    linespacing: 0.4,
    color: "white",
    allCaps: true,
    context,
    xPosition: 200,
    yPosition: 1000,
    maxWidth: 1940,
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

const subtitle = new TextDrawable({
    font: "OutfitBold",
    linespacing: 0.4,
    color: "#2970A9",
    allCaps: true,
    context,
    xPosition: 900,
    yPosition: 1800,
    maxWidth: 1940,
    maxHeight: 400,
    inputID: "ondertitel",
    doCenter: false,
    doDynamicSize: false,
    fontSize: 120,
});
subtitle.makeDraggable();

const subtitleSizeSlider = document.getElementById("subtitleSize");
subtitle.setFont(size=subtitleSizeSlider.value);
subtitleSizeSlider.addEventListener("input", _ => subtitle.setFont(subtitleSizeSlider.value));

const infoText = new TextDrawable({
    font: "OutfitBold",
    linespacing: 0.4,
    color: "#2970A9",
    allCaps: true,
    context,
    xPosition: 1000,
    yPosition: 1700,
    maxWidth: 1940,
    maxHeight: 400,
    inputID: "infoText",
    doCenter: false,
    doDynamicSize: false,
    fontSize: 80,
});
infoText.makeDraggable();

const infoTextSizeSlider = document.getElementById("infoTextSize");
infoText.setFont(size=infoTextSizeSlider.value);
infoTextSizeSlider.addEventListener("input", _ => infoText.setFont(infoTextSizeSlider.value));

// Define layers here
let layers = [
    background, 
    topText,
    subtitle,
    infoText,
];
