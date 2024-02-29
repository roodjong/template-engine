class TextDrawable {
    constructor(inputID, font, linespacing, color, context, initialX, initialY, initialWidth, initialHeight,
            doDynamicSize = true, fontSize = 10, doCenter=true) {
        const input = document.getElementById(inputID);
        input.addEventListener("input", () => this.setText(input.value));
        input.addEventListener("input", drawTemplate);
        
        this.font = font;
        this.linespacing = linespacing;
        this.color = color;
        this.position = { x: initialX, y: initialY };
        this.size = { width: initialWidth, height: initialHeight };
        this.context = context;
        this.getLineSpacing = () => 0.5
        this.setText(input.value)
        this.doDynamicSize = doDynamicSize
        this.fontSize = fontSize;
        this.doCenter = doCenter;
    }

    calculateFontSize() {
        if(!this.doDynamicSize){
            return;
        }
        let fontSize = 1;
        let numOfLines = this.lines.length;
        while (true) {
            let newFont = `${fontSize}px ${this.font.split('px ')[1]}`;
            this.context.font = newFont;
            let isSmaller = this.lines.every(x => {
                const textMetrics = this.context.measureText(x);
                return textMetrics.width < this.size.width && 
                    (fontSize * (1 + this.getLineSpacing())) * (numOfLines + 0.5) < this.size.height;
            })
            if (isSmaller) {
                fontSize++;
            } else {
                this.fontSize = fontSize - 1;
                return;
            }
        }
    }

    setText( text){
        this.lines = text.split("\n")
        this.calculateFontSize();
    }

    draw(context) {
        let oldBaseline = context.textBaseline ;
        context.textBaseline  = "top";
        context.fillStyle = this.color;
        let newFont = `${this.fontSize}px ${this.font.split('px ')[1]}`;
        context.font = newFont;

        let yPos = this.position.y + this.linespacing * this.fontSize;

        for (let line of this.lines) {
            const textWidth = context.measureText(line).width;
            let xPos = this.position.x;
            if(this.doCenter){
                xPos = this.position.x + ((this.size.width - textWidth) / 2);
            }

            context.fillText(line, xPos, yPos);
            yPos += (this.fontSize + this.fontSize * this.getLineSpacing());
        }
        context.textBaseline  = oldBaseline;
    }

    centerSelfHorizontal(canvas){
        this.position.x = (canvas.width - this.size.width) / 2;
    }
}