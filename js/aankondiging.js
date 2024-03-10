const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

let backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
backgroundImage.makeDraggable(canvas);
let topText = new TextDrawable({font: "Bebas Neue", linespacing: 0.2, color: "white", allCaps: true, context:context,
    xPosition: 30, yPosition: 100, maxWidth:1940, maxHeight:400, inputID:"titelText"});
let groepsnaam = new TextDrawable({font: "BebasNeueBook", linespacing: 0, color: "white", allCaps : true, context:context, textBaseline: "alphabetic",
    xPosition: 243, yPosition: 1900, doDynamicSize: false, fontSize: 68, doCenter: false, inputID: "groepsnaam", useDynamicLineHeight: false});
let ROOD = new TextDrawable({font: "Bebas Neue", linespacing: 0, color: "white", allCaps : true, context:context, textBaseline: "alphabetic",
    xPosition: 100, yPosition: 1900, doDynamicSize: false, fontSize: 68, doCenter: false, text: "ROOD", useDynamicLineHeight: false, letterSpacing: 5});
let ondertitel = new TextDrawable({font: "BebasNeueBook", linespacing: 0.2, color: "white", allCaps : true, context:context,
    xPosition: 0, yPosition: 600, maxWidth: 2000, doDynamicSize: false, fontSize: 72.5, inputID: "onderTitel"});
ondertitel.makeDraggable();
ondertitel.lockXPosition();


//Define layers here
let layers = [
    backgroundImage, 
    new ImgWrapper("templateImages/Aankondiging/rechtsMultiply.png", "multiply"), 
    "templateImages/Aankondiging/frame.png", 
    topText,
    groepsnaam,
    ROOD,
    ondertitel
];
