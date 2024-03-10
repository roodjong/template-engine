class TextDrawable extends abstractLayer {
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
            doDynamicSize = true, fontSize = 10, useDynamicLineHeight = true, doCenter=true, inputID = null, text = null, textBaseline = "top",
            allCaps = false, fontWeight = null, doBottomYPosition = false, letterSpacing = 0}) {
        super();
                
        this.context = context;
        this.font = font;
        this.linespacing = linespacing;
        this.color = color;
        this.position = { x: xPosition, y: yPosition };
        this.size = { width: maxWidth, height: maxHeight };
        this.lineSpacing = linespacing;
        this.doDynamicSize = doDynamicSize
        this.fontSize = fontSize;
        this.doCenter = doCenter;
        this.allCaps = allCaps;
        this.fontWeight = fontWeight;
        this.doBottomYPosition = doBottomYPosition;
        this.letterSpacing = letterSpacing;
        this.textBaseline = textBaseline;
        this.useDynamicLineHeight = useDynamicLineHeight;

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

    setFont(size=this.fontSize){
        let newFont = "";
        if(this.fontWeight != null){
            newFont += " " + this.fontWeight;
        }
        newFont += ` ${size}px ${this.font}`;
        this.context.font = newFont.trim();
        this.context.letterSpacing = this.letterSpacing + "px";
    }

    getPosition(){
        return this.position;
    }
    getVisibleDimentions(){
        this.setFont();
        const lineHeight = this.getRealLineHeight();
        //count empty strings at start and end, which arent visible and thus not clickable
        let areEmpty = this.lines.map(x => x.trim().length == 0);
        let emptyStart = 0;
        let emptyEnd = 0;
        while(areEmpty[emptyStart]){
            emptyStart++;
        }
        while(areEmpty[this.lines.length-emptyEnd-1]){
            emptyEnd++;
        }
        let emptyTopSpace = (1 + this.lineSpacing) * lineHeight * emptyStart;
        let emptyBottomSpace = (1 + this.lineSpacing) * lineHeight * emptyEnd;
        let totalPrintHeight = (1 + this.lineSpacing) * lineHeight * this.lines.length;
        let trueHeight = totalPrintHeight - emptyBottomSpace - emptyTopSpace;

        let trueWidth = Math.max(...this.lines.map(
            line => this.context.measureText(line).width));
        
        let trueXPos = this.position.x;
        if(this.doCenter){
            trueXPos += (this.size.width - trueWidth)/2;
        }

        let trueYPos = this.position.y + emptyTopSpace;
        if(this.doBottomYPosition){
            trueYPos = this.position.y - totalPrintHeight + emptyTopSpace;
        }

        let i = {x: trueXPos, y: trueYPos, width: trueWidth, height: trueHeight};
        return i;
    }
    setPositionInternal(x, y){
        this.position = {x: x, y: y};
    }

    getRealLineHeight(){
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
            this.setFont(fontSize);
            let maxHeight = this.getRealLineHeight();
            let isSmaller = this.lines.every(x => {
                const textMetrics = this.context.measureText(x);
                let realHeight = (numOfLines * maxHeight + (numOfLines - 1) * this.linespacing);
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
        if(this.getRealLineHeight() != 0){
            this.calculateFontSize();
        }
    }

    internalDraw(context){
        if(this.firstStart){
            this.calculateFontSize();
            this.firstStart = false;
        }

        let oldBaseline = context.textBaseline;
        context.textBaseline  = this.textBaseline;
        context.fillStyle = this.color;
        this.setFont()

        const maxHeight = this.useDynamicLineHeight ? this.getRealLineHeight() : this.fontSize;
        let deltaY = maxHeight * (1 + this.lineSpacing);
        if(this.doBottomYPosition){
            deltaY *= -1;
        }
        let yPos = this.position.y;
        if(this.doBottomYPosition){
            yPos = this.position.y - maxHeight;
        }

        let internalLines = this.doBottomYPosition ? this.lines.toReversed() : this.lines;

        for (let line of internalLines) {
            const textWidth = context.measureText(line).width;
            let xPos = this.position.x;
            if(this.doCenter){
                xPos = this.position.x + ((this.size.width - textWidth) / 2);
            }

            context.fillText(line, xPos, yPos);
            yPos += deltaY;
        }
        context.textBaseline = oldBaseline;
    }
}