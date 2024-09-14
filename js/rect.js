class RectangleDrawable extends abstractLayer {
    constructor({xPosition, yPosition, width, height, color}) {
        super();

        this.color = color;
        this.position = { x: xPosition, y: yPosition };
        this.size = { width, height };
    }

    getPosition() {
        return this.position;
    }

    getVisibleDimensions() {
        return { x: this.position.x, y: this.position.y, width: this.size.width, height: this.size.height };
    }

    setPositionInternal(x, y) {
        this.position = { x, y };
    }

    setColor(color) {
        this.color = color;
    }

    internalDraw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }
}
