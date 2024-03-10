const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

let topText = new TextDrawable({font: "Bebas Neue", linespacing: 0.2, color: "rgb(194, 0, 10)", context: context, 
    xPosition: 30, yPosition: 95, maxWidth:1940, maxHeight:310, inputID:"titelText"});
let groepsnaam = new TextDrawable({font: "BebasNeueBook", linespacing: 0, color: "white", allCaps : true, context:context, textBaseline: "alphabetic",
    xPosition: 243, yPosition: 1900, doDynamicSize: false, fontSize: 68, doCenter: false, inputID: "groepsnaam", useDynamicLineHeight: false});
let ROOD = new TextDrawable({font: "Bebas Neue", linespacing: 0, color: "white", allCaps : true, context:context, textBaseline: "alphabetic",
    xPosition: 100, yPosition: 1900, doDynamicSize: false, fontSize: 68, doCenter: false, text: "ROOD", useDynamicLineHeight: false, letterSpacing: 5});
let oproepTekst = new TextDrawable({font: "BebasNeueSEEB", linespacing: 0.5, color: "black", context: context,
xPosition: 50, yPosition: 600, maxWidth: 1900, doDynamicSize: false, fontSize: 75, inputID: "oproepTekst"})
oproepTekst.lockXPosition();
oproepTekst.makeDraggable();



//Define layers here
let layers = [
    "templateImages/Tekstbericht/frame.png", 
    topText,
    groepsnaam,
    ROOD,
    oproepTekst
];
