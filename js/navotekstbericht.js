const templateWidth = 2000;
const templateHeight = 2000;
canvas.width = templateWidth;
canvas.height = templateHeight;

const topText = new TextDrawable({
    font: "OutfitBold",
    linespacing: 0.4,
    color: "#2970A9",
    allCaps: true,
    context,
    xPosition: 120,
    yPosition: 700,
    maxWidth: 1940,
    maxHeight: 400,
    inputID: "titelText",
    doCenter: false,
    doDynamicSize: false,
    fontSize: 90,
});
topText.lockXPosition();
topText.makeDraggable();

const callToAction = new TextDrawable({
    font: "OutfitBold",
    linespacing: 0.4,
    color: "#2970A9",
    allCaps: false,
    context,
    xPosition: 1030,
    yPosition: 1400,
    maxWidth: 1940,
    maxHeight: 400,
    inputID: "callToAction",
    doCenter: false,
    doDynamicSize: false,
    fontSize: 90,
    shadowEnable: true,
    shadowOpacity: 0.4
});
callToAction.lockXPosition();
callToAction.makeDraggable();

const background = new ImgWrapper("templateImages/NAVOTekstbericht/background.png");

const messageTextLeft = new JustifiedTextDrawable({
    font: "BarlowMedium",
    linespacing: 0.3,
    color: "#060606",
    context,
    xPosition: 120,
    yPosition: 850,
    maxWidth: 1000-150,
    fontSize: 60,
    inputID: "oproepTekstLinks",
    doCenter: false
});
messageTextLeft.lockXPosition();
messageTextLeft.makeDraggable();

const messageTextRight = new JustifiedTextDrawable({
    font: "BarlowMedium",
    linespacing: 0.3,
    color: "#060606",
    context,
    xPosition: 1030,
    yPosition: 850,
    maxWidth: 1000-150,
    fontSize: 60,
    inputID: "oproepTekstRechts",
    doCenter: false
});
messageTextRight.lockXPosition();
messageTextRight.makeDraggable();

// Define layers here
let layers = [
    background,
    topText,
    callToAction,
    messageTextLeft,
    messageTextRight,
];
