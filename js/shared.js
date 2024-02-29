function fixLayerIndirection() {
    layers = layers.map(layer => {
        if (typeof layer === 'string') {
            const img = new Image();
            img.src = layer;
            let width = img.width;
            let height = img.height;
            if (canvas.width < width){
                canvas.width = width;
            }
            if (canvas.height < height){
                canvas.height = height;
            }
            return img;
        }
        return layer;
    });
}

function drawTemplate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    layers.forEach(item => {
        if (item instanceof HTMLImageElement) {
            context.drawImage(item, 0, 0, item.width, item.height);
        } else {
            item.draw(context);
        }
    });
}


function download(template_name) {
    let dataURL = canvas.toDataURL('image/png');

    // Create a link element
    let link = document.createElement('a');
    link.href = dataURL;
    link.download = template_name + '.png';

    // Trigger a click on the link to start the download
    link.click();
}