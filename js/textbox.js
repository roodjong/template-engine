class TextBoxDrawable extends abstractLayer {
    /**
     *
     * @param {string} font Font to use
     * @param {number} linespacing Percentage of the line height to vertically space lines between and around
     * @param {string} color Color of the text
     * @param {string} backgroundColor Color of the background box
     * @param {number} xPosition x position to place the text, topleft
     * @param {number} yPosition y position to place the text, topleft
     * @param {number} xPadding x padding of the background box (part of font size)
     * @param {number} yPadding y padding of the background box (part of font size)
     * @param {number} maxWidth The maximum width for dynamically sized text
     * @param {number} maxHeight The maximum height for dynamically sized text
     * @param {boolean} doDynamicSize Indicated whether or not to dynamically up or downsize the font to fit (uses max width and height)
     * @param {number} fontSize Font size, if not dynamically sized
     * @param {boolean} doCenter Center the text
     * @param {string} inputID id of the input html element of which to retrieve the text
     * @param {string} text text to display
     * @param {boolean} shadowEnable Whether to add shadow to the box
     * @param {number} shadowOpacity Opacity of the shadow (0 to 1)
     * @param {number} shadowOffset Offset of the shadow to the right (0 to 1, part of font size)
     */
    constructor({
        font,
        linespacing,
        color,
        xPosition,
        yPosition,
        backgroundColor,
        maxWidth = 0,
        maxHeight = 0,
        xPadding = 0.1,
        yPadding = 0.075,
        context,
        doDynamicSize = true,
        fontSize = 10,
        useDynamicLineHeight = true,
        doCenter=true,
        inputID = null,
        text = null,
        textBaseline = "top",
        allCaps = false,
        fontWeight = null,
        doBottomYPosition = false,
        letterSpacing = 0,
        shadowOpacity = 0.6,
        shadowOffset = 0.15,
        shadowEnable = false
    }) {
        super();

        this.context = context;
        this.font = font;
        this.linespacing = linespacing;
        this.color = color;
        this.backgroundColor = backgroundColor;
        this.position = { x: xPosition, y: yPosition };
        this.size = { width: maxWidth, height: maxHeight };
        this.padding = { x: xPadding, y: yPadding };
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
        this.shadowOffset = shadowOffset;
        this.shadowOpacity = shadowOpacity;
        this.shadowEnable = shadowEnable;

        this.firstStart = true;//to fix startup order issues

        if (inputID != null) {
            if(text != null) {
                throw Error("Cant provide both text and an input field.")
            }
            const input = document.getElementById(inputID);
            input.addEventListener("input", () => this.setText(input.value));
            input.addEventListener("input", drawTemplate);
            this.setText(input.value)
        } else if (text != null) {
            this.setText(text);
        } else {
            throw Error("Must provide either text or an input field for a text layer.")
        }
    }

    setFont(size=this.fontSize){
        this.fontSize = size;
        let newFont = "";
        if(this.fontWeight != null){
            newFont += " " + this.fontWeight;
        }
        newFont += ` ${size}px ${this.font}`;
        this.context.font = newFont.trim();
        this.context.letterSpacing = this.letterSpacing + "px";
    }

    setBackgroundColor(color) {
        this.backgroundColor = color;
    }

    setColor(color) {
        this.color = color;
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
        while (areEmpty[emptyStart]) {
            emptyStart++;
        }
        while (areEmpty[this.lines.length-emptyEnd-1]) {
            emptyEnd++;
        }
        let emptyTopSpace = (1 + this.lineSpacing) * lineHeight * emptyStart;
        let emptyBottomSpace = (1 + this.lineSpacing) * lineHeight * emptyEnd;
        let totalPrintHeight = (1 + this.lineSpacing) * lineHeight * this.lines.length;
        let trueHeight = totalPrintHeight - emptyBottomSpace - emptyTopSpace + 2 * this.padding.y * this.fontSize;

        // Transform: shear and rotate
        this.context.setTransform(1, 0, -0.1, 1, 0, 0);
        this.context.rotate(-3 * Math.PI / 180);

        let trueWidth = Math.max(...this.lines.map(
            line => this.context.measureText(line).width)) + 2 * this.padding.x * this.fontSize;
        
        let trueXPos = this.position.x - this.padding.x * this.fontSize;
        if(this.doCenter){
            trueXPos += (this.size.width - trueWidth)/2;
        }

        let trueYPos = this.position.y + emptyTopSpace - this.padding.y * this.fontSize;
        if (this.doBottomYPosition) {
            trueYPos = this.position.y - totalPrintHeight + emptyTopSpace;
        }

        // Reset transformation
        this.context.setTransform();

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
        if (!this.doDynamicSize) {
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
                return textMetrics.width + 2 * this.padding.x * this.fontSize < this.size.width && 
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
        if (this.allCaps) {
            text = text.toUpperCase()
        }
        this.lines = text.split("\n")
        if (this.getRealLineHeight() != 0) {
            this.calculateFontSize();
        }
    }

    internalDraw(context) {
        if (this.firstStart) {
            this.calculateFontSize();
            this.firstStart = false;
        }

        let oldBaseline = context.textBaseline;
        context.textBaseline  = this.textBaseline;
        this.setFont()

        const maxHeight = this.useDynamicLineHeight ? this.getRealLineHeight() : this.fontSize;
        let deltaY = (maxHeight + this.padding.y * this.fontSize) * (1 + this.lineSpacing);
        if(this.doBottomYPosition){
            deltaY *= -1;
        }
        let yPos = this.position.y;
        if (this.doBottomYPosition) {
            yPos = this.position.y - maxHeight;
        }

        const internalLines = this.doBottomYPosition ? this.lines.toReversed() : this.lines;

        for (const line of internalLines) {
            // Transform: shear and rotate
            this.context.setTransform(1, 0, -0.1, 1, 0, 0);
            this.context.rotate(-3 * Math.PI / 180);

            const metrics = this.context.measureText(line);
            const textWidth = metrics.width;
            const textHeight = metrics.height;
            let xPos = this.position.x;
            if (this.doCenter) {
                xPos += (this.size.width - textWidth) / 2;
            }

            // Draw shadow
            if (this.shadowEnable) {
                context.fillStyle = `rgba(0,0,0,${this.shadowOpacity})`;
                context.fillRect(
                    xPos - (this.padding.x - this.shadowOffset) * this.fontSize,
                    yPos - (this.padding.y - this.shadowOffset) * this.fontSize,
                    textWidth + 2 * this.padding.x * this.fontSize,
                    maxHeight + 3 * this.padding.y * this.fontSize
                );
            }

            // Draw background rectangle
            context.fillStyle = this.backgroundColor;
            context.fillRect(
                xPos - this.padding.x * this.fontSize,
                yPos - this.padding.y * this.fontSize,
                textWidth + 2 * this.padding.x * this.fontSize,
                maxHeight + 3 * this.padding.y * this.fontSize
            );

            // Draw text
            context.fillStyle = this.color;
            context.fillText(line, xPos, yPos);
            yPos += deltaY;

            // Reset transformation
            this.context.setTransform();
        }
        context.textBaseline = oldBaseline;
    }
}
