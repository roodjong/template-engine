let topText = new TextDrawable({font: "Bebas Neue", linespacing: 0.2, color: "rgb(194, 0, 10)", context: context, 
    xPosition: 30, yPosition: 95, maxWidth:1940, maxHeight:310, inputID:"titelText"});
let groepsnaam = new TextDrawable({font: "BebasNeueBook", linespacing: 0, color: "white", allCaps : true, context: context,
    xPosition: 243, yPosition: 1843, doDynamicSize: false, fontSize: 70.5, doCenter: false, inputID: "groepsnaam"});
let oproepTekst = new TextDrawable({font: "BebasNeueSEEB", linespacing: 0.5, color: "black", context: context,
xPosition: 50, yPosition: 600, maxWidth: 1890, doDynamicSize: false, fontSize: 75, inputID: "oproepTekst"})
document.addEventListener("DOMContentLoaded", ()=>oproepTekst.centerSelfHorizontal(canvas))



//Define layers here
let layers = [
    "templateImages/Tekstbericht/frame.png", 
    topText,
    groepsnaam,
    oproepTekst
];
