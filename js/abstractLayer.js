
class abstractLayer{
    xIsLocked = false;
    yIsLocked = false;
    isDraggable = false;
    isDragging = false;
    dragStart = {x: 0, y: 0}

    //override these three in child classes to enable shared functionality to work properly.
    getPosition(){
        throw Error("Not implemented");
    }
    getVisibleDimentions(){
        throw Error("Not implemented");
    }
    setPositionInternal(x, y){
        throw Error("Not implemented");
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

    lockYPosition(){
        this.yIsLocked = true;
    }

    lockXPosition(){
        this.xIsLocked = true;
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
}