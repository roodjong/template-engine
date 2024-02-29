class TextDrawable {
    /**
     * 
     * @param {string} font Font to use
     * @param {number} linespacing Percentage of the line height to vertically space lines between and around
     * @param {string} color Color of the text
     * @param {number} xPosition x position to place the text, topleft
     * @param {number} yPosition y position to place the text, topleft
     * @param {number} maxWidth The maximum width for dynamically sized text
     * @param {number} maxHeight The maximum height for dynamically sized text
     * @param {boolean} doDynamicSize Indicated whether or not to dynamically up or downsize the font to fit (uses max width and height)
     * @param {number} fontSize Font size, if not dynamically sized
     * @param {boolean} doCenter Center the text
     * @param {string} inputID id of the input html element of which to retrieve the text
     * @param {string} text text to display
     */
    constructor({font, linespacing, color, xPosition, yPosition, maxWidth = 0, maxHeight = 0, context,
            doDynamicSize = true, fontSize = 10, doCenter=true, inputID = null, text = null, allCaps = false}) {
                
        this.context = context;
        this.font = fontSize + "px " + font;
        this.linespacing = linespacing;
        this.color = color;
        this.position = { x: xPosition, y: yPosition };
        this.size = { width: maxWidth, height: maxHeight };
        this.lineSpacing = linespacing;
        this.doDynamicSize = doDynamicSize
        this.fontSize = fontSize;
        this.doCenter = doCenter;
        this.allCaps = allCaps;

        this.firstStart = true;//to fix startup order issues

        if(inputID != null){
            if(text != null){
                throw Error("Cant provide both text and an input field.")
            }
            const input = document.getElementById(inputID);
            input.addEventListener("input", () => this.setText(input.value));
            input.addEventListener("input", drawTemplate);
            this.setText(input.value)
        }
        else if(text != null){
            this.setText(text);
        }
        else{
            throw Error("Must provide either text or an input field for a text layer.")
        }
    }

    getMaximumHeight(){
        let x = this.lines.map(line => {
            let measurements = this.context.measureText(line);
            let actualheight = measurements.actualBoundingBoxAscent + measurements.actualBoundingBoxDescent;
            return actualheight;
        });
        return Math.max(...x);
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
            let maxHeight = this.getMaximumHeight();
            let isSmaller = this.lines.every(x => {
                const textMetrics = this.context.measureText(x);
                let realHeight = (numOfLines * maxHeight + (numOfLines - 1) * this.linespacing);
                console.log(realHeight);
                return textMetrics.width < this.size.width && 
                    realHeight < this.size.height;
            })
            if (isSmaller) {
                fontSize++;
            } else {
                this.fontSize = fontSize - 1;
                return;
            }
        }
    }

    setText(text){
        if(this.allCaps){
            text = text.toUpperCase()
        }
        this.lines = text.split("\n")
        if(this.getMaximumHeight() != 0){
            this.calculateFontSize();
        }
    }

    draw(context) {
        if(this.firstStart){
            this.calculateFontSize();
            this.firstStart = false;
        }
        let oldBaseline = context.textBaseline ;
        context.textBaseline  = "top";
        context.fillStyle = this.color;
        let newFont = `${this.fontSize}px ${this.font.split('px ')[1]}`;
        context.font = newFont;

        const maxHeight = this.getMaximumHeight()
        let yPos = this.position.y;

        for (let line of this.lines) {
            const textWidth = context.measureText(line).width;
            let xPos = this.position.x;
            if(this.doCenter){
                xPos = this.position.x + ((this.size.width - textWidth) / 2);
            }

            context.fillText(line, xPos, yPos);
            yPos += (maxHeight * (1 + this.lineSpacing));
        }
        context.textBaseline  = oldBaseline;
    }

    centerSelfHorizontal(canvas){
        this.position.x = (canvas.width - this.size.width) / 2;
    }
}