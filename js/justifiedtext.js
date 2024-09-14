class JustifiedTextDrawable extends abstractLayer {
    /**
     *
     * @param {string} font Font to use
     * @param {number} linespacing Percentage of the line height to vertically space lines between and around
     * @param {string} color Color of the text
     * @param {number} xPosition x position to place the text, topleft
     * @param {number} yPosition y position to place the text, topleft
     * @param {number} maxWidth The maximum width for dynamically sized text
     * @param {number} maxHeight The maximum height for dynamically sized text
     * @param {number} fontSize Font size, if not dynamically sized
     * @param {boolean} doCenter Center the text
     * @param {string} inputID id of the input html element of which to retrieve the text
     * @param {string} text text to display
     */
    constructor({font, linespacing, color, xPosition, yPosition, maxWidth = 0, maxHeight = 0, context,
            fontSize = 10, useDynamicLineHeight = true, doCenter=true, inputID = null, text = null, textBaseline = "top",
            allCaps = false, fontWeight = null, doBottomYPosition = false, letterSpacing = 0}) {
        super();

        this.context = context;
        this.font = font;
        this.linespacing = linespacing;
        this.color = color;
        this.position = { x: xPosition, y: yPosition };
        this.size = { width: maxWidth, height: maxHeight };
        this.lineSpacing = linespacing;
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
        while(areEmpty[emptyStart]){
            emptyStart++;
        }
        while(areEmpty[this.lines.length-emptyEnd-1]){
            emptyEnd++;
        }
        const emptyTopSpace = (1 + this.lineSpacing) * lineHeight * emptyStart;
        const emptyBottomSpace = (1 + this.lineSpacing) * lineHeight * emptyEnd;

        const internalLines = this._processLines();
        const totalPrintHeight = (1 + this.lineSpacing) * lineHeight * internalLines.length;
        const trueHeight = totalPrintHeight - emptyBottomSpace - emptyTopSpace;

        const trueWidth = this.size.width;

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

    setText(text){
        if(this.allCaps){
            text = text.toUpperCase();
        }
        this.lines = text.split(/\r\n|\r|\n/);
    }

    _calculateSpaceWidth(words, minLineWidth, defaultSpaceWidth) {
        if (words.length <= 1) {
            return defaultSpaceWidth;
        } else {
            const totalWordsWidth = words.reduce((w, word) => w + word.width, 0);
            return (this.size.width - totalWordsWidth) / (words.length - 1);
        }
    }

    _processLines() {
        const lines = this.doBottomYBosition ? this.lines.toReversed() : this.lines;
        let processedLines = [];
        const defaultSpaceWidth = this.context.measureText(" ").width;
        for (const line of lines) {
            const words = line.split(/\s/).map(word => {
                return {
                    word,
                    width: this.context.measureText(word).width
                };
            });

            let minLineWidth = 0; // width of line with normal spaces
            let processedLine = [];
            for (const { word, width } of words) {
                if (minLineWidth + defaultSpaceWidth + width <= this.size.width) {
                    processedLine.push({ word, width });
                    minLineWidth += defaultSpaceWidth + width;
                } else if (width >= this.size.width) {
                    processedLines.push({
                        words: processedLine.slice(),
                        minWidth: minLineWidth,
                        spaceWidth: this._calculateSpaceWidth(processedLine, minLineWidth, defaultSpaceWidth),
                        fill: true,
                    });
                    processedLines.push({
                        words: [{ word, width }],
                        minWidth: width,
                        spaceWidth: defaultSpaceWidth,
                        fill: true,
                    });
                    minLineWidth = 0;
                    processedLine = [];
                } else {
                    processedLines.push({
                        words: processedLine.slice(),
                        minWidth: minLineWidth,
                        spaceWidth: this._calculateSpaceWidth(processedLine, minLineWidth, defaultSpaceWidth),
                        fill: true,
                    });
                    minLineWidth = width;
                    processedLine = [{ word, width }];
                }
            }
            processedLines.push({
                words: processedLine.slice(),
                minWidth: minLineWidth,
                spaceWidth: defaultSpaceWidth,
                fill: true,
            });

            // Do not fill the last line of a paragraph.
            if (processedLines.length > 0) {
                processedLines[processedLines.length - 1].fill = false;
            }
        }
        return processedLines;
    }

    internalDraw(context){
        if(this.firstStart){
            this.firstStart = false;
        }

        let oldBaseline = context.textBaseline;
        context.textBaseline  = this.textBaseline;
        context.fillStyle = this.color;
        this.setFont();

        const maxHeight = this.useDynamicLineHeight ? this.getRealLineHeight() : this.fontSize;
        const deltaY = maxHeight * (1 + this.lineSpacing);
        if(this.doBottomYPosition){
            deltaY *= -1;
        }
        let yPos = this.position.y;
        if(this.doBottomYPosition){
            yPos = this.position.y - maxHeight;
        }

        const internalLines = this._processLines();
        const defaultSpaceWidth = this.context.measureText(" ").width;

        for (const { words, minWidth, fill, spaceWidth } of internalLines) {
            const textWidth = fill ? this.size.width : minWidth;
            let xPos = this.position.x;
            if (this.doCenter) {
                xPos = this.position.x + ((this.size.width - textWidth) / 2);
            }

            for (const { word, width } of words) {
                context.fillText(word, xPos, yPos);
                xPos += spaceWidth + width;
            }

            yPos += deltaY;
        }
        context.textBaseline = oldBaseline;
    }
}
