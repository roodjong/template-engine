class DraggableResizableObject extends abstractLayer{
    constructor(canvas, imageScalerID, img, initialX, initialY, initialWidth, initialHeight) {
        super();
            
        let slider = document.getElementById(imageScalerID);
        slider.addEventListener('input', drawTemplate)
        
        this.position = { x: initialX, y: initialY };
        this.size = { width: initialWidth, height: initialHeight };
        this.img = img;
        let self = this;
        this.img.addEventListener("load", () => {
            self.size.width = self.img.width;
            self.size.height = self.img.height;
            self.position.x = 0;
            self.position.y = 0;
            drawTemplate();
        })
        this.sliderInput = slider;
        this.canvas = canvas;
    }
    getPosition(){
        return this.position;
    }
    getVisibleDimentions(){
        return {x:this.position.x, y:this.position.y, width: this.size.width * this.sliderInput.value, height: this.size.height * this.sliderInput.value}
    }
    setPositionInternal(x, y){
        this.position = {x: x, y: y}
    }

    internalDraw(context) {
        context.drawImage(this.img, this.position.x, this.position.y, this.size.width * this.sliderInput.value, this.size.height * this.sliderInput.value);
    }

    setScale(factor) {
        this.scaleFactor = factor;
        drawTemplate();
    }
}