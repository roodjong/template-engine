
class abstractLayer{
    xIsLocked = false;
    yIsLocked = false;
    isDraggable = false;
    isDragging = false;
    dragStart = {x: 0, y: 0}
    shadowColor = "rgb(0 0 0 / 0%)";
    shadowBlur = 0;
    shadowOffsetX = 0;
    shadowOffsetY = 0;

    //override these three in child classes to enable shared functionality to work properly.
    /**
     * Returns {x, y} of the actual internal position.
     */
    getPosition(){
        throw Error("Not implemented");
    }
    /**
     * Returns {x, y, width, height} of the actually visible to the user area of the layer.
     */
    getVisibleDimentions(){
        throw Error("Not implemented");
    }
    /**
     * Should be overridden to handle the numbers. Locking is already filtered out in the abstract superclass.
     * Sets the actual internal position.
     * @param {number} x 
     * @param {number} y 
     */
    setPositionInternal(x, y){
        throw Error("Not implemented");
    }

    /**
     * Should be overridden. Draws the element.
     * @param {context2d} context 
     */
    internalDraw(context){
        throw Error("Not implemented");
    }

    draw(context){
        context.shadowColor = this.shadowColor;
        context.shadowBlur = this.shadowBlur;
        context.shadowOffsetX = this.shadowOffsetX;
        context.shadowOffsetY = this.shadowOffsetY;
        this.internalDraw(context)
    }

    setPosition(x, y){
        let originalPos = this.getPosition();
        if(this.xIsLocked){
            x = originalPos.x;
        }
        if(this.yIsLocked){
            y = originalPos.y;
        }
        this.setPositionInternal(x, y);
    }
    makeDraggable(canvas){
        this.isDraggable = true;
    }

    /**
     * Locks the y position of the element.
     */
    lockYPosition(){
        this.yIsLocked = true;
    }

    /**
     * Locks the x position of the element.
     */
    lockXPosition(){
        this.xIsLocked = true;
    }

    /**
     * Unlocks the x position of the element.
     */
    unlockXPosition(){
        this.xIsLocked = false;
    }

    startDrag(x, y) {
        if(!this.isDraggable){
            //Not draggable
            return false;
        }
        let dimentions = this.getVisibleDimentions();
        if(x > dimentions.x && x < dimentions.x + dimentions.width && y > dimentions.y && y < dimentions.y + dimentions.height ){
            this.isDragging = true;
            this.dragStart = { x: x, y: y };
            return true;
        }
        //Not selected
        return false;
    }

    stopDrag() {
        this.isDragging = false;
    }

    drag(x, y) {
        if (this.isDragging) {
            const originalPos = this.getPosition();
            const deltaX = x - this.dragStart.x;
            const deltaY = y - this.dragStart.y;
            this.setPosition(originalPos.x + deltaX, originalPos.y + deltaY);
            this.dragStart = { x: x, y: y };
        }
    }

    setShadow(color, blur, xOffset, yOffset){
        this.shadowColor = color;
        this.shadowBlur = blur;
        this.shadowOffsetX = xOffset;
        this.shadowOffsetY = yOffset;
    }
}
