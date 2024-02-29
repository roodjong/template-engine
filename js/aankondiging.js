let backgroundImage = new DraggableResizableObject(canvas, "imageSize", document.createElement('img'), 0, 0, 0, 0);
let topText = new TextDrawable("titelText", "10px Bebas Neue", 0.2, "white", context, 0, 0, 2000, 500);

//Define layers here
let layers = [backgroundImage, "templateImages/Aankondiging/frame.png", topText];
