class DraggableResizableObject extends abstractLayer{
    constructor(canvas, imageScalerID, img, initialX, initialY, initialWidth, initialHeight) {
        super();
            
        let slider = document.getElementById(imageScalerID);
        slider.addEventListener('input', drawTemplate)
        
        // // Event listeners
        // canvas.addEventListener('mousedown', (event) => {
        //     this.startDrag(event);
        // });
        // canvas.addEventListener('touchstart', (event) => {
        //     this.startDrag(event);
        // });

        // document.addEventListener('mousemove', (event) => {
        //     if (this.isDragging) {
        //         this.drag(event);
        //     }
        // });
        // document.addEventListener('touchmove', (event) => {
        //     if (this.isDragging) {
        //         this.drag(event);
        //     }
        // });

        // document.addEventListener('mouseup', () => {
        //     this.stopDrag();
        // });
        // document.addEventListener('touchend', () => {
        //     this.stopDrag();
        // });
        
        this.position = { x: initialX, y: initialY };
        this.size = { width: initialWidth, height: initialHeight };
        // this.isDragging = false;
        // this.dragStart = { x: 0, y: 0 };
        this.img = img;
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

    draw(context) {
        context.drawImage(this.img, this.position.x, this.position.y, this.size.width * this.sliderInput.value, this.size.height * this.sliderInput.value);
    }

    // startDrag(event) {
    //     this.isDragging = true;
    //     this.dragStart = { x: event.clientX, y: event.clientY };
    // }

    // stopDrag() {
    //     this.isDragging = false;
    // }

    // drag(event) {
    //     let xScale = this.canvas.width/this.canvas.offsetWidth;
    //     let yScale = this.canvas.height/this.canvas.offsetHeight;

    //     if (this.isDragging) {
    //         const deltaX = event.clientX - this.dragStart.x;
    //         const deltaY = event.clientY - this.dragStart.y;
    //         this.position.x += deltaX * xScale;
    //         this.position.y += deltaY * yScale;
    //         this.dragStart = { x: event.clientX, y: event.clientY };
    //         drawTemplate();
    //     }
    // }

    setScale(factor) {
        this.scaleFactor = factor;
        drawTemplate();
    }
}