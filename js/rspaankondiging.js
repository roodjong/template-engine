const heightToWidthRatio = 5/4;

const templateWidth = 2000;
const templateHeight = heightToWidthRatio * templateWidth;
canvas.width = templateWidth;
canvas.height = templateHeight;

let backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
backgroundImage.makeDraggable(canvas);
let toptitel = new TextDrawable({font: "LibreFranklinItalic", linespacing: 0, color: "white", allCaps: true, context:context,
    xPosition: 0, yPosition: 1690, maxWidth:2000, inputID:"topText", fontSize: 85, doDynamicSize: false, fontWeight: "bold"});
let titel = new TextDrawable({font: "LibreFranklin", linespacing: 0.05, color: "white", allCaps: true, context:context, letterSpacing: 5,
    xPosition: 100, yPosition: 2250, maxWidth:1800, maxHeight:230, inputID:"titelText", doBottomYPosition: true, fontWeight: "800",
    doDynamicSize: false, fontSize:145, useDynamicLineHeight: false, textBaseline: "alphabetic"});
let ondertitel = new TextDrawable({font: "LibreFranklin", linespacing: 0.5, color: "white", allCaps: true, context:context,
    xPosition: 100, yPosition: 2250, maxWidth:1800, inputID:"onderTitel", letterSpacing: 10, doDynamicSize: false, fontSize: 75});
let logo = new ImgWrapper("templateImages/RSPAankondiging/RSPlogo580x580.png");
logo.setPosition((templateWidth - 580) / 2, 72.5);
let balkje = new ImgWrapper("templateImages/RSPAankondiging/roodbalkje.png");
balkje.setPosition(0, 500); // 500 for changed aspect ratio

toptitel.lockXPosition();
toptitel.makeDraggable();
titel.lockXPosition();
titel.makeDraggable();
ondertitel.lockXPosition();
ondertitel.makeDraggable();

const shadowColor = "rgb(0, 0, 0, 30%)";
const shadowBlur = 16;
const xOffset = 10;
const yOffset = 10;

logo.setShadow(shadowColor, shadowBlur, xOffset, yOffset);
balkje.setShadow(shadowColor, shadowBlur, xOffset, yOffset);
toptitel.setShadow(shadowColor, shadowBlur, xOffset, yOffset);
titel.setShadow(shadowColor, shadowBlur, xOffset, yOffset);
ondertitel.setShadow(shadowColor, shadowBlur, xOffset, yOffset);

const fade = new ImgWrapper("templateImages/RSPAankondiging/fade.png", "multiply");
fade.setPosition(0, templateHeight - 2000);

//Define layers here
let layers = [
    backgroundImage, 
    fade,
    logo,
    balkje,
    toptitel,
    titel,
    ondertitel
];
