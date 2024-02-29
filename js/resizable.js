class DraggableResizableObject {
    constructor(canvas, img, initialX, initialY, initialWidth, initialHeight) {
        
        // Event listeners
        canvas.addEventListener('mousedown', (event) => {
            this.startDrag(event);
        });

        document.addEventListener('mousemove', (event) => {
            if (this.isDragging) {
                this.drag(event);
            }
        });

        document.addEventListener('mouseup', () => {
            this.stopDrag();
        });
        
        this.position = { x: initialX, y: initialY };
        this.size = { width: initialWidth, height: initialHeight };
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.img = img;
        this.onChange = x => {}
        this.getScale = () => 1.0;
        this.canvas = null;
    }

    draw(context) {
        context.drawImage(this.img, this.position.x, this.position.y, this.size.width * this.getScale(), this.size.height * this.getScale());
    }

    startDrag(event) {
        this.isDragging = true;
        this.dragStart = { x: event.clientX, y: event.clientY };
    }

    stopDrag() {
        this.isDragging = false;
    }

    drag(event) {
        let xScale = this.canvas.width/this.canvas.offsetWidth;
        let yScale = this.canvas.height/this.canvas.offsetHeight;

        if (this.isDragging) {
            const deltaX = event.clientX - this.dragStart.x;
            const deltaY = event.clientY - this.dragStart.y;
            this.position.x += deltaX * xScale;
            this.position.y += deltaY * yScale;
            this.dragStart = { x: event.clientX, y: event.clientY };
            this.onChange();
            console.log("drag");
        }
    }

    setScale(factor) {
        this.scaleFactor = factor;
        this.onChange();
    }
}