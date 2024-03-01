let backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
let topText = new TextDrawable({font: "Bebas Neue", linespacing: 0.2, color: "white", allCaps: true, context:context,
    xPosition: 30, yPosition: 100, maxWidth:1940, maxHeight:400, inputID:"titelText"});
let groepsnaam = new TextDrawable({font: "BebasNeueBook", linespacing: 0, color: "white", allCaps : true, context:context,
    xPosition: 243, yPosition: 1843, doDynamicSize: false, fontSize: 70.5, doCenter: false, inputID: "groepsnaam",});
let ondertitel = new TextDrawable({font: "BebasNeueBook", linespacing: 0, color: "white", allCaps : true, context:context,
    xPosition: 0, yPosition: 600, maxWidth: 2000, doDynamicSize: false, fontSize: 72.5, inputID: "onderTitel"});

//Define layers here
let layers = [
    backgroundImage, 
    new ImgWrapper("templateImages/Aankondiging/rechtsMultiply.png", "multiply"), 
    "templateImages/Aankondiging/frame.png", 
    topText,
    groepsnaam,
    ondertitel
];
