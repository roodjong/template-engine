const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

const backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
backgroundImage.makeDraggable(canvas);

const topText = new TextBoxDrawable({
    font: "Bebas Neue",
    linespacing: 0.4,
    color: "white",
    backgroundColor: "#C2000B",
    allCaps: true,
    context,
    xPosition: 50,
    yPosition: 1650,
    maxWidth:1940,
    maxHeight:400,
    inputID:"titelText",
    doCenter: true,
    doDynamicSize: false,
    fontSize: 120,
    shadowEnable: true
});
topText.makeDraggable();

const bottomRect = new RectangleDrawable({
    color: "white",
    xPosition: 0,
    yPosition: templateHeight - 300,
    width: templateWidth,
    height: 300
});

const topTextSizeSlider = document.getElementById("titelSize");
topText.setFont(size=topTextSizeSlider.value);
topTextSizeSlider.addEventListener("input", _ => topText.setFont(topTextSizeSlider.value));

const logo = new ImgWrapper("templateImages/AankondigingNieuw/logo140x140.png");
logo.setPosition(templateWidth - 400, templateHeight - 200);

const rood = new TextDrawable({
    font: "BebasNeueSEEB",
    linespacing: 0,
    color: "black",
    xPosition: templateWidth - 400 + 140 + 12.5,
    yPosition: templateHeight - 175,
    text: "ROOD",
    doDynamicSize: false,
    fontSize: 64,
    doCenter: false,
    useDynamicLineHeight: false,
    letterSpacing: 0, context
});

const groepsnaam = new TextDrawable({
    font: "BebasNeue",
    linespacing: 0,
    color: "black",
    allCaps: false,
    context,
    textBaseline: "alphabetic",
    xPosition: templateWidth - 400 + 140 + 12.5 + 2,
    yPosition: templateHeight - 95,
    doDynamicSize: false,
    fontSize: 32,
    doCenter: false,
    text: "socialistische\njongeren",
    useDynamicLineHeight: false
});

// TODO: make ‘groepsnaam’ editable with right sizing
// let groepsnaam = new TextDrawable({font: "BebasNeue", linespacing: 0, color: "black", allCaps : false, context, textBaseline: "alphabetic",
//     xPosition: templateWidth - 400 + 140 + 12.5 + 2, yPosition: templateHeight - 85, doDynamicSize: false, fontSize: 42, doCenter: false, inputID: "groepsnaam", useDynamicLineHeight: false});

// Define layers here
let layers = [
    backgroundImage, 
    bottomRect,
    groepsnaam,
    logo,
    rood,
    topText,
];
