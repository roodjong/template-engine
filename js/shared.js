const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

function fixLayerIndirection() {
    layers = layers.map(layer => {
        if (typeof layer === 'string') {
            return new ImgWrapper(layer);
        }
        return layer;
    });
    layers.forEach(layer => {
        if(layer instanceof ImgWrapper){
            let width = layer.img.width;
            let height = layer.img.height;
            if (canvas.width < width){
                canvas.width = width;
            }
            if (canvas.height < height){
                canvas.height = height;
            }
        }
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


document.getElementById('imageInput').addEventListener('change', handleImageUpload);
function handleImageUpload(event) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = function (e) {
          backgroundImage.img.src = e.target.result;
          backgroundImage.size.width = backgroundImage.img.width;
          backgroundImage.size.height = backgroundImage.img.height;
          backgroundImage.position.x = 0;
          backgroundImage.position.y = 0;
          drawTemplate();
      };
  
      reader.readAsDataURL(file);
    }
  }

  

document.addEventListener('DOMContentLoaded', onStartup);

function onStartup(){
    fixLayerIndirection();
    drawTemplate();
}