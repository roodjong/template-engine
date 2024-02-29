class TextDrawable {
    constructor(inputID, font, linespacing, color, context, initialX, initialY, initialWidth, initialHeight) {
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
    }

    calculateFontSize() {
        let fontSize = 1;
        let numOfLines = this.lines.length;
        while (true) {
            this.context.font = `${fontSize}px ${this.font.split('px ')[1]}`;
            let isSmaller = this.lines.every(x => {
                const textMetrics = this.context.measureText(x);
                return textMetrics.width < this.size.width && 
                    (fontSize * (1 + this.getLineSpacing())) * (numOfLines + 0.5) < this.size.height;
            })
            if (isSmaller) {
                fontSize++;
            } else {
                return fontSize - 1;
            }
        }
    }

    setText( text){
        this.lines = text.split("\n")
        this.fontSize = this.calculateFontSize();
    }

    draw(context) {
        let oldBaseline = context.textBaseline ;
        context.textBaseline  = "top";
        context.fillStyle = this.color;
        context.font = `${this.fontSize}px ${this.font.split('px ')[1]}`;

        let yPos = this.position.y + this.linespacing * this.fontSize;

        for (let line of this.lines) {
            const textWidth = context.measureText(line).width;
            let xPos = this.position.x + ((this.size.width - textWidth) / 2);

            context.fillText(line, xPos, yPos);
            yPos += (this.fontSize + this.fontSize * this.getLineSpacing());
        }
        context.textBaseline  = oldBaseline;
    }

    centerSelfHorizontal(canvas){
        this.position.x = (canvas.width - this.size.width) / 2;
    }
}