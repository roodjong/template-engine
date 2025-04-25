const heightToWidthRatio = 5/4;

const templateWidth = 2000;
const templateHeight = heightToWidthRatio * templateWidth;
canvas.width = templateWidth;
canvas.height = templateHeight;

const colorSchemes = {
    "white-red": {
        topText: "white",
        topTextBackground: "#C2000B",
        rood: "black",
        groepsnaam: "black",
        background: "white",
        messageText: "black",
        logo: "templateImages/TekstberichtNieuw/logo200x200.png"
    },
    "red-white": {
        topText: "#C2000B",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "#C2000B",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
    "pale-red-white": {
        topText: "#973936",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "#973936",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
    "grey-white": {
        topText: "#222222",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "#222222",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
    "black-white": {
        topText: "black",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "black",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
    "NATO-blue-white": {
        topText: "#003161",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "#003161",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
    "climate-green-white": {
        topText: "#51824f",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "#51824f",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
    "purple-white": {
        topText: "#716185",
        topTextBackground: "white",
        rood: "white",
        groepsnaam: "white",
        background: "#716185",
        messageText: "white",
        logo: "templateImages/TekstberichtNieuw/logowit200x200.png"
    },
};

const topText = new TextBoxDrawable({
    font: "Bebas Neue",
    linespacing: 0.4,
    color: "white",
    backgroundColor: "#C2000B",
    allCaps: true,
    context,
    xPosition: 50,
    yPosition: 300,
    maxWidth: 1940,
    maxHeight: 400,
    inputID: "titelText",
    doCenter: true,
    doDynamicSize: false,
    fontSize: 120,
    shadowEnable: true,
    shadowOpacity: 0.4
});
topText.makeDraggable();

const background = new RectangleDrawable({
    color: "white",
    xPosition: 0,
    yPosition: 0,
    width: templateWidth,
    height: templateHeight
});

const topTextSizeSlider = document.getElementById("titelSize");
topText.setFont(size=topTextSizeSlider.value);
topTextSizeSlider.addEventListener("input", _ => topText.setFont(topTextSizeSlider.value));

const logo = new ImgWrapper("templateImages/TekstberichtNieuw/logo200x200.png");
logo.setPosition(templateWidth - 480, templateHeight - 260);

const rood = new TextDrawable({
    font: "BebasNeueSEEB",
    linespacing: 0,
    color: "black",
    xPosition: templateWidth - 480 + 200 + 18,
    yPosition: templateHeight - 230,
    text: "ROOD",
    doDynamicSize: false,
    fontSize: 90,
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
    xPosition: templateWidth - 480 + 200 + 18 + 2,
    yPosition: templateHeight - 115,
    doDynamicSize: false,
    fontSize: 48,
    doCenter: false,
    text: "socialistische\njongeren",
    useDynamicLineHeight: false
});

const messageText = new JustifiedTextDrawable({
    font: "BebasNeue",
    linespacing: 0.5,
    color: "black",
    context,
    xPosition: 100,
    yPosition: 700,
    maxWidth: 1800,
    fontSize: 80,
    inputID: "oproepTekst",
    doCenter: false
});
messageText.lockXPosition();
messageText.makeDraggable();

const setColorScheme = colorSchemeName => {
    const colorScheme = colorSchemes[colorSchemeName];
    topText.setColor(colorScheme.topText);
    topText.setBackgroundColor(colorScheme.topTextBackground);
    rood.setColor(colorScheme.rood);
    groepsnaam.setColor(colorScheme.groepsnaam);
    background.setColor(colorScheme.background);
    messageText.setColor(colorScheme.messageText);
    logo.setImageSource(colorScheme.logo);
}

const colorSchemeDropdown = document.getElementById("colorScheme");
setColorScheme(colorSchemeDropdown.value);
colorSchemeDropdown.addEventListener("input", _ => setColorScheme(colorSchemeDropdown.value));

// Define layers here
let layers = [
    background,
    groepsnaam,
    logo,
    rood,
    topText,
    messageText,
];
