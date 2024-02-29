let backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
let topText = new TextDrawable("titelText", "10px Bebas Neue", 0.2, "white", context, 0, 0, 2000, 500);
let groepsnaam = new TextDrawable("groepsnaam", "10px BebasNeueBook", 0, "blue", context, 243, 1840, 560, 52, false, 72.5, false);

//Define layers here
let layers = [backgroundImage, "templateImages/Aankondiging/frame.png", topText, groepsnaam];
